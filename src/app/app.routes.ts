import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirection par défaut vers login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Authentification
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'inscription',
    loadComponent: () =>
      import('./pages/inscription/inscription.page').then(m => m.InscriptionPage),
  },
  {
    path: 'inscription1',
    loadComponent: () =>
      import('./pages/inscription1/inscription1.page').then(m => m.Inscription1Page),
  },
  {
    path: 'inscription3',
    loadComponent: () =>
      import('./pages/inscription3/inscription3.page').then(m => m.Inscription3Page),
  },
  {
    path: 'inscription4',
    loadComponent: () =>
      import('./pages/inscription4/inscription4.page').then(m => m.Inscription4Page),
  },

  // Mot de passe oublié
  {
    path: 'forgot1',
    loadComponent: () =>
      import('./pages/forgot1/forgot1.page').then(m => m.Forgot1Page),
  },
  {
    path: 'forgot2',
    loadComponent: () =>
      import('./pages/forgot2/forgot2.page').then(m => m.Forgot2Page),
  },

  // Pages acheteur
  {
    path: 'acheteur',
    loadComponent: () =>
      import('./pages/acheteur/acheteur.page').then(m => m.AcheteurPage),
  },
  {
    path: 'favoris',
    loadComponent: () =>
      import('./pages/favoris/favoris.page').then(m => m.FavorisPage),
  },
];
