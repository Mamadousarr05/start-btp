import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { SERVICES } from '../../data/site-data';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>Services</span>
        </nav>
        <span class="badge-pill badge-pill--light">Nos expertises</span>
        <h1>Nos services</h1>
        <p>
          Des solutions complètes pour vos projets de construction, de rénovation et
          d'infrastructure, portées par une équipe d'ingénieurs et de chefs de chantier qualifiés.
        </p>
      </div>
    </section>

    <!-- LISTE DES SERVICES -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Ce que nous faisons</span>
          <h2>Une offre intégrée du gros œuvre aux finitions</h2>
          <p>Chaque prestation est menée dans le respect des normes techniques, des délais et de la sécurité.</p>
        </div>
        <div class="grid grid-3">
          @for (s of services; track s.title) {
            <article class="card card-hover">
              <div class="icon-box" aria-hidden="true">{{ s.icon }}</div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
              <ul class="feature-list">
                @for (f of s.features; track f) { <li>{{ f }}</li> }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- PROCESSUS -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Notre méthode</span>
          <h2>Comment nous menons vos projets</h2>
          <p>Un processus éprouvé, du premier échange jusqu'à la réception des travaux.</p>
        </div>
        <div class="grid grid-4">
          @for (step of steps; track step.title) {
            <article class="card card-hover">
              <div class="icon-box icon-box--accent" aria-hidden="true" style="font-size:1.1rem;font-weight:800">
                {{ step.num }}
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- POURQUOI NOUS -->
    <section class="section-padding">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">Pourquoi nous choisir ?</span>
          <h2>La rigueur technique au service de votre budget</h2>
          <p style="margin-top:1rem">
            Notre positionnement « la qualité au meilleur prix » repose sur une maîtrise interne des
            études, une organisation de chantier serrée et la disponibilité de notre propre matériel.
          </p>
          <ul class="feature-list">
            @for (r of reasons; track r) { <li>{{ r }}</li> }
          </ul>
          <div class="hero-cta">
            <a routerLink="/contact" class="btn btn-primary">Demander un devis</a>
            <a routerLink="/projets" class="btn btn-outline">Voir nos projets</a>
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

    <app-cta-band
      badge="Un besoin précis ?"
      title="Parlez-nous de votre projet"
      subtitle="Décrivez-nous vos besoins : nous vous proposons une solution technique et un chiffrage adaptés." />
  `,
})
export class ServicesPage {
  services = SERVICES;

  steps = [
    { num: '01', title: 'Écoute & analyse', description: 'Nous étudions votre besoin, le site et vos contraintes de budget et de calendrier.' },
    { num: '02', title: 'Études & chiffrage', description: 'Études techniques, notes de calcul, plans d\'exécution et devis détaillé.' },
    { num: '03', title: 'Exécution', description: 'Mobilisation des équipes et du matériel, avec un suivi de chantier permanent.' },
    { num: '04', title: 'Réception & suivi', description: 'Contrôles qualité, levée des réserves, réception de l\'ouvrage et accompagnement.' },
  ];

  reasons = [
    'Études réalisées en interne par nos ingénieurs',
    'Matériel de chantier disponible sans sous-traitance systématique',
    'Chefs de chantier expérimentés sur chaque opération',
    'Transparence sur les coûts et les délais',
    'Conformité PMR et sécurité des travailleurs',
  ];

  tiles = [
    { icon: '🏗️', label: 'Bâtiment', gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { icon: '🛣️', label: 'VRD & voiries', gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { icon: '💧', label: 'Assainissement', gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { icon: '🚜', label: 'Terrassement', gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
  ];
}
