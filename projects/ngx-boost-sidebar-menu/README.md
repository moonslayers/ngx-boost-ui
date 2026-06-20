# ngx-boost-sidebar-menu

Sidebar de navegación responsive para Angular + Bootstrap 5, con soporte de submenús anidados, secciones, perfil de usuario, y colapso automático en móvil.

## Características

- **Responsive**: colapsado por defecto en móvil (< 992px), abierto en desktop
- **Submenús anidados**: profundidad arbitraria con animación slideDown
- **Secciones**: múltiples secciones con header opcional (la primera sección no muestra header)
- **RouterLink**: integración directa con Angular Router, con `routerLinkActive` y apertura automática de submenús en ruta activa
- **Perfil de usuario**: footer opcional con nombre, rol y botón de logout
- **Servicio**: `SidebarService` con signals y observable para controlar estado desde cualquier parte
- **Backdrop**: overlay semi-transparente en móvil al abrir el sidebar
- **Sass variables**: personalizables mediante override

## Requisitos

| Dependencia     | Versión |
| --------------- | ------- |
| Angular         | ^22.0.0 |
| Bootstrap       | ^5.3.x  |
| bootstrap-icons | ^1.13.x |

## Instalación

```bash
npm install ngx-boost-sidebar-menu bootstrap bootstrap-icons
```

Funciona con proyectos que usen **Sass** o **CSS plano**. La librería compila su propio SCSS a CSS durante el build, así que no necesitas un preprocesador para consumirla.

### Con Sass (recomendado)

Agrega Bootstrap Icons y Bootstrap a los `styles` de tu `angular.json`:

```json
"styles": [
  "src/styles.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css"
]
```

Importa Bootstrap en tu SCSS principal:

```scss
// src/styles.scss
@import 'bootstrap/scss/bootstrap';
```

**Ventaja**: puedes personalizar el sidebar sobreescribiendo las variables Sass (ver sección [Personalización con Sass](#personalizaci%C3%B3n-con-sass)).

### Con CSS plano

Agrega ambos CSS a los `styles` de tu `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css"
]
```

No necesitas archivos SCSS ni import adicionales.

**Diferencia**: la personalización via variables Sass no está disponible. El sidebar usará los valores por defecto. Para cambios de estilo, deberías sobrescribir clases CSS manualmente en tu propio stylesheet.

## Uso básico

### 1. Proveer configuración

En `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      // ... tus rutas
    ]),
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
            { label: 'Profile', icon: 'bi-person', route: '/profile' },
          ],
        },
        {
          name: 'projects',
          title: 'Proyectos',
          items: [
            { label: 'Ver todos', icon: 'bi-folder', route: '/projects' },
          ],
        },
      ],
      profile: {
        userName: 'moonslayers',
        userRole: 'admin',
        onLogout: () => {
          console.log('Cerrando sesión...');
        },
      },
    }),
  ],
};
```

### 2. Importar el componente standalone

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from 'ngx-boost-sidebar-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="d-flex vh-100 overflow-hidden">
      <app-sidebar-menu />
      <main class="flex-grow-1 overflow-auto bg-body-tertiary">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}
```

¡Listo! El sidebar ya funciona.

## API

### Interfaces de configuración

#### `SidebarBrand`

```typescript
interface SidebarBrand {
  icon: string;       // Clase Bootstrap Icon (ej: 'bi-moon-stars')
  name: string;       // Nombre de la marca/aplicación
  version?: string;   // Versión opcional (se muestra como badge)
}
```

#### `SidebarItem`

```typescript
interface SidebarItem {
  label: string;                    // Texto visible
  icon?: string;                    // Clase Bootstrap Icon
  route?: string;                   // Ruta Angular (routerLink)
  children?: SidebarItem[];         // Subítems para menú anidado
}
```

#### `SidebarSection`

```typescript
interface SidebarSection {
  name: string;                    // Identificador único
  title?: string;                  // Título visible. Si no se provee, se capitaliza `name`
  items: SidebarItem[];            // Items del menú
}
```

> La **primera sección** nunca muestra el header (title), ideal para ítems principales como Dashboard, Home, etc.

#### `SidebarProfile`

```typescript
interface SidebarProfile {
  userName: string;       // Nombre del usuario
  userRole: string;       // Rol del usuario
  onLogout?: () => void;  // Callback al hacer click en Logout
}
```

#### `SidebarConfig`

```typescript
interface SidebarConfig {
  brand: SidebarBrand;           // Marca/logo del sidebar
  sections: SidebarSection[];    // Secciones de navegación
  profile?: SidebarProfile;      // Footer con perfil de usuario
}
```

### Provider

```typescript
provideSidebarConfig(config: SidebarConfig): Provider[]
```

Usar en el array `providers` de `ApplicationConfig` o de un componente.

### SidebarService

```typescript
class SidebarService {
  readonly isOpen: Signal<boolean>;     // Signal readonly del estado
  readonly isOpen$: Observable<boolean>; // Observable del estado
  toggle(): void;                        // Alterna abierto/cerrado
  open(): void;                          // Abre el sidebar
  close(): void;                         // Cierra el sidebar
}
```

El servicio se provee en `root`. Úsalo para controlar el sidebar desde otros componentes (ej: un botón hamburguesa en un topbar):

```typescript
import { inject } from '@angular/core';
import { SidebarService } from 'ngx-boost-sidebar-menu';

@Component({...})
export class TopbarComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  isSidebarOpen = this.sidebarService.isOpen;
}
```

### Comportamiento responsive

| Viewport          | Breakpoint    | Sidebar                            |
| ----------------- | ------------- | ---------------------------------- |
| Móvil             | < 992px       | Oculto por defecto, se superpone con backdrop al abrirse |
| Desktop           | >= 992px      | Visible por defecto, ocupa 260px   |

## Personalización con Sass

Puedes sobreescribir las variables Sass antes de importar Bootstrap:

```scss
$ngx-sidebar-width: 280px;
$ngx-sidebar-mobile-breakpoint: 768px;

@import 'bootstrap/scss/bootstrap';
@import 'ngx-boost-sidebar-menu/variables';
```

| Variable                               | Default    | Descripción                         |
| -------------------------------------- | ---------- | ----------------------------------- |
| `$ngx-sidebar-width`                   | `260px`    | Ancho del sidebar en desktop        |
| `$ngx-sidebar-transition`              | `width 0.3s ease, transform 0.3s ease` | Transición de apertura/cierre |
| `$ngx-sidebar-z-index`                 | `1040`     | Z-index del sidebar                 |
| `$ngx-sidebar-backdrop-z-index`        | `1050`     | Z-index del backdrop móvil          |
| `$ngx-sidebar-mobile-breakpoint`       | `991.98px` | Breakpoint para vista móvil         |
| `$ngx-sidebar-icon-bg-opacity`         | `0.1`      | Opacidad del fondo de iconos        |
| `$ngx-sidebar-item-hover-opacity`      | `0.06`     | Opacidad del hover de ítems         |
| `$ngx-sidebar-submenu-animation-duration` | `0.2s`  | Duración animación submenú          |
| `$ngx-sidebar-arrow-rotation-duration`    | `0.25s` | Duración rotación flecha expandible |

## Testing

```bash
ng test ngx-boost-sidebar-menu
```

## Licencia

MIT
