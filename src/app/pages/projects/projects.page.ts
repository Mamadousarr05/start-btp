import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { PROJECTS, PROJECT_CATEGORIES } from '../../data/site-data';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [RouterLink, CtaBandComponent],
  template: `
    <section class="page-hero">
      <div class="container-section">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a routerLink="/">Accueil</a> <span>/</span> <span>Projets</span>
        </nav>
        <span class="badge-pill badge-pill--light">Nos réalisations</span>
        <h1>Nos projets</h1>
        <p>
          Des chantiers de bâtiment, de VRD et d'assainissement menés à travers le Sénégal, pour des
          maîtres d'ouvrage publics et privés.
        </p>
      </div>
    </section>

    <!-- FILTRES + GRILLE -->
    <section class="section-padding">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill">Portfolio</span>
          <h2>Une sélection de nos chantiers</h2>
          <p>Filtrez par domaine d'intervention pour découvrir les projets qui vous intéressent.</p>
        </div>

        <div class="filter-bar" role="tablist">
          @for (c of categories; track c) {
            <button
              type="button"
              class="filter-chip"
              [class.active]="active() === c"
              [attr.aria-pressed]="active() === c"
              (click)="setCategory(c)"
            >{{ c }}</button>
          }
        </div>

        <div class="grid grid-3">
          @for (p of filtered(); track p.title) {
            <article class="project-card">
              <div class="project-thumb" [style.background]="p.gradient">
                <span class="badge-pill">{{ p.category }}</span>
              </div>
              <div class="project-body">
                <h3>{{ p.title }}</h3>
                <p>{{ p.description }}</p>
                <div class="project-meta">
                  <span>🏢 {{ p.client }}</span>
                  <span>📍 {{ p.location }}</span>
                  <span>🗓 {{ p.year }}</span>
                </div>
              </div>
            </article>
          } @empty {
            <p class="center text-muted">Aucun projet dans cette catégorie pour le moment.</p>
          }
        </div>
      </div>
    </section>

    <!-- CHIFFRES -->
    <section class="section-padding bg-primary-band">
      <div class="container-section">
        <div class="section-head">
          <span class="badge-pill badge-pill--light">Notre bilan</span>
          <h2>Des projets d'envergure à travers tout le Sénégal</h2>
        </div>
        <div class="grid grid-4">
          @for (s of figures; track s.label) {
            <div class="stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
          }
        </div>
      </div>
    </section>

    <app-cta-band
      badge="Votre projet ensuite ?"
      title="Confiez-nous votre prochain chantier"
      subtitle="De l'étude technique à la réception des travaux, nous prenons en charge l'ensemble de votre opération." />
  `,
})
export class ProjectsPage {
  categories = PROJECT_CATEGORIES;
  active = signal('Tous');
  filtered = computed(() =>
    this.active() === 'Tous' ? PROJECTS : PROJECTS.filter(p => p.category === this.active()),
  );

  figures = [
    { value: '20+', label: 'Projets réalisés' },
    { value: '4', label: "Domaines d'intervention" },
    { value: '100%', label: 'Chantiers suivis en interne' },
    { value: '2020', label: 'Depuis' },
  ];

  setCategory(c: string) { this.active.set(c); }
}
