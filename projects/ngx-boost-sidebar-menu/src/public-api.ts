/*
 * Public API Surface of ngx-boost-sidebar-menu
 */

// Services
export { SidebarService } from './lib/sidebar.service';

// Types
export type {
  SidebarBrand,
  SidebarItem,
  SidebarSection,
  SidebarProfile,
  SidebarConfig,
} from './lib/sidebar.types';

// Injection Token & Provider
export { SIDEBAR_CONFIG, provideSidebarConfig } from './lib/sidebar-token';

// Components
export { SidebarComponent } from './lib/sidebar.component';
