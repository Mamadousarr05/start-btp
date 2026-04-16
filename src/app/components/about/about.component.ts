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
          <p>STAR-BTP est une entreprise sénégalaise créée en 2020 (RC : SN.DKR.2020.A.281 — NINEA : 007726451), spécialisée dans la construction et la rénovation : gros œuvre, second œuvre, lot technique, assainissement, terrassement et AEP. Nous intégrons à chaque projet les obligations d'accessibilité PMR et de sécurité des travailleurs.</p>
          <p>Nos missions couvrent l'ingénierie des travaux, des études jusqu'à la réalisation des ouvrages. L'entreprise s'appuie sur des ingénieurs génie civil, ingénieurs géomètres-topographes, techniciens supérieurs et chefs de chantier qualifiés totalisant plusieurs années d'expérience terrain.</p>
          <p><strong>Direction</strong> — Mamadou BA (Directeur Général), Abdoulaye KA (Directeur Technique), Awa NDOUR (Gestionnaire-comptable).</p>
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
    'Ingénieurs génie civil et géomètres-topographes',
    'Études techniques structurelles et architecturales',
    'Suivi et organisation de chantier rigoureux',
    'Accessibilité PMR et sécurité des travailleurs',
    'Location de machines et matériel de chantier',
  ];
  stats = [
    { value: '20+', label: 'Projets réalisés' },
    { value: '10', label: "Cadres d'encadrement" },
    { value: '2020', label: 'Année de création' },
    { value: '6', label: 'Domaines d\'expertise' },
  ];
}
