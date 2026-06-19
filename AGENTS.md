# AGENTS.md — ngx-boost-ui

Monorepo Angular 22 de librerías UI basadas en Bootstrap 5 y Bootstrap Icons.
Tres proyectos bajo `projects/`:

| Proyecto                 | Tipo     | Selector                 |
| ------------------------ | -------- | ------------------------ |
| `ngx-boost-sidebar-menu` | Librería | `ngx-boost-sidebar-menu` |
| `ngx-boost-topbar`       | Librería | *(esqueleto)*            |
| `demo-app`               | App demo | `app-root`               |

## Comandos

```bash
# Build librería (obligatorio antes que la demo-app)
ng build ngx-boost-sidebar-menu

# Build + serve demo-app (después de build librería)
ng serve demo-app

# Build todo de una (la app rebuilds la librería si es necesario)
ng build demo-app

# Tests
ng test ngx-boost-sidebar-menu   # librería
ng test demo-app                 # demo

# Lint
ng lint ngx-boost-sidebar-menu
ng lint demo-app
```

## Build order

`tsconfig.json` mapea `ngx-boost-sidebar-menu` → `./dist/ngx-boost-sidebar-menu`.
La librería debe compilarse **antes** que la demo-app la consuma.

## Arquitectura de librería

Todas las librerías siguen este patrón:

```
projects/ngx-boost-<name>/
├── ng-package.json
├── package.json              ← peerDeps: @angular/common, @angular/core, @angular/router
├── schematics/               ← ng-add placeholder (collection.json + ng-add/)
└── src/
    ├── public-api.ts         ← Entry point: exporta servicio, tipos, token, componente
    └── lib/
        ├── *.types.ts        ← Interfaces del config público
        ├── *.service.ts      ← Servicio singleton (providedIn: 'root')
        ├── *-token.ts        ← InjectionToken + provide*Config()
        ├── *.component.ts    ← Standalone component (selector: ngx-boost-<name>)
        ├── *.component.html
        ├── *.component.scss
        ├── *.component.spec.ts
        └── _variables.scss   ← Variables Sass overrideables, expuestas como asset
```

Se usa `compilationMode: partial` en `tsconfig.lib.prod.json`.
`ng-package.json` expone `_variables.scss` como asset con `"assets": ["src/lib/_variables.scss"]`.

## SidebarService

Servicio singleton que maneja el estado del sidebar con signals.
Particularidad: el **constructor** usa `window.matchMedia('(max-width: 991.98px)')` para:
- Inicializar cerrado en móvil, abierto en desktop
- Escuchar cambios de resize con `addEventListener('change', ...)` y auto-actualizar

Expone `isOpen: Signal<boolean>` (readonly) e `isOpen$: Observable<boolean>`.

## Config provider pattern

```typescript
// Consumidor app.config.ts
import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';

providers: [
  provideSidebarConfig({
    brand: { icon: 'bi-moon-stars', name: 'Moonslayers', version: 'v0.5.8' },
    sections: [
      { name: 'main', items: [...] },       // 1ra sección: sin header visible
      { name: 'career', title: 'Carrera', items: [...] },  // con header
    ],
    profile: { userName: 'Moonslayers', userRole: 'Admin', onLogout: () => {...} },
  }),
]
```

## Bootstrap Icons

Las librerías usan iconos `bi-*` (ej: `bi-grid`, `bi-person`).
El CSS debe incluirse explícitamente en el angular.json del consumidor:

```json
"styles": [
  "projects/demo-app/src/styles.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css"
]
```

## Dependencias del consumidor (peerDependencies)

- `@angular/common`, `@angular/core`, `@angular/router` (^22.0.0)
- `bootstrap` (^5.3.x)
- `bootstrap-icons` (^1.13.x)

## Testing

Usa Vitest (`@angular/build:unit-test`), no Karma.
Archivos `*.spec.ts` con `vitest/globals` types.

## Estilo y tooling

- **Prettier**: 100 print width, single quotes, parser `angular` para HTML
- **ESLint**: `angular-eslint`, selector prefix `lib` para directives, `lib`/`app` para components
- **SCSS**: Bootstrap importado con variables overrideables (demo-app usa `@import "../../../node_modules/bootstrap/scss/bootstrap"`)
- **Sin NgModules**: todo standalone components + signals
