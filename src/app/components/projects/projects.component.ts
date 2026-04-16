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
    { title: 'Bâtiment R+4 — Rufisque', description: "Étude technique structurelle et réalisation en cours d'un bâtiment R+4 avec terrasse accessible, cité Poste, Lot N°16 (TF N° 4885/R).", gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { title: '3 villas R+1 — Bambilor', description: "Suivi et réalisation des travaux (gros œuvre et second œuvre) de 3 villas R+1 type F5, cité des cadres, avec ATRA SA.", gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { title: 'Dallage cimenterie DANGOTE', description: "Suivi des travaux de réalisation du dallage de l'ensachage de la cimenterie DANGOTE SA, avec Ceratech Construction.", gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { title: 'Piste 205 ml — SENICO', description: "Étude topographique et réalisation d'une piste de 205 ml : implantation, terrassement, pose bordure et pavage.", gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
    { title: 'Bâtiment R+2 — Keur Massar', description: "Étude technique structurelle et réalisation d'un bâtiment R+2 avec terrasse accessible, Cité APIX.", gradient: 'linear-gradient(135deg,#0a2a66,#1e4db7)' },
    { title: 'Toiture CFPT Sénégal/Japon', description: "Réfection de la toiture des bâtiments (froid, climatisation et soudage) du Centre de Formation Professionnelle et Technique Sénégal/Japon.", gradient: 'linear-gradient(135deg,#1e4db7,#3a7bd5)' },
    { title: 'Assainissement ERNAM (ASECNA)', description: "Travaux d'assainissement des eaux pluviales et rafraîchissement de la peinture du mur de clôture de l'ERNAM.", gradient: 'linear-gradient(135deg,#0a2a66,#3a7bd5)' },
    { title: 'Charpente métallique — Diass', description: "Étude technique de la charpente métallique d'un centre de formation à Diass.", gradient: 'linear-gradient(135deg,#1e4db7,#0a2a66)' },
  ];
}
