import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { PARTNERS, TESTIMONIALS } from '../../data/site-data';

@Component({
  selector: 'app-partners-page',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>Partenaires</span>
        </nav>
        <span class="badge-pill badge-pill--light">Ils nous font confiance</span>
        <h1>Nos partenaires</h1>
        <p>
          La confiance de nos clients et partenaires est notre plus grande récompense. Ensemble,
          nous construisons des ouvrages durables au Sénégal.
        </p>
      </div>
    </section>

    <!-- LOGOS -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Références</span>
          <h2>Clients et partenaires</h2>
          <p>Entreprises, institutions et collectivités qui nous ont confié leurs projets.</p>
        </div>
        <div class="logo-grid">
          @for (p of partners; track p) { <div class="logo-tile">{{ p }}</div> }
        </div>
      </div>
    </section>

    <!-- TYPES DE PARTENARIAT -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Collaborer avec nous</span>
          <h2>Des partenariats à chaque niveau du projet</h2>
        </div>
        <div class="grid grid-3">
          @for (t of types; track t.title) {
            <article class="card card-hover">
              <div class="icon-box" aria-hidden="true">{{ t.icon }}</div>
              <h3>{{ t.title }}</h3>
              <p>{{ t.description }}</p>
              <ul class="feature-list">
                @for (f of t.features; track f) { <li>{{ f }}</li> }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- TÉMOIGNAGES -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Témoignages</span>
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

    <!-- DEVENIR PARTENAIRE -->
    <section class="section-padding bg-section">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">Devenir partenaire</span>
          <h2>Vous souhaitez collaborer avec STAR-BTP ?</h2>
          <p style="margin-top:1rem">
            Que vous soyez maître d'ouvrage, bureau d'études, fournisseur ou entreprise de
            sous-traitance, contactez-nous pour discuter de vos projets et découvrir comment nous
            pouvons vous accompagner.
          </p>
          <ul class="feature-list">
            @for (b of benefits; track b) { <li>{{ b }}</li> }
          </ul>
          <div class="hero-cta">
            <a routerLink="/contact" class="btn btn-primary">Nous contacter</a>
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
      badge="Construisons ensemble"
      title="Rejoignez notre réseau de partenaires"
      subtitle="Échangeons sur vos besoins et sur les opportunités de collaboration." />
  `,
})
export class PartnersPage {
  partners = PARTNERS;
  testimonials = TESTIMONIALS;

  types = [
    {
      icon: '🏛️',
      title: 'Maîtres d\'ouvrage',
      description: 'Institutions, collectivités et promoteurs qui nous confient la réalisation de leurs ouvrages.',
      features: ['Marchés publics et privés', 'Bâtiments et infrastructures', 'Suivi et reporting dédiés'],
    },
    {
      icon: '📐',
      title: 'Bureaux d\'études',
      description: 'Collaboration technique sur les études structurelles, topographiques et les plans d\'exécution.',
      features: ['Études structurelles', 'Levés topographiques', 'Plans d\'exécution'],
    },
    {
      icon: '🤝',
      title: 'Fournisseurs & sous-traitants',
      description: 'Un réseau de partenaires fiables pour les matériaux, le matériel et les corps d\'état spécialisés.',
      features: ['Matériaux et fournitures', 'Location de matériel', 'Corps d\'état techniques'],
    },
  ];

  benefits = [
    'Interlocuteur technique unique sur vos opérations',
    'Transparence sur les coûts, les délais et les moyens',
    'Respect des normes de sécurité et d\'accessibilité',
    'Capacité d\'intervention sur Dakar et en régions',
  ];

  tiles = [
    { icon: '🏛️', label: 'Institutions', gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { icon: '🏭', label: 'Industriels', gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { icon: '📐', label: 'Bureaux d\'études', gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { icon: '🤝', label: 'Fournisseurs', gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
  ];
}
