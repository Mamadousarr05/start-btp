# STAR-BTP — Site vitrine

Site vitrine de **STAR-BTP**, entreprise sénégalaise de bâtiment et travaux publics basée à
Rufisque (RC : SN.DKR.2020.A.281 — NINEA : 007726451).

Application **Angular 18** en composants standalone, routage lazy-loadé, sans framework CSS
externe (design system maison en CSS pur).

---

## Démarrage rapide

```bash
npm install
npm start          # http://localhost:4200
npm run build      # génère dist/starbtp-ng/browser
```

> **Node 20 requis.** Si `ng` échoue avec `env: node: No such file or directory`, activez la bonne
> version : `nvm use 20`.

---

## Les étapes du projet

### Étape 1 — Cadrage et identité

Définition du positionnement (« La qualité au meilleur prix »), des 8 domaines d'expertise et des
informations légales de l'entreprise. Les logos SVG (version claire et sombre) et l'image de fond
du hero sont placés dans [`public/img/`](public/img/).

### Étape 2 — Design system

Reconstruction complète de [`src/styles.css`](src/styles.css) autour de **tokens CSS en HSL**, sur
le modèle de structure de deltasa.sn, avec l'identité chromatique Star BTP :

| Token | Valeur | Rôle |
|---|---|---|
| `--primary` | `219 82% 22%` | Bleu Star BTP (#0a2a66) |
| `--accent` | `44 100% 48%` | Or Star BTP (#f4b400) |
| `--section-bg` | `220 24% 97%` | Fond des sections alternées |
| `--muted-foreground` | `220 13% 46%` | Texte secondaire |
| `--radius` | `.75rem` | Rayon de base |
| `--shadow-xs/sm/md/lg` | — | 4 niveaux d'élévation |

Les couleurs sont déclarées **en composantes HSL sans `hsl()`**, ce qui permet de moduler
l'opacité partout : `background: hsl(var(--primary) / .1)`.

Classes utilitaires principales : `container-section` (max 1400px), `section-padding`,
`badge-pill`, `card` / `card-hover`, `icon-box`, `stat`, `feature-list`, `project-card`,
`filter-chip`, `quote`, `logo-tile`, `job`, `form-card`.

Typographie **Inter** (400 → 800), chargée via `@import` en tête de `styles.css`.

### Étape 3 — Données centralisées

Tout le contenu éditorial vit dans [`src/app/data/site-data.ts`](src/app/data/site-data.ts) et
non dans les templates. C'est **le seul fichier à modifier** pour mettre le site à jour :

| Export | Contenu |
|---|---|
| `COMPANY` | Coordonnées, RC, NINEA, compte bancaire, horaires |
| `NAV_ITEMS` | Les 7 entrées de menu (header + footer) |
| `SERVICES` | 8 services, chacun avec icône, description et prestations |
| `PROJECTS` | Réalisations (titre, catégorie, client, lieu, année) |
| `PROJECT_CATEGORIES` | Catégories du filtre de la page Projets |
| `TESTIMONIALS`, `PARTNERS`, `JOBS`, `STATS` | Témoignages, références, offres, chiffres clés |

Ajouter un service ou un projet = ajouter un objet dans le tableau. Le header, le footer, la page
d'accueil et la page dédiée se mettent à jour automatiquement.

### Étape 4 — Structure et routage

Passage d'une page unique à ancres vers un **site multi-pages** routé
([`src/app/app.routes.ts`](src/app/app.routes.ts)). Chaque page est chargée à la demande
(`loadComponent`) et porte son propre `title` pour le référencement.

| Route | Page | Sections |
|---|---|---|
| `/` | [`home.page.ts`](src/app/pages/home/home.page.ts) | Hero, à propos, services, pourquoi nous, projets, chiffres, témoignages, partenaires, CTA |
| `/a-propos` | [`about.page.ts`](src/app/pages/about/about.page.ts) | Histoire, mission/vision/valeurs, direction, engagements |
| `/services` | [`services.page.ts`](src/app/pages/services/services.page.ts) | 8 services détaillés, méthode en 4 étapes, pourquoi nous |
| `/projets` | [`projects.page.ts`](src/app/pages/projects/projects.page.ts) | Filtres par catégorie, grille, bilan chiffré |
| `/partenaires` | [`partners.page.ts`](src/app/pages/partners/partners.page.ts) | Logos, types de partenariat, témoignages |
| `/carrieres` | [`careers.page.ts`](src/app/pages/careers/careers.page.ts) | Avantages, offres d'emploi, candidature spontanée |
| `/contact` | [`contact.page.ts`](src/app/pages/contact/contact.page.ts) | Coordonnées, formulaire de devis, rappel téléphone |

Toute route inconnue redirige vers l'accueil. Le scroll remonte en haut à chaque navigation
(`withInMemoryScrolling`).

### Étape 5 — Composants partagés

Trois composants seulement, dans [`src/app/components/`](src/app/components/) :

- **`header`** — barre sticky en `backdrop-filter: blur(12px)`, 7 liens avec état actif
  (`routerLinkActive`), bouton « Demander un devis », menu mobile piloté par un `signal()`.
- **`footer`** — 4 colonnes (identité + mentions légales, services, navigation, contact),
  alimentées par `site-data.ts`.
- **`cta-band`** — bandeau d'appel à l'action réutilisé en bas de chaque page, personnalisable
  via les `@Input()` `badge`, `title` et `subtitle`.

### Étape 6 — Page Projets interactive

Le filtre par catégorie utilise les **signals** Angular : `active` est un `signal<string>` et
`filtered` un `computed()` qui dérive la liste. Aucun abonnement, aucun `ngOnChanges`.

```ts
active = signal('Tous');
filtered = computed(() =>
  this.active() === 'Tous' ? PROJECTS : PROJECTS.filter(p => p.category === this.active()),
);
```

### Étape 7 — Formulaire de devis (API Python)

Le formulaire de [`/contact`](src/app/pages/contact/contact.page.ts) envoie les demandes à
`POST /api/contact`, une petite API Python ([`api/main.py`](api/main.py), FastAPI) qui tourne dans
son propre conteneur sur le VPS. Elle transmet le mail à **contact@star-btp.com** via le SMTP
o2switch (`greek.o2switch.net:465`, SSL).

Le mail est en HTML aux couleurs STAR-BTP, avec le visuel du site intégré au mail (aucune image à
télécharger) et une version texte : [`api/templates/`](api/templates/). Le client est placé en
« Répondre à » : répondre au mail écrit directement au client.

| Protection | Détail |
|---|---|
| Destinataire fixe | `MAIL_TO` côté serveur, jamais fourni par le navigateur |
| Limite de débit | 5 demandes par heure et par IP (`RATE_LIMIT_PER_HOUR`) |
| Piège anti-robots | Champ caché `website` : s'il est rempli, la demande est ignorée |
| Validation | Longueurs et format de l'email ; retours à la ligne retirés des en-têtes |
| Échappement | Tout le contenu saisi par le visiteur est échappé dans le HTML |
| Taille | Corps de requête limité à 64 Ko par Caddy |

| Code | Message affiché au visiteur |
|---|---|
| `422` | Champs invalides (email, message) |
| `429` | Trop de demandes en peu de temps |
| `502` | Échec de l'envoi SMTP |

En cas d'échec, un lien `mailto:` de repli s'affiche sous le message pour que le visiteur ne
reste jamais bloqué.

#### Variables d'environnement de l'API

En production, le workflow génère `/opt/star-btp/api.env` (lisible par root uniquement) ; le mot
de passe vient du secret GitHub `SMTP_PASSWORD`.

| Variable | Valeur en production |
|---|---|
| `SMTP_HOST` / `SMTP_PORT` | `greek.o2switch.net` / `465` |
| `SMTP_SECURITY` | `ssl` (`starttls` pour le port 587, `none` pour un serveur de test) |
| `SMTP_USER` / `SMTP_PASSWORD` | `contact@star-btp.com` / secret GitHub |
| `MAIL_FROM` / `MAIL_TO` | `contact@star-btp.com` |
| `MAIL_FROM_NAME` | `Site STAR-BTP` |
| `RATE_LIMIT_PER_HOUR` | `5` |

En local, `npm start` redirige `/api` vers `http://localhost:8000`
([`proxy.conf.json`](proxy.conf.json)). Lancer l'API avec ces variables dans `api/.env` :
`docker build -t star-btp-api api && docker run --env-file api/.env -p 8000:8000 star-btp-api`.

### Étape 8 — Référencement

[`src/index.html`](src/index.html) porte les métadonnées `description`, `keywords`, Open Graph,
Twitter Card, ainsi qu'un bloc **JSON-LD `Organization`** (adresse postale, téléphone, langue).
Chaque route définit en plus son propre `title` via le routeur.

---

## Structure des fichiers

```
src/
├─ app/
│  ├─ app.component.ts        header + <router-outlet> + footer
│  ├─ app.config.ts           providers (routeur, scroll)
│  ├─ app.routes.ts           les 7 routes lazy-loadées
│  ├─ components/
│  │  ├─ header/              nav sticky + menu mobile
│  │  ├─ footer/              4 colonnes
│  │  └─ cta-band/            bandeau CTA réutilisable
│  ├─ data/
│  │  └─ site-data.ts         ← tout le contenu éditorial
│  └─ pages/                  une page par entrée de menu
├─ styles.css                 design system global
└─ index.html                 métadonnées SEO + JSON-LD
public/img/                   logos SVG et image du hero
```

---

## Déploiement

```bash
npm run build
```

Le site statique est produit dans **`dist/starbtp-ng/browser/`**.

> **Point critique — réécriture SPA.** Le site utilisant le routage côté client, l'hébergeur doit
> renvoyer `index.html` pour toutes les routes. Sans cette règle, un accès direct à
> `/services` ou un rafraîchissement de page renvoie une **erreur 404**.

| Hébergeur | Configuration |
|---|---|
| Netlify | `_redirects` : `/*  /index.html  200` |
| Vercel | `vercel.json` : `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| Apache | `.htaccess` avec `FallbackResource /index.html` |
| Nginx | `try_files $uri $uri/ /index.html;` |

---

## Maintenance courante

| Besoin | Fichier |
|---|---|
| Ajouter un service, un projet, une offre d'emploi | `src/app/data/site-data.ts` |
| Modifier coordonnées, horaires, mentions légales | `site-data.ts` → `COMPANY` |
| Ajouter une entrée de menu | `site-data.ts` → `NAV_ITEMS` **et** `app.routes.ts` |
| Changer les couleurs ou la typographie | `src/styles.css` (bloc `:root`) |
| Changer le destinataire des devis | `MAIL_TO` dans `.github/workflows/deploy.yml` + `site-data.ts` → `COMPANY.email` |
| Modifier le mail reçu | `api/templates/devis.html` (HTML) et `api/templates/devis.txt` (texte) |
