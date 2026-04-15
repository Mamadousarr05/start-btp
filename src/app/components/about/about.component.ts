import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="apropos" class="section">
      <div class="container grid-2">
        <div>
          <span class="eyebrow">À propos de nous</span>
          <h2>Qui sommes-nous ?</h2>
          <p>STAR-BTP est une entreprise sénégalaise spécialisée dans le bâtiment et les travaux publics. Nous accompagnons particuliers, entreprises et collectivités dans la réalisation de leurs projets, du gros œuvre aux finitions.</p>
          <p>Notre engagement : livrer des ouvrages de qualité, dans les délais et au meilleur prix, grâce à une équipe expérimentée et des méthodes rigoureuses.</p>
          <ul class="check-list">
            @for (item of highlights; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div class="stats">
          @for (s of stats; track s.label) {
            <div class="stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  highlights = [
    'Équipe qualifiée et expérimentée',
    'Respect des délais et du budget',
    'Matériaux de qualité certifiée',
    'Suivi personnalisé de chaque projet',
  ];
  stats = [
    { value: '50+', label: 'Projets livrés' },
    { value: '15+', label: "Années d'expérience" },
    { value: '100%', label: 'Clients satisfaits' },
    { value: '24/7', label: 'Support client' },
  ];
}
