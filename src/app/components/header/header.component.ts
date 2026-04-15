import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="site-header">
      <div class="container header-inner">
        <a href="#accueil" class="logo">
          <img src="img/logo.png" alt="STAR-BTP" />
          <span>STAR-BTP</span>
        </a>
        <nav class="main-nav">
          <button class="nav-toggle" aria-label="Menu" (click)="toggle()">&#9776;</button>
          <ul [class.open]="open()">
            <li><a href="#accueil" (click)="close()">Accueil</a></li>
            <li><a href="#apropos" (click)="close()">À propos</a></li>
            <li><a href="#services" (click)="close()">Services</a></li>
            <li><a href="#realisations" (click)="close()">Réalisations</a></li>
            <li><a href="#contact" class="btn-nav" (click)="close()">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }
}
