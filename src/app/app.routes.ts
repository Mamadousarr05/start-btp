import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'STAR-BTP | Construction, Rénovation & Travaux Publics au Sénégal',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'a-propos',
    title: 'À propos de STAR-BTP | Entreprise BTP au Sénégal',
    loadComponent: () => import('./pages/about/about.page').then(m => m.AboutPage),
  },
  {
    path: 'services',
    title: 'Nos Services | STAR-BTP — Gros œuvre, VRD, Assainissement',
    loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage),
  },
  {
    path: 'projets',
    title: 'Nos Projets | STAR-BTP — Réalisations BTP au Sénégal',
    loadComponent: () => import('./pages/projects/projects.page').then(m => m.ProjectsPage),
  },
  {
    path: 'partenaires',
    title: 'Partenaires | STAR-BTP',
    loadComponent: () => import('./pages/partners/partners.page').then(m => m.PartnersPage),
  },
  {
    path: 'carrieres',
    title: 'Carrières | Rejoignez STAR-BTP',
    loadComponent: () => import('./pages/careers/careers.page').then(m => m.CareersPage),
  },
  {
    path: 'contact',
    title: 'Contact | STAR-BTP',
    loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage),
  },
  { path: '**', redirectTo: '' },
];
