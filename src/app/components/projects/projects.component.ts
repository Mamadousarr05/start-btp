import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section id="realisations" class="section">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Nos projets</span>
          <h2>Nos réalisations</h2>
          <p>Découvrez quelques-uns de nos projets récents.</p>
        </div>
        <div class="projects-grid">
          @for (p of projects; track p.title) {
            <div class="project-card">
              <div class="project-img" [style.background-image]="p.gradient"></div>
              <div class="project-info">
                <h3>{{ p.title }}</h3>
                <p>{{ p.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  projects = [
    { title: 'Immeuble R+4 — Dakar', description: "Construction d'un immeuble résidentiel avec finitions haut de gamme.", gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { title: 'Réseau AEP — Thiès', description: "Extension du réseau d'adduction d'eau potable sur 5 km.", gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { title: 'Villa privée — Saly', description: "Construction clé en main d'une villa contemporaine avec piscine.", gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { title: 'VRD lotissement — Diamniadio', description: 'Viabilisation d\'un lotissement de 30 parcelles : voirie et réseaux.', gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
  ];
}
