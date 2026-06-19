import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSidebarConfig({
      brand: {
        icon: 'bi-moon-stars',
        name: 'Moonslayers',
        version: 'v0.5.8',
      },
      sections: [
        {
          name: 'main',
          items: [
            { label: 'Dashboard', icon: 'bi-grid', route: '/dashboard' },
            {
              label: 'Dashboards',
              icon: 'bi-bar-chart',
              children: [
                { label: 'Tiempo Producción', icon: 'bi-clock', route: '/dashboards/tiempo-produccion' },
                { label: 'Respuestas Promedio', icon: 'bi-graph-up', route: '/dashboards/respuestas-promedio' },
              ],
            },
            { label: 'Profile', icon: 'bi-person', route: '/profile' },
          ],
        },
        {
          name: 'career',
          title: 'Career',
          items: [
            { label: 'Projects', icon: 'bi-folder', route: '/projects' },
            { label: 'Career', icon: 'bi-calendar-event', route: '/career' },
          ],
        },
        {
          name: 'info',
          title: 'Info',
          items: [
            { label: 'Contact', icon: 'bi-envelope', route: '/contact' },
          ],
        },
      ],
      profile: {
        userName: 'moonslayers',
        userRole: 'admin',
        onLogout: () => {
          console.log('Logout clicked');
        },
      },
    }),
  ],
};
