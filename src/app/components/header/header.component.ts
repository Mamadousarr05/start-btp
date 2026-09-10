import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_ITEMS } from '../../data/site-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container-section">
        <div class="header-inner">
          <a routerLink="/" class="brand" (click)="close()">
            <img src="img/logo-star-btp-sombre.svg" alt="STAR-BTP" />
            <span>
              STAR-BTP
              <small>Bâtiment &amp; Travaux Publics</small>
            </span>
          </a>

          <nav class="nav-desktop" aria-label="Navigation principale">
            @for (item of navItems; track item.path) {
              <a
                class="nav-link"
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              >{{ item.name }}</a>
            }
          </nav>

          <a routerLink="/contact" class="btn btn-accent header-cta">Demander un devis</a>

          <button class="nav-toggle" [attr.aria-expanded]="open()" aria-label="Ouvrir le menu" (click)="toggle()">
            @if (open()) {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            }
          </button>
        </div>

        @if (open()) {
          <nav class="nav-mobile" aria-label="Navigation mobile">
            @for (item of navItems; track item.path) {
              <a
                class="nav-link"
                [routerLink]="item.path"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                (click)="close()"
              >{{ item.name }}</a>
            }
            <a routerLink="/contact" class="btn btn-accent" (click)="close()">Demander un devis</a>
          </nav>
        }
      </div>
    </header>
  `,
})
export class HeaderComponent {
  navItems = NAV_ITEMS;
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close() { this.open.set(false); }
}
