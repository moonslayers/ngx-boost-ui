# AGENTS.md — ngx-boost-ui

Monorepo Angular 22 de librerías UI basadas en Bootstrap 5 y Bootstrap Icons.
**Repositorio:** `moonslayers/ngx-boost-ui` en GitHub.

Cada librería vive en `projects/ngx-boost-<name>/` y la app demo en `projects/demo-app/`.

```
projects/
├── ngx-boost-sidebar-menu/   ← librería
├── ngx-boost-topbar/         ← librería (esqueleto)
└── demo-app/                 ← app demo que consume las librerías
```

## Flujo de trabajo

Siempre que trabajes en cambios:

1. **Valida lint**: `npm run lint <proyecto>` (librería o demo-app)
2. **Valida tests**: `npm run test <proyecto>`
3. **Valida compilación**: `npm run build <proyecto>`

El build de las librerías debe ejecutarse **antes** que el build/test de demo-app, porque `tsconfig.json` mapea los imports via `paths` a `./dist/ngx-boost-<name>/`.

```bash
# Build librería
ng build ngx-boost-sidebar-menu

# Serve demo-app (después de build librerías)
ng serve demo-app
```

## Nueva librería

Si se crea una nueva librería en `projects/ngx-boost-<name>/`:

1. Seguir la [arquitectura estándar](#arquitectura-de-librería)
2. Agregar **ejemplos de uso** en `projects/demo-app/` (componentes, rutas, providers)
3. Agregar la librería en `.github/workflows/ci.yml` (lint + test + build)
4. Registrar el path mapping en `tsconfig.json`

## CI/CD

Workflow en `.github/workflows/ci.yml`:

- **Push/PR a main**: corre lint → test → build de **todos** los proyectos
- **Push a main + calidad ok**: detecta cambios de versión en cada librería y publica a npm las que cambiaron
- **Demo-app no se publica**: solo es para desarrollo

## Arquitectura de librería

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
        ├── *.component.ts    ← Standalone component (selector: app-<name>)
        ├── *.component.html
        ├── *.component.scss
        ├── *.component.spec.ts
        └── _variables.scss   ← Variables Sass overrideables, expuestas como asset
```

- `compilationMode: partial` en `tsconfig.lib.prod.json`
- `ng-package.json` expone assets con `"assets": ["src/lib/_variables.scss"]`
- **Sin NgModules**: todo standalone components + signals

## Estilo y tooling

- **Prettier**: 100 print width, single quotes, parser `angular` para HTML
- **ESLint**: `angular-eslint`, selector prefix `lib` para directives, `app` para components
- **SCSS**: Bootstrap importado con `@import '../../../node_modules/bootstrap/scss/bootstrap'`
- **Testing**: Vitest (`@angular/build:unit-test`), archivos `.spec.ts` con `vitest/globals`
- **Dependencias consumidor**: `@angular/common`, `@angular/core`, `@angular/router` (^22.0.0), `bootstrap` (^5.3.x), `bootstrap-icons` (^1.13.x)
- **Bootstrap Icons**: el CSS debe incluirse explícitamente en `angular.json` del consumidor (`node_modules/bootstrap-icons/font/bootstrap-icons.css`)
