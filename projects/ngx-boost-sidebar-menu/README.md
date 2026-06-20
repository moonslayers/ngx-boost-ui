# ngx-boost-sidebar-menu

Responsive sidebar navigation component for Angular + Bootstrap 5, with nested submenus, sections, user profile, and auto-collapse on mobile.

## Features

- **Responsive**: collapsed by default on mobile (< 992px), open on desktop
- **Nested submenus**: arbitrary depth with slideDown animation
- **Sections**: multiple sections with optional header (the first section hides the header)
- **RouterLink**: direct integration with Angular Router, `routerLinkActive`, and automatic submenu expansion for active routes
- **User profile**: optional footer with name, role, and logout button
- **Service**: `SidebarService` with signals and observable to control state from anywhere
- **Backdrop**: semi-transparent overlay on mobile when the sidebar is open
- **Sass variables**: customizable via override

## Requirements

| Dependency | Version |
|---|---|
| Angular | ^22.0.0 |
| Bootstrap | ^5.3.x |
| bootstrap-icons | ^1.13.x |

## Installation

```bash
npm install ngx-boost-sidebar-menu bootstrap bootstrap-icons
```

Works with projects using **Sass** or **plain CSS**. The library compiles its own SCSS to CSS during build so you don't need a preprocessor to consume it.

### With Sass (recommended)

Add Bootstrap Icons and Bootstrap to the `styles` in your `angular.json`:

```json
"styles": [
  "src/styles.scss",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css"
]
```

Import Bootstrap in your main SCSS:

```scss
// src/styles.scss
@import 'bootstrap/scss/bootstrap';
```

**Benefit**: you can customize the sidebar by overriding Sass variables (see [Sass customization](#sass-customization)).

### With plain CSS

Add both CSS files to the `styles` in your `angular.json`:

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css"
]
```

No SCSS files or additional imports needed.

**Difference**: Sass variable customization is not available. The sidebar will use default values. For style changes, override CSS classes manually in your own stylesheet.

## Basic usage

### 1. Provide configuration

In `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      // ... your routes
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
          title: 'Projects',
          items: [
            { label: 'View all', icon: 'bi-folder', route: '/projects' },
          ],
        },
      ],
      profile: {
        userName: 'moonslayers',
        userRole: 'admin',
        onLogout: () => {
          console.log('Logging out...');
        },
      },
    }),
  ],
};
```

### 2. Import the standalone component

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

That's it! The sidebar is ready to use.

## API

### Configuration interfaces

#### `SidebarBrand`

```typescript
interface SidebarBrand {
  icon: string;       // Bootstrap Icon class (e.g. 'bi-moon-stars')
  name: string;       // Brand / application name
  version?: string;   // Optional version (shown as a badge)
}
```

#### `SidebarItem`

```typescript
interface SidebarItem {
  label: string;                    // Visible text
  icon?: string;                    // Bootstrap Icon class
  route?: string;                   // Angular route (routerLink)
  children?: SidebarItem[];         // Sub-items for nested menu
}
```

#### `SidebarSection`

```typescript
interface SidebarSection {
  name: string;                    // Unique identifier
  title?: string;                  // Visible title. Falls back to capitalized `name`
  items: SidebarItem[];            // Menu items
}
```

> The **first section** never shows a header (title), ideal for main items like Dashboard, Home, etc.

#### `SidebarProfile`

```typescript
interface SidebarProfile {
  userName: string;       // User name
  userRole: string;       // User role
  onLogout?: () => void;  // Callback when clicking Logout
}
```

#### `SidebarConfig`

```typescript
interface SidebarConfig {
  brand: SidebarBrand;           // Sidebar brand / logo
  sections: SidebarSection[];    // Navigation sections
  profile?: SidebarProfile;      // Footer with user profile
}
```

### Provider

```typescript
provideSidebarConfig(config: SidebarConfig): Provider[]
```

Use in the `providers` array of `ApplicationConfig` or a component.

### SidebarService

```typescript
class SidebarService {
  readonly isOpen: Signal<boolean>;     // Readonly signal for state
  readonly isOpen$: Observable<boolean>; // Observable for state
  toggle(): void;                        // Toggle open/closed
  open(): void;                          // Open the sidebar
  close(): void;                         // Close the sidebar
}
```

The service is provided in `root`. Use it to control the sidebar from other components (e.g., a hamburger button in a topbar):

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

### Responsive behavior

| Viewport | Breakpoint | Sidebar |
|---|---|---|
| Mobile | < 992px | Hidden by default, overlays with backdrop when open |
| Desktop | >= 992px | Visible by default, occupies 260px |

## Sass customization

Override Sass variables before importing Bootstrap:

```scss
$ngx-sidebar-width: 280px;
$ngx-sidebar-mobile-breakpoint: 768px;

@import 'bootstrap/scss/bootstrap';
@import 'ngx-boost-sidebar-menu/variables';
```

| Variable | Default | Description |
|---|---|---|
| `$ngx-sidebar-width` | `260px` | Sidebar width on desktop |
| `$ngx-sidebar-transition` | `width 0.3s ease, transform 0.3s ease` | Open/close transition |
| `$ngx-sidebar-z-index` | `1040` | Sidebar z-index |
| `$ngx-sidebar-backdrop-z-index` | `1050` | Mobile backdrop z-index |
| `$ngx-sidebar-mobile-breakpoint` | `991.98px` | Mobile breakpoint |
| `$ngx-sidebar-icon-bg-opacity` | `0.1` | Icon background opacity |
| `$ngx-sidebar-item-hover-opacity` | `0.06` | Item hover opacity |
| `$ngx-sidebar-submenu-animation-duration` | `0.2s` | Submenu animation duration |
| `$ngx-sidebar-arrow-rotation-duration` | `0.25s` | Arrow rotation duration |

## Testing

```bash
ng test ngx-boost-sidebar-menu
```

## License

MIT
