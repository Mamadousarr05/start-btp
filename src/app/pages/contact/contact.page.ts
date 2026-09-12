import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COMPANY, SERVICES } from '../../data/site-data';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>Contact</span>
        </nav>
        <span class="badge-pill badge-pill--light">Contactez-nous</span>
        <h1>Parlons de votre projet</h1>
        <p>
          Notre équipe est à votre disposition pour répondre à toutes vos questions et vous
          accompagner dans vos projets de construction et de travaux publics.
        </p>
      </div>
    </section>

    <!-- COORDONNÉES -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="grid grid-3">
          @for (c of channels; track c.title) {
            <article class="card card-hover">
              <div class="icon-box" aria-hidden="true">{{ c.icon }}</div>
              <h3>{{ c.title }}</h3>
              @for (line of c.lines; track line.text) {
                @if (line.href) {
                  <p><a [href]="line.href" style="color:inherit">{{ line.text }}</a></p>
                } @else {
                  <p>{{ line.text }}</p>
                }
              }
            </article>
          }
        </div>
      </div>
    </section>

    <!-- FORMULAIRE + INFOS -->
    <section class="section-padding">
      <div class="container-section grid grid-2" style="align-items:start">
        <div>
          <span class="badge-pill">Demande de devis</span>
          <h2>Écrivez-nous</h2>
          <p style="margin-top:1rem">
            Décrivez votre projet en quelques lignes : nature des travaux, localisation, calendrier
            souhaité. Nous vous répondrons dans les plus brefs délais.
          </p>

          <div class="card" style="margin-top:1.75rem">
            <h3>Informations pratiques</h3>
            <ul class="feature-list">
              <li><strong>RC :</strong> {{ company.rc }}</li>
              <li><strong>NINEA :</strong> {{ company.ninea }}</li>
              <li><strong>Compte bancaire :</strong> {{ company.bank }}</li>
              <li><strong>Horaires :</strong> {{ company.hours }}</li>
            </ul>
            <p style="margin-top:1rem">
              Nos bureaux sont situés à la Cité ASECNA à Rufisque, en face de la Clinique NABY,
              facilement accessibles depuis Dakar.
            </p>
          </div>
        </div>

        <form class="form-card" #f="ngForm" (ngSubmit)="submit(f)">
          <div class="field-row">
            <div class="field">
              <label for="name">Nom complet *</label>
              <input id="name" type="text" name="name" ngModel required minlength="2" maxlength="100" autocomplete="name" />
            </div>
            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" name="email" ngModel required email maxlength="254" autocomplete="email" />
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="phone">Téléphone</label>
              <input id="phone" type="tel" name="phone" ngModel maxlength="30" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="service">Service souhaité</label>
              <select id="service" name="service" ngModel>
                @for (s of serviceNames; track s) { <option>{{ s }}</option> }
              </select>
            </div>
          </div>
          <div class="field">
            <label for="message">Votre message *</label>
            <textarea id="message" rows="6" name="message" ngModel required minlength="5" maxlength="5000"></textarea>
          </div>
          <!-- Piège anti-robots : invisible pour les visiteurs, rempli seulement par les robots -->
          <div aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden">
            <label for="website">Site web</label>
            <input id="website" type="text" name="website" ngModel tabindex="-1" autocomplete="off" />
          </div>
          <button type="submit" class="btn btn-accent btn-lg" [disabled]="sending" style="width:100%">
            {{ sending ? 'Envoi en cours…' : 'Envoyer le message' }}
          </button>
          @if (status) {
            <p class="form-status" [class.error]="status.error" role="status">
              {{ status.message }}
              @if (status.error) {
                <a [href]="fallbackMailto" style="display:block;margin-top:.5rem;font-weight:600;color:inherit;text-decoration:underline">
                  Nous écrire directement à {{ company.email }}
                </a>
              }
            </p>
          }
        </form>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-primary-band">
      <div class="container-section cta-band">
        <span class="badge-pill badge-pill--light">Besoin d'une réponse rapide ?</span>
        <h2>Appelez-nous directement</h2>
        <p>Nos équipes sont joignables du lundi au samedi, de 8h à 18h.</p>
        <div class="hero-cta">
          @for (p of phones; track p.tel) {
            <a [href]="p.tel" class="btn btn-accent btn-lg">{{ p.label }}</a>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  company = COMPANY;
  serviceNames = [...SERVICES.map(s => s.title), 'Autre'];
  phones = COMPANY.phones.map(p => ({ label: p, tel: 'tel:' + p.replace(/\s/g, '') }));

  channels = [
    {
      icon: '📍',
      title: 'Adresse',
      lines: [{ text: COMPANY.address, href: '' }],
    },
    {
      icon: '📞',
      title: 'Téléphone',
      lines: COMPANY.phones.map(p => ({ text: p, href: 'tel:' + p.replace(/\s/g, '') })),
    },
    {
      icon: '✉️',
      title: 'Email',
      lines: [
        { text: COMPANY.email, href: 'mailto:' + COMPANY.email },
        { text: COMPANY.hours, href: '' },
      ],
    },
  ];

  fallbackMailto = `mailto:${COMPANY.email}?subject=` + encodeURIComponent('Demande de devis — STAR-BTP');

  sending = false;
  status: { message: string; error: boolean } | null = null;

  async submit(form: NgForm) {
    if (form.invalid || this.sending) return;
    const v = form.value;
    this.sending = true;
    this.status = null;
    try {
      // API Python du VPS (api/main.py), servie par Caddy sur /api
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v.name ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
          service: v.service ?? '',
          message: v.message ?? '',
          website: v.website ?? '',
        }),
      });
      if (!res.ok) throw res;
      this.status = {
        message: 'Merci ! Votre demande a bien été envoyée. Nous vous répondrons dans les plus brefs délais.',
        error: false,
      };
      form.resetForm();
    } catch (err) {
      this.status = { message: this.describeError(err), error: true };
    } finally {
      this.sending = false;
    }
  }

  /** Traduit la réponse de l'API en message compréhensible pour le visiteur. */
  private describeError(err: unknown): string {
    if (!(err instanceof Response)) {
      console.error('Contact API unreachable', err);
      return "Impossible de joindre le serveur. Vérifiez votre connexion ou contactez-nous directement.";
    }
    console.error('Contact API error', err.status);
    if (err.status === 422) {
      return 'Certains champs sont invalides : vérifiez votre adresse email et votre message.';
    }
    if (err.status === 413) {
      return 'Votre message est trop long. Raccourcissez-le puis réessayez.';
    }
    if (err.status === 429) {
      return 'Trop de demandes envoyées en peu de temps. Merci de réessayer dans une heure.';
    }
    return "L'envoi a échoué côté serveur. Réessayez dans quelques minutes ou contactez-nous par téléphone.";
  }
}
