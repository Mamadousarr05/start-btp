import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, JOBS } from '../../data/site-data';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>Carrières</span>
        </nav>
        <span class="badge-pill badge-pill--light">Rejoignez-nous</span>
        <h1>Carrières chez STAR-BTP</h1>
        <p>
          Rejoignez une équipe dynamique et participez à la construction de l'avenir du Sénégal.
          Découvrez nos offres d'emploi et envoyez votre candidature.
        </p>
      </div>
    </section>

    <!-- POURQUOI NOUS REJOINDRE -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Pourquoi nous rejoindre ?</span>
          <h2>Construire, c'est aussi former et valoriser les talents</h2>
          <p>Nous investissons dans la montée en compétences de nos équipes, sur le terrain comme au bureau.</p>
        </div>
        <div class="grid grid-4">
          @for (r of reasons; track r.title) {
            <article class="card card-hover">
              <div class="icon-box icon-box--accent" aria-hidden="true">{{ r.icon }}</div>
              <h3>{{ r.title }}</h3>
              <p>{{ r.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- OFFRES -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Offres d'emploi</span>
          <h2>Nos postes ouverts</h2>
          <p>Consultez les postes actuellement à pourvoir au sein de nos équipes.</p>
        </div>
        <div class="grid" style="gap:1rem">
          @for (j of jobs; track j.title) {
            <article class="job">
              <div>
                <h3>{{ j.title }}</h3>
                <p>{{ j.description }}</p>
                <div class="job-tags">
                  <span>💼 {{ j.type }}</span>
                  <span>📍 {{ j.location }}</span>
                  <span>🏗 {{ j.department }}</span>
                </div>
              </div>
              <a [href]="mailtoFor(j.title)" class="btn btn-primary">Postuler</a>
            </article>
          } @empty {
            <p class="center text-muted">Aucune offre ouverte pour le moment.</p>
          }
        </div>
      </div>
    </section>

    <!-- CANDIDATURE SPONTANÉE -->
    <section class="section-padding">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">Candidature spontanée</span>
          <h2>Vous ne trouvez pas le poste qui vous correspond ?</h2>
          <p style="margin-top:1rem">
            Envoyez-nous votre candidature spontanée : nous étudions tous les profils d'ingénieurs,
            de techniciens, de chefs de chantier et de conducteurs d'engins.
          </p>
          <ul class="feature-list">
            @for (s of steps; track s) { <li>{{ s }}</li> }
          </ul>
        </div>
        <div class="card">
          <h3>Envoyer votre dossier</h3>
          <p>Joignez votre CV et une lettre de motivation à votre message.</p>
          <ul class="feature-list" style="margin-top:1.25rem">
            <li>Email : {{ company.email }}</li>
            <li>Téléphone : {{ company.phones[0] }}</li>
            <li>Adresse : {{ company.address }}</li>
          </ul>
          <div class="hero-cta">
            <a [href]="spontaneousMailto" class="btn btn-accent">Envoyer ma candidature</a>
            <a routerLink="/contact" class="btn btn-outline">Nous contacter</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-primary-band">
      <div class="container-section cta-band">
        <span class="badge-pill badge-pill--light">Travaillez avec des professionnels passionnés</span>
        <h2>Construisons l'avenir du Sénégal, ensemble</h2>
        <p>Rejoignez STAR-BTP et participez à des projets qui transforment durablement le cadre de vie.</p>
        <div class="hero-cta">
          <a [href]="spontaneousMailto" class="btn btn-accent btn-lg">Postuler maintenant</a>
          <a routerLink="/a-propos" class="btn btn-ghost-light btn-lg">Découvrir l'entreprise</a>
        </div>
      </div>
    </section>
  `,
})
export class CareersPage {
  company = COMPANY;
  jobs = JOBS;

  spontaneousMailto =
    `mailto:${COMPANY.email}?subject=` + encodeURIComponent('Candidature spontanée — STAR-BTP');

  reasons = [
    { icon: '📈', title: 'Évolution de carrière', description: "Opportunités d'avancement et de mobilité interne au fil de la croissance de l'entreprise." },
    { icon: '🎓', title: 'Formation continue', description: 'Programmes de formation et développement professionnel encadrés par nos ingénieurs seniors.' },
    { icon: '🚧', title: 'Équipements modernes', description: 'Du matériel de chantier performant et entretenu pour travailler dans de bonnes conditions.' },
    { icon: '🦺', title: 'Sécurité au travail', description: 'Une culture de la sécurité appliquée sur chaque chantier, pour chaque collaborateur.' },
  ];

  steps = [
    'Envoyez votre CV et votre lettre de motivation par email',
    'Notre équipe étudie votre profil sous 15 jours',
    'Entretien technique avec la direction technique',
    'Intégration et accompagnement sur le terrain',
  ];

  mailtoFor(title: string) {
    return `mailto:${COMPANY.email}?subject=` + encodeURIComponent(`Candidature — ${title}`);
  }
}
