"""API d'envoi des demandes de contact du site STAR-BTP.

Reçoit le formulaire de /contact et l'envoie en HTML (visuel et logo intégrés)
à la boîte de l'entreprise via le SMTP o2switch.
"""

import logging
import os
import re
import smtplib
import ssl
import time
from collections import defaultdict, deque
from datetime import datetime
from email.headerregistry import Address
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from pathlib import Path
from threading import Lock
from zoneinfo import ZoneInfo

from fastapi import FastAPI, HTTPException, Request
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markupsafe import Markup, escape
from pydantic import BaseModel, Field, field_validator

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("star-btp-api")


def setting(name: str, default: str | None = None) -> str:
    value = os.environ.get(name, default)
    if value is None:
        raise RuntimeError(f"Variable d'environnement manquante : {name}")
    return value


SMTP_HOST = setting("SMTP_HOST")
SMTP_PORT = int(setting("SMTP_PORT", "465"))
SMTP_SECURITY = setting("SMTP_SECURITY", "ssl").lower()  # ssl | starttls | none
SMTP_USER = setting("SMTP_USER", "")
SMTP_PASSWORD = setting("SMTP_PASSWORD", "")
MAIL_FROM = setting("MAIL_FROM")
MAIL_FROM_NAME = setting("MAIL_FROM_NAME", "Site STAR-BTP")
MAIL_TO = setting("MAIL_TO")
RATE_LIMIT_PER_HOUR = int(setting("RATE_LIMIT_PER_HOUR", "5"))

if SMTP_SECURITY not in {"ssl", "starttls", "none"}:
    raise RuntimeError("SMTP_SECURITY doit valoir ssl, starttls ou none")

BASE_DIR = Path(__file__).parent
HEADER_IMAGE = (BASE_DIR / "assets" / "header-star-btp.jpg").read_bytes()
TIMEZONE = ZoneInfo("Africa/Dakar")
JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre", "novembre", "décembre"]
EMAIL_RE = re.compile(r"[^@\s<>()\[\],;:\"']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")


def nl2br(value: str) -> Markup:
    """Échappe le texte puis conserve les retours à la ligne en HTML."""
    return Markup("<br>\n").join(escape(line) for line in str(value).splitlines())


templates = Environment(
    loader=FileSystemLoader(BASE_DIR / "templates"),
    autoescape=select_autoescape(["html"]),
    trim_blocks=True,
    lstrip_blocks=True,
)
templates.filters["nl2br"] = nl2br


class ContactForm(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=6, max_length=254)
    phone: str = Field(default="", max_length=30)
    service: str = Field(default="", max_length=100)
    message: str = Field(min_length=5, max_length=5000)
    website: str = Field(default="", max_length=200)  # piège anti-robots, invisible pour les humains

    # Champs sur une seule ligne : empêche toute injection d'en-têtes dans le mail
    @field_validator("name", "email", "phone", "service", "website", mode="before")
    @classmethod
    def _one_line(cls, value):
        return " ".join(value.split()) if isinstance(value, str) else value

    @field_validator("message", mode="before")
    @classmethod
    def _trim(cls, value):
        return value.strip() if isinstance(value, str) else value

    @field_validator("email")
    @classmethod
    def _email(cls, value):
        if not EMAIL_RE.fullmatch(value):
            raise ValueError("adresse email invalide")
        return value


class RateLimiter:
    """Limite le nombre de demandes par IP sur une fenêtre glissante."""

    def __init__(self, limit: int, window: float = 3600):
        self.limit = limit
        self.window = window
        self._hits: dict[str, deque] = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        with self._lock:
            if len(self._hits) > 10_000:
                self._hits = defaultdict(deque, {
                    k: q for k, q in self._hits.items() if q and now - q[-1] < self.window
                })
            hits = self._hits[key]
            while hits and now - hits[0] >= self.window:
                hits.popleft()
            if len(hits) >= self.limit:
                return False
            hits.append(now)
            return True


limiter = RateLimiter(RATE_LIMIT_PER_HOUR)


def client_ip(request: Request) -> str:
    # Caddy remplace X-Forwarded-For par l'IP réelle du visiteur
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return request.client.host if request.client else "inconnue"


def format_date(moment: datetime) -> str:
    return f"{JOURS[moment.weekday()]} {moment.day} {MOIS[moment.month - 1]} {moment.year} à {moment:%H:%M}"


def whatsapp_number(phone: str) -> str:
    digits = re.sub(r"\D", "", phone)
    if digits.startswith("00"):
        digits = digits[2:]
    if len(digits) == 9 and digits.startswith("7"):  # numéro sénégalais sans indicatif
        digits = "221" + digits
    return digits if len(digits) >= 8 else ""


def build_message(form: ContactForm) -> EmailMessage:
    header_cid = make_msgid(domain="star-btp.com")
    context = {
        "name": form.name,
        "email": form.email,
        "phone": form.phone,
        "phone_href": re.sub(r"[^\d+]", "", form.phone),
        "whatsapp": whatsapp_number(form.phone),
        "service": form.service,
        "message": form.message,
        "sent_at": format_date(datetime.now(TIMEZONE)),
        "header_cid": header_cid[1:-1],
    }

    msg = EmailMessage()
    msg["Subject"] = f"Nouvelle demande de devis — {form.service or 'Service non précisé'} — {form.name}"
    msg["From"] = Address(MAIL_FROM_NAME, addr_spec=MAIL_FROM)
    msg["To"] = MAIL_TO
    msg["Reply-To"] = Address(form.name, addr_spec=form.email)
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=MAIL_FROM.rpartition("@")[2])

    msg.set_content(templates.get_template("devis.txt").render(context))
    msg.add_alternative(templates.get_template("devis.html").render(context), subtype="html")
    msg.get_payload()[1].add_related(
        HEADER_IMAGE, maintype="image", subtype="jpeg", cid=header_cid, filename="star-btp.jpg"
    )
    return msg


def send(msg: EmailMessage) -> None:
    context = ssl.create_default_context()
    if SMTP_SECURITY == "ssl":
        server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=20)
    else:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20)
        if SMTP_SECURITY == "starttls":
            server.starttls(context=context)
    with server:
        if SMTP_USER:
            server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


app = FastAPI(title="STAR-BTP API", docs_url=None, redoc_url=None, openapi_url=None)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact")
def contact(form: ContactForm, request: Request):
    ip = client_ip(request)

    if form.website:
        log.info("Piège anti-robots déclenché (ip=%s)", ip)
        return {"ok": True}

    if not limiter.allow(ip):
        log.warning("Limite de demandes atteinte (ip=%s)", ip)
        raise HTTPException(429, "Trop de demandes envoyées. Réessayez dans une heure.")

    try:
        msg = build_message(form)
    except ValueError:
        raise HTTPException(422, "Adresse email invalide.")

    try:
        send(msg)
    except (smtplib.SMTPException, OSError) as exc:
        log.error("Échec de l'envoi SMTP : %s", exc)
        raise HTTPException(502, "L'envoi du message a échoué.")

    log.info("Demande envoyée (service=%s, ip=%s)", form.service or "-", ip)
    return {"ok": True}
