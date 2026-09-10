import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section-padding bg-primary-band">
      <div class="container-section cta-band">
        <span class="badge-pill badge-pill--light">{{ badge }}</span>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
        <div class="hero-cta">
          <a routerLink="/contact" class="btn btn-accent btn-lg">Demander un devis</a>
          <a routerLink="/services" class="btn btn-ghost-light btn-lg">Découvrir nos services</a>
        </div>
      </div>
    </section>
  `,
})
export class CtaBandComponent {
  @Input() badge = 'Parlons de votre projet';
  @Input() title = 'Un projet de construction ou de rénovation ?';
  @Input() subtitle =
    "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé. Notre équipe d'ingénieurs est à votre disposition.";
}
