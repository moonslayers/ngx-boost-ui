import { InjectionToken, Provider } from '@angular/core';
import type { SidebarConfig } from './sidebar.types';

/**
 * InjectionToken para la configuración del sidebar.
 * El consumidor provee la config usando `provideSidebarConfig()`
 * en el `ApplicationConfig` o directamente en providers.
 */
export const SIDEBAR_CONFIG = new InjectionToken<SidebarConfig>(
  'SIDEBAR_CONFIG',
);

/**
 * Provee la configuración del sidebar.
 *
 * @usageNotes
 *
 * ```typescript
 * // app.config.ts
 * import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideSidebarConfig({
 *       brand: { icon: 'bi-moon-stars', name: 'Moonslayers', version: 'v0.5.8' },
 *       sections: [
 *         { name: 'main', items: [...] },
 *         { name: 'career', title: 'Carrera', items: [...] }
 *       ],
 *       profile: { userName: 'Moonslayers', userRole: 'Admin' }
 *     })
 *   ]
 * };
 * ```
 */
export function provideSidebarConfig(config: SidebarConfig): Provider[] {
  return [
    { provide: SIDEBAR_CONFIG, useValue: config },
  ];
}
