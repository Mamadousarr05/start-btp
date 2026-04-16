import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

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
            <li><strong>Adresse :</strong> Cité ASECNA, Immeuble en face Clinique NABY, 1er Étage — Rufisque, Dakar</li>
            <li><strong>Téléphone :</strong> +221 77 228 96 69 / +221 77 409 67 17</li>
            <li><strong>Email :</strong> startbtp1503&#64;gmail.com</li>
            <li><strong>RC :</strong> SN.DKR.2020.A.281 — <strong>NINEA :</strong> 007726451</li>
            <li><strong>Compte bancaire :</strong> SN 251209258001</li>
            <li><strong>Horaires :</strong> Lun - Sam, 8h - 18h</li>
          </ul>
        </div>
        <form class="contact-form" #f="ngForm" (ngSubmit)="submit(f)" [class.sending]="sending">
          <div class="field"><label>Nom complet<input type="text" name="name" ngModel required /></label></div>
          <div class="field"><label>Email<input type="email" name="email" ngModel required /></label></div>
          <div class="field"><label>Téléphone<input type="tel" name="phone" ngModel /></label></div>
          <div class="field"><label>Service souhaité
            <select name="service" ngModel>
              @for (s of services; track s) { <option>{{ s }}</option> }
            </select>
          </label></div>
          <div class="field"><label>Message<textarea rows="4" name="message" ngModel required></textarea></label></div>
          <button type="submit" class="btn btn-primary" [disabled]="sending">{{ sending ? 'Envoi en cours…' : 'Envoyer le message' }}</button>
          @if (status) { <p class="form-status" [class.error]="status.error">{{ status.message }}</p> }
        </form>
      </div>
    </section>
  `,
})
export class ContactComponent {
  services = ['Gros œuvre', 'Second œuvre', 'Lot technique', 'Assainissement', 'Terrassement', 'AEP', 'VRD', 'Autre'];

  // EmailJS — remplacer ces 3 valeurs par celles fournies depuis https://dashboard.emailjs.com
  private readonly EMAILJS_SERVICE_ID = 'service_d8j4lui';
  private readonly EMAILJS_TEMPLATE_ID = 'template_7rhv1on';
  private readonly EMAILJS_PUBLIC_KEY = 'iqfHuu3wr9z6J4tPU';

  sending = false;
  status: { message: string; error: boolean } | null = null;

  async submit(form: NgForm) {
    if (form.invalid || this.sending) return;
    const v = form.value;
    this.sending = true;
    this.status = null;
    try {
      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        {
          to_email: 'mausarr05@gmail.com',
          name: v.name ?? '',
          email: v.email ?? '',
          phone: v.phone ?? '',
          service: v.service ?? '',
          message: v.message ?? '',
        },
        { publicKey: this.EMAILJS_PUBLIC_KEY },
      );
      this.status = { message: 'Merci ! Votre message a bien été envoyé.', error: false };
      form.resetForm();
    } catch (err) {
      console.error('EmailJS error', err);
      this.status = { message: "Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.", error: true };
    } finally {
      this.sending = false;
    }
  }
}
