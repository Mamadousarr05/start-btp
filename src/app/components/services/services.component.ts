import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="services" class="section section-alt">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">Nos expertises</span>
          <h2>Nos services</h2>
          <p>Une offre complète pour tous vos besoins en bâtiment et travaux publics.</p>
        </div>
        <div class="services-grid">
          @for (s of services; track s.title) {
            <article class="service-card">
              <div class="service-icon">{{ s.icon }}</div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  services = [
    { icon: '🏗️', title: 'Gros œuvre', description: 'Fondations, ossatures, maçonnerie, structures béton armé pour bâtiments résidentiels et commerciaux.' },
    { icon: '🏠', title: 'Second œuvre', description: 'Cloisons, revêtements, menuiserie, peinture et finitions pour donner vie à vos espaces.' },
    { icon: '⚡', title: 'Lot technique', description: 'Électricité, plomberie, climatisation et installations techniques pour un confort optimal.' },
    { icon: '💧', title: 'Assainissement', description: "Réseaux d'évacuation, fosses septiques, stations de relevage et traitement des eaux usées." },
    { icon: '🚜', title: 'Terrassement', description: 'Préparation de terrain, nivellement, excavation et travaux de fondation pour tout type de projet.' },
    { icon: '🚰', title: 'AEP', description: "Adduction d'eau potable : conception, pose de canalisations et raccordements aux réseaux." },
    { icon: '🛣️', title: 'VRD', description: 'Voirie et réseaux divers : routes, trottoirs, réseaux souterrains, aménagements urbains.' },
    { icon: '📐', title: 'Études & conseil', description: "Études techniques, suivi de chantier et conseils d'experts pour sécuriser vos investissements." },
  ];
}
