import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY, NAV_ITEMS, SERVICES } from '../../data/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="container-section">
        <div class="footer-grid">
          <div>
            <img src="img/logo-star-btp-clair.svg" alt="STAR-BTP" class="footer-logo" />
            <p>
              Entreprise sénégalaise de bâtiment et travaux publics : études, construction,
              rénovation, assainissement et VRD. Basée à Rufisque, active sur tout le Sénégal.
            </p>
            <p style="margin-top:.9rem">
              <small>RC : {{ company.rc }}<br />NINEA : {{ company.ninea }}</small>
            </p>
            <div class="social">
              <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.75-2.05C21.4 8.65 22 11 22 14.2V21h-4v-6c0-1.4-.03-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4V9Z"/></svg></a>
              <a href="#" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.3-4.6c-.4-.6-.9-1.5-.9-2.4 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.3.4c-.1.1-.3.3-.1.5.2.4.8 1.3 1.6 1.9.9.8 1.6 1 1.9 1.2.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.1.5-.1l1.6.8c.2.1.4.2.4.3v.8Z"/></svg></a>
            </div>
          </div>

          <div>
            <h4>Nos services</h4>
            <ul>
              @for (s of services; track s.title) {
                <li><a routerLink="/services">{{ s.title }}</a></li>
              }
            </ul>
          </div>

          <div>
            <h4>Navigation</h4>
            <ul>
              @for (item of navItems; track item.path) {
                <li><a [routerLink]="item.path">{{ item.name }}</a></li>
              }
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>{{ company.address }}</li>
              @for (phone of phones; track phone.tel) {
                <li><a [href]="phone.tel">{{ phone.label }}</a></li>
              }
              <li><a [href]="'mailto:' + company.email">{{ company.email }}</a></li>
              <li>{{ company.hours }}</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ year }} {{ company.name }}. Tous droits réservés.</p>
          <p>{{ company.tagline }}</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  company = COMPANY;
  phones = COMPANY.phones.map(p => ({ label: p, tel: 'tel:' + p.replace(/\s/g, '') }));
  navItems = NAV_ITEMS;
  services = SERVICES.slice(0, 5);
  year = new Date().getFullYear();
}
