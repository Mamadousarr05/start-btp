import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { COMPANY, STATS } from '../../data/site-data';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>À propos</span>
        </nav>
        <span class="badge-pill badge-pill--light">Notre entreprise</span>
        <h1>À propos de STAR-BTP</h1>
        <p>
          Entreprise sénégalaise spécialisée dans la construction, la rénovation, l'assainissement
          et les travaux publics, de l'étude technique à la livraison des ouvrages.
        </p>
      </div>
    </section>

    <!-- HISTOIRE -->
    <section class="section-padding">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">Notre histoire</span>
          <h2>Construire durablement au Sénégal</h2>
          <p style="margin-top:1rem">
            STAR-BTP a été créée en 2020 (RC : {{ company.rc }} — NINEA : {{ company.ninea }}) avec
            une ambition simple : offrir la qualité au meilleur prix sur les chantiers de bâtiment
            et de travaux publics au Sénégal.
          </p>
          <p style="margin-top:.75rem">
            Nos missions couvrent l'ingénierie des travaux, des études jusqu'à la réalisation des
            ouvrages. Nous intervenons sur le gros œuvre, le second œuvre, le lot technique,
            l'assainissement, le terrassement, l'AEP et les VRD, pour des maîtres d'ouvrage publics
            comme privés.
          </p>
          <p style="margin-top:.75rem">
            L'entreprise s'appuie sur des ingénieurs génie civil, des ingénieurs
            géomètres-topographes, des techniciens supérieurs et des chefs de chantier qualifiés,
            totalisant plusieurs années d'expérience terrain.
          </p>
        </div>
        <div class="stat-grid">
          @for (s of stats; track s.label) {
            <div class="stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
          }
        </div>
      </div>
    </section>

    <!-- MISSION / VISION / VALEURS -->
    <section class="section-padding bg-section">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Notre raison d'être</span>
          <h2>Mission, vision et valeurs</h2>
        </div>
        <div class="grid grid-3">
          @for (p of pillars; track p.title) {
            <article class="card card-hover">
              <div class="icon-box" aria-hidden="true">{{ p.icon }}</div>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- DIRECTION -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Notre équipe</span>
          <h2>Une direction expérimentée</h2>
          <p>Des profils complémentaires en ingénierie, en conduite de travaux et en gestion.</p>
        </div>
        <div class="grid grid-3">
          @for (m of team; track m.name) {
            <article class="card card-hover center">
              <span class="avatar" style="margin:0 auto .9rem;width:3.5rem;height:3.5rem;font-size:1.1rem">{{ m.initials }}</span>
              <h3>{{ m.name }}</h3>
              <p class="text-accent" style="font-weight:600">{{ m.role }}</p>
              <p>{{ m.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- ENGAGEMENTS -->
    <section class="section-padding bg-section">
      <div class="container-section grid grid-2">
        <div>
          <span class="badge-pill">Nos engagements</span>
          <h2>Engagement pour la qualité et la sécurité</h2>
          <p style="margin-top:1rem">
            Chaque chantier est mené selon une démarche qualité stricte, intégrant les obligations
            d'accessibilité pour les personnes à mobilité réduite et la sécurité des travailleurs.
          </p>
          <ul class="feature-list">
            @for (c of commitments; track c) { <li>{{ c }}</li> }
          </ul>
          <div class="hero-cta">
            <a routerLink="/projets" class="btn btn-primary">Voir nos réalisations</a>
          </div>
        </div>
        <div class="grid" style="gap:1rem">
          @for (e of expertise; track e.title) {
            <div class="card">
              <h3>{{ e.title }}</h3>
              <p>{{ e.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <app-cta-band
      badge="Travaillons ensemble"
      title="Prêt à démarrer votre projet ?"
      subtitle="Notre équipe d'experts est prête à vous accompagner dans la réalisation de vos ambitions." />
  `,
})
export class AboutPage {
  company = COMPANY;
  stats = STATS;

  pillars = [
    {
      icon: '🎯',
      title: 'Notre mission',
      description: "Fournir des ouvrages de qualité supérieure, dans le respect des délais et des budgets, en accompagnant nos clients de l'étude technique jusqu'à la livraison.",
    },
    {
      icon: '🔭',
      title: 'Notre vision',
      description: "Devenir une référence du bâtiment et des travaux publics au Sénégal, reconnue pour sa rigueur technique, sa fiabilité et son sens du service.",
    },
    {
      icon: '💎',
      title: 'Nos valeurs',
      description: "Excellence, intégrité et engagement envers nos clients, nos collaborateurs et les communautés dans lesquelles nous intervenons.",
    },
  ];

  team = [
    { initials: 'MB', name: 'Mamadou BA', role: 'Directeur Général', description: "Pilotage stratégique de l'entreprise et relation avec les maîtres d'ouvrage." },
    { initials: 'AK', name: 'Abdoulaye KA', role: 'Directeur Technique', description: 'Conduite des études techniques et supervision de l\'exécution des chantiers.' },
    { initials: 'AN', name: 'Awa NDOUR', role: 'Gestionnaire-comptable', description: 'Gestion administrative, financière et suivi budgétaire des projets.' },
  ];

  commitments = [
    'Accessibilité PMR intégrée dès la conception',
    'Sécurité des travailleurs sur tous les chantiers',
    'Respect rigoureux des délais et des budgets',
    'Matériaux conformes et contrôle qualité continu',
    'Suivi et reporting réguliers auprès du client',
  ];

  expertise = [
    { title: 'Études techniques', description: 'Études structurelles et architecturales, notes de calcul, plans d\'exécution et dossiers techniques.' },
    { title: 'Topographie', description: 'Levés topographiques, implantations, contrôles géométriques et plans de récolement.' },
    { title: 'Conduite de travaux', description: 'Organisation de chantier, planification, coordination des corps d\'état et réception des ouvrages.' },
    { title: 'Location de matériel', description: 'Mise à disposition de machines et de matériel de chantier pour vos opérations.' },
  ];
}
