import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="accueil" class="hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1>La qualité au meilleur prix</h1>
        <p>Votre partenaire de confiance pour tous vos projets BTP au Sénégal.</p>
        <div class="hero-cta">
          <a href="#services" class="btn btn-primary">Nos services</a>
          <a href="#contact" class="btn btn-outline">Demander un devis</a>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {}
