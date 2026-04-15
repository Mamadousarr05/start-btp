import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, AboutComponent, ServicesComponent, ProjectsComponent, ContactComponent, FooterComponent],
  template: `
    <app-header />
    <app-hero />
    <app-about />
    <app-services />
    <app-projects />
    <app-contact />
    <app-footer />
  `,
})
export class AppComponent {}
