import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    title: 'Profile',
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects',
  },
  {
    path: 'career',
    loadComponent: () => import('./pages/career/career.component').then(m => m.CareerComponent),
    title: 'Career',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact',
  },
  {
    path: 'dashboards/tiempo-produccion',
    loadComponent: () => import('./pages/tiempo-produccion/tiempo-produccion.component').then(m => m.TiempoProduccionComponent),
    title: 'Tiempo Producción',
  },
  {
    path: 'dashboards/respuestas-promedio',
    loadComponent: () => import('./pages/respuestas-promedio/respuestas-promedio.component').then(m => m.RespuestasPromedioComponent),
    title: 'Respuestas Promedio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
