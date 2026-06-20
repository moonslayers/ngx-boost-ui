# ngx-boost-ui

Monorepo of UI libraries for Angular + Bootstrap 5 with Bootstrap Icons.

**Repository:** [moonslayers/ngx-boost-ui](https://github.com/moonslayers/ngx-boost-ui)

## Structure

```
projects/
├── ngx-boost-sidebar-menu/   → Responsive sidebar navigation
├── ngx-boost-topbar/         → Topbar (skeleton)
└── demo-app/                 → Demo app that consumes the libraries
```

Each library is published as an independent npm package. The `demo-app` is for development only and is not published.

## Stack

| Technology | Version |
|---|---|
| Angular | ^22.0.0 |
| Bootstrap | ^5.3.x |
| Bootstrap Icons | ^1.13.x |
| TypeScript | ~6.0.2 |
| Testing | Vitest (`@angular/build:unit-test`) |
| Lint | angular-eslint + ESLint 10 |
| Formatting | Prettier |

## Development

Libraries are built with `compilationMode: partial` (ng-packagr).
The demo-app resolves library imports via path mapping to `./dist/`, so the correct order is:

```bash
# 1. Build library
ng build ngx-boost-sidebar-menu

# 2. Serve demo-app
ng serve demo-app
```

### Per-project commands

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

GitHub Actions in `.github/workflows/ci.yml`:

- **Push/PR to `main`**: runs lint → test → build for affected projects only
- **Push to `main` (quality pass)**: detects version changes in each library and publishes to npm using Trusted Publishing

The demo-app is not published, it only serves for verification and examples.

## Adding a new library

To add a library at `projects/ngx-boost-<name>/`:

1. Follow the project's standard architecture (standalone components, signals, `provide*Config()` pattern)
2. Add usage examples in the demo-app (components, routes, providers)
3. Register lint, test and build steps in `.github/workflows/ci.yml`
4. Add path mapping in `tsconfig.json`

## License

MIT
