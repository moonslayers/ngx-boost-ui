/**
 * ngx-boost-sidebar-menu
 * Tipos públicos para la configuración del sidebar.
 */

export interface SidebarBrand {
  /** Clase del icono Bootstrap (ej: 'bi-moon-stars') */
  icon: string;
  /** Nombre de la marca / aplicación */
  name: string;
  /** Versión opcional (ej: 'v0.5.8') */
  version?: string;
}

export interface SidebarItem {
  /** Texto visible del item */
  label: string;
  /** Clase del icono Bootstrap (ej: 'bi-grid') */
  icon?: string;
  /** Ruta Angular (routerLink) */
  route?: string;
  /** Items hijos para submenú anidado */
  children?: SidebarItem[];
}

export interface SidebarSection {
  /** Identificador único de la sección */
  name: string;
  /** Título visible. Si no se provee, se usa `name` con capitalización */
  title?: string;
  /** Items del menú en esta sección */
  items: SidebarItem[];
}

export interface SidebarProfile {
  /** Nombre del usuario */
  userName: string;
  /** Rol del usuario */
  userRole: string;
  /** Callback opcional al hacer click en Logout */
  onLogout?: () => void;
}

export interface SidebarConfig {
  /** Configuración de la marca / branding */
  brand: SidebarBrand;
  /** Secciones del menú de navegación */
  sections: SidebarSection[];
  /** Perfil de usuario opcional (muestra footer) */
  profile?: SidebarProfile;
}
