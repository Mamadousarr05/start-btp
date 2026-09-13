import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { PARTNERS, PROJECTS, SERVICES, STATS, TESTIMONIALS } from '../../data/site-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container-section hero-content">
        <span class="badge-pill badge-pill--light">
          <span aria-hidden="true">★</span> Entreprise sénégalaise de BTP depuis 2020
        </span>
        <h1>La qualité au <em>meilleur prix</em></h1>
        <p>
          STAR-BTP conçoit et réalise vos projets de construction, de rénovation et de travaux
          publics au Sénégal : des études techniques jusqu'à la livraison des ouvrages.
        </p>
        <div class="hero-cta">
          <a routerLink="/services" class="btn btn-accent btn-lg">Nos services</a>
          <a routerLink="/contact" class="btn btn-ghost-light btn-lg">Demander un devis</a>
        </div>
        <div class="hero-meta">
          @for (s of stats; track s.label) {
            <div><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
          }
        </div>
      </div>
    </section>

    <!-- À PROPOS -->
    <section class="section-padding bg-section">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">À propos de STAR-BTP</span>
          <h2>Un partenaire de confiance pour vos ouvrages</h2>
          <p style="margin-top:1rem">
            Créée en 2020, STAR-BTP est une entreprise sénégalaise spécialisée dans la construction
            et la rénovation : gros œuvre, second œuvre, lot technique, assainissement, terrassement
            et AEP. Nos missions couvrent l'ingénierie des travaux, des études jusqu'à la
            réalisation des ouvrages.
          </p>
          <p style="margin-top:.75rem">
            Nous nous appuyons sur des ingénieurs génie civil, des ingénieurs géomètres-topographes,
            des techniciens supérieurs et des chefs de chantier qualifiés, et intégrons à chaque
            projet les obligations d'accessibilité PMR et de sécurité des travailleurs.
          </p>
          <ul class="feature-list">
            @for (item of highlights; track item) { <li>{{ item }}</li> }
          </ul>
          <div class="hero-cta">
            <a routerLink="/a-propos" class="btn btn-primary">En savoir plus</a>
          </div>
        </div>
        <div class="media-grid">
          @for (tile of tiles; track tile.label) {
            <div class="media-tile" [style.background]="tile.gradient">
              <span style="font-size:1.75rem" aria-hidden="true">{{ tile.icon }}</span>
              {{ tile.label }}
            </div>
          }
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Nos expertises</span>
          <h2>Des solutions complètes pour vos projets</h2>
          <p>Une offre intégrée couvrant tout le cycle de vie de votre ouvrage, de l'étude à la livraison.</p>
        </div>
        <div class="grid grid-4">
          @for (s of services; track s.title) {
            <article class="card card-hover">
              <div class="icon-box" aria-hidden="true">{{ s.icon }}</div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </article>
          }
        </div>
        <div class="center mt-2">
          <a routerLink="/services" class="btn btn-outline">Voir tous nos services</a>
        </div>
      </div>
    </section>

    <!-- POURQUOI NOUS -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Pourquoi nous choisir ?</span>
          <h2>Engagés dans une démarche qualité et sécurité</h2>
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

    <!-- PROJETS -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Nos réalisations</span>
          <h2>Des projets d'envergure à travers le Sénégal</h2>
          <p>Découvrez une sélection de chantiers livrés ou en cours de réalisation.</p>
        </div>
        <div class="grid grid-3">
          @for (p of projects; track p.title) {
            <article class="project-card">
              <div class="project-thumb" [style.background]="p.gradient">
                <span class="badge-pill">{{ p.category }}</span>
              </div>
              <div class="project-body">
                <h3>{{ p.title }}</h3>
                <p>{{ p.description }}</p>
                <div class="project-meta">
                  <span>📍 {{ p.location }}</span>
                  <span>🗓 {{ p.year }}</span>
                </div>
              </div>
            </article>
          }
        </div>
        <div class="center mt-2">
          <a routerLink="/projets" class="btn btn-outline">Voir tous nos projets</a>
        </div>
      </div>
    </section>

    <!-- CHIFFRES -->
    <section class="section-padding bg-primary-band">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill badge-pill--light">STAR-BTP en chiffres</span>
          <h2>Une expertise construite sur le terrain</h2>
        </div>
        <div class="grid grid-4">
          @for (s of stats; track s.label) {
            <div class="stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
          }
        </div>
      </div>
    </section>

    <!-- TÉMOIGNAGES -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Ils nous font confiance</span>
          <h2>Ce que disent nos clients</h2>
        </div>
        <div class="grid grid-3">
          @for (t of testimonials; track t.author) {
            <blockquote class="card quote">
              <p>{{ t.quote }}</p>
              <footer>
                <span class="avatar" aria-hidden="true">{{ t.role.charAt(0) }}</span>
                <span><strong>{{ t.author }}</strong><span>{{ t.role }}</span></span>
              </footer>
            </blockquote>
          }
        </div>
      </div>
    </section>

    <!-- PARTENAIRES -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Nos agréments</span>
          <h2>Entreprise agréée auprès des institutions sénégalaises</h2>
          <p>
            STAR-BTP est habilitée à soumissionner aux marchés de ces organismes publics,
            sociétés nationales et collectivités.
          </p>
        </div>
        <div class="logo-grid">
          @for (p of partners; track p.name) {
            <div class="logo-tile" [title]="p.entity">
              @if (p.logo) {
                <img class="logo-tile__img" [src]="p.logo" [alt]="p.name" loading="lazy" />
              } @else {
                {{ p.name }}
              }
            </div>
          }
        </div>
        <div class="center mt-2">
          <a routerLink="/partenaires" class="btn btn-outline">Tous nos agréments</a>
        </div>
      </div>
    </section>

    <app-cta-band />
  `,
})
export class HomePage {
  stats = STATS;
  services = SERVICES;
  projects = PROJECTS.slice(0, 3);
  testimonials = TESTIMONIALS;
  partners = PARTNERS.slice(0, 10);

  highlights = [
    'Ingénieurs génie civil et géomètres-topographes',
    'Études techniques structurelles et architecturales',
    'Suivi et organisation de chantier rigoureux',
    'Accessibilité PMR et sécurité des travailleurs',
    'Location de machines et matériel de chantier',
  ];

  tiles = [
    { icon: '🏗️', label: 'Gros œuvre', gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { icon: '💧', label: 'Assainissement', gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { icon: '🛣️', label: 'VRD', gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { icon: '📐', label: 'Études', gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
  ];

  reasons = [
    { icon: '🎓', title: 'Expertise technique reconnue', description: 'Une équipe d\'ingénieurs et de techniciens supérieurs qualifiés, formés au génie civil et à la topographie.' },
    { icon: '⏱️', title: 'Respect des délais et budgets', description: 'Une planification rigoureuse et un suivi de chantier permanent pour tenir les engagements pris.' },
    { icon: '🦺', title: 'Sécurité et accessibilité', description: 'Sécurité des travailleurs et obligations d\'accessibilité PMR intégrées dès la phase de conception.' },
    { icon: '🚧', title: 'Équipements et matériel', description: 'Location de machines et matériel de chantier pour maîtriser les moyens mis en œuvre sur site.' },
  ];
}
