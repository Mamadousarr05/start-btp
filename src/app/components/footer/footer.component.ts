import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <h4>STAR-BTP</h4>
          <p>La qualité au meilleur prix. Entreprise BTP au Sénégal.</p>
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
          <p>Dakar, Sénégal<br/>+221 XX XXX XX XX<br/>contact&#64;starbtp.sn</p>
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
