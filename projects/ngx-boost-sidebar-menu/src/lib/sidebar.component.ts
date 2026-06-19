import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
  afterNextRender,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarService } from './sidebar.service';
import { SIDEBAR_CONFIG } from './sidebar-token';
import type { SidebarSection, SidebarItem } from './sidebar.types';

@Component({
  selector: 'ngx-boost-sidebar-menu',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sidebar-collapsed]': '!sidebarService.isOpen()',
  },
})
export class SidebarComponent {
  protected readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);
  private readonly config = inject(SIDEBAR_CONFIG);

  protected readonly brand = computed(() => this.config.brand);
  protected readonly sections = computed(() => this.config.sections);
  protected readonly profile = computed(() => this.config.profile ?? null);

  private openSubMenus = signal<Set<string>>(new Set());

  protected toggleSubMenu(item: SidebarItem, depth: number): void {
    const key = `${depth}-${item.label}`;
    this.openSubMenus.update(set => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  protected isSubMenuOpen(item: SidebarItem, depth: number): boolean {
    return this.openSubMenus().has(`${depth}-${item.label}`);
  }

  protected getSectionTitle(section: SidebarSection): string {
    return section.title ?? this.toTitleCase(section.name);
  }

  protected toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private autoOpenSubMenusForActiveRoute(): void {
    const currentSections = this.sections();
    this.openSubMenus.update(set => {
      const next = new Set(set);
      for (const section of currentSections) {
        this.markActiveInItems(section.items, 0, next);
      }
      return next;
    });
  }

  private markActiveInItems(items: SidebarItem[], depth: number, set: Set<string>): boolean {
    let hasActive = false;
    for (const item of items) {
      if (item.route && this.router.isActive(item.route, {
        paths: 'subset',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored',
      })) {
        hasActive = true;
      }
      if (item.children) {
        const childHasActive = this.markActiveInItems(item.children, depth + 1, set);
        if (childHasActive) {
          set.add(`${depth}-${item.label}`);
          hasActive = true;
        }
      }
    }
    return hasActive;
  }

  constructor() {
    afterNextRender(() => {
      this.autoOpenSubMenusForActiveRoute();
    });

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.autoOpenSubMenusForActiveRoute();
      });
  }
}
