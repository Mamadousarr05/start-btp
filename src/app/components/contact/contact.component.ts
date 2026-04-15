import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact" class="section section-alt">
      <div class="container grid-2">
        <div>
          <span class="eyebrow">Contactez-nous</span>
          <h2>Parlons de votre projet</h2>
          <p>Une question, un devis, un projet ? Notre équipe vous répond rapidement.</p>
          <ul class="contact-list">
            <li><strong>Adresse :</strong> Dakar, Sénégal</li>
            <li><strong>Téléphone :</strong> +221 XX XXX XX XX</li>
            <li><strong>Email :</strong> contact&#64;starbtp.sn</li>
            <li><strong>Horaires :</strong> Lun - Sam, 8h - 18h</li>
          </ul>
        </div>
        <form class="contact-form" #f="ngForm" (ngSubmit)="submit(f)">
          <div class="field"><label>Nom complet<input type="text" name="name" ngModel required /></label></div>
          <div class="field"><label>Email<input type="email" name="email" ngModel required /></label></div>
          <div class="field"><label>Téléphone<input type="tel" name="phone" ngModel /></label></div>
          <div class="field"><label>Service souhaité
            <select name="service" ngModel>
              @for (s of services; track s) { <option>{{ s }}</option> }
            </select>
          </label></div>
          <div class="field"><label>Message<textarea rows="4" name="message" ngModel required></textarea></label></div>
          <button type="submit" class="btn btn-primary">Envoyer le message</button>
        </form>
      </div>
    </section>
  `,
})
export class ContactComponent {
  services = ['Gros œuvre', 'Second œuvre', 'Lot technique', 'Assainissement', 'Terrassement', 'AEP', 'VRD', 'Autre'];

  submit(form: NgForm) {
    if (form.invalid) return;
    alert('Merci ! Votre message a été envoyé.');
    form.resetForm();
  }
}
