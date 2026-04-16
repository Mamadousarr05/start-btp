import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <img src="img/logo-star-btp-clair.svg" alt="STAR-BTP" class="footer-logo" />
          <p>Entreprise BTP basée à Rufisque (Sénégal). Études, construction et rénovation.</p>
          <p><small>RC : SN.DKR.2020.A.281<br/>NINEA : 007726451</small></p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>Gros œuvre</li>
            <li>Second œuvre</li>
            <li>Assainissement</li>
            <li>VRD</li>
          </ul>
        </div>
        <div>
          <h4>Liens</h4>
          <ul>
            <li><a href="#apropos">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#realisations">Réalisations</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Cité ASECNA, Rufisque<br/>+221 77 228 96 69 / 77 409 67 17<br/>startbtp1503&#64;gmail.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ year }} STAR-BTP. Tous droits réservés.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
