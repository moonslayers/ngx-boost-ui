# ngx-boost-ui

Monorepo de librerías UI para Angular + Bootstrap 5 con Bootstrap Icons.

**Repositorio:** [moonslayers/ngx-boost-ui](https://github.com/moonslayers/ngx-boost-ui)

## Estructura

```
projects/
├── ngx-boost-sidebar-menu/   → Sidebar de navegación responsive
├── ngx-boost-topbar/         → Topbar (esqueleto)
└── demo-app/                 → App demo que consume las librerías
```

Cada librería se publica como paquete npm independiente. La `demo-app` es solo para desarrollo y no se publica.

## Stack

| Tecnología | Versión |
|---|---|
| Angular | ^22.0.0 |
| Bootstrap | ^5.3.x |
| Bootstrap Icons | ^1.13.x |
| TypeScript | ~6.0.2 |
| Testing | Vitest (`@angular/build:unit-test`) |
| Lint | angular-eslint + ESLint 10 |
| Formateo | Prettier |

## Desarrollo

Las librerías se compilan con `compilationMode: partial` (ng-packagr).
La demo-app resuelve los imports de las librerías via path mapping a `./dist/`, por lo que el orden correcto es:

```bash
# 1. Build librería
ng build ngx-boost-sidebar-menu

# 2. Servir demo-app
ng serve demo-app
```

### Comandos por proyecto

```bash
# Lint
npm run lint ngx-boost-sidebar-menu
npm run lint demo-app

# Tests
npm run test ngx-boost-sidebar-menu
npm run test demo-app

# Build
npm run build ngx-boost-sidebar-menu
npm run build demo-app
```

## CI/CD

GitHub Actions en `.github/workflows/ci.yml`:

- **Push/PR a `main`**: ejecuta lint → test → build de todos los proyectos
- **Push a `main` (calidad ok)**: detecta cambios de versión en cada librería y publica a npm las que cambiaron

La demo-app no se publica, solo sirve para verificación y ejemplos.

## Nueva librería

Para agregar una librería a `projects/ngx-boost-<name>/`:

1. Seguir la arquitectura estándar del proyecto (standalone components, signals, `provide*Config()` pattern)
2. Agregar ejemplos de uso en la demo-app (componentes, rutas, providers)
3. Registrar en `.github/workflows/ci.yml` los pasos de lint, test y build
4. Agregar path mapping en `tsconfig.json`

## Licencia

MIT
