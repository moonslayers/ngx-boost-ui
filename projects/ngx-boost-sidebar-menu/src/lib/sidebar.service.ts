import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private _isOpen = signal<boolean>(true);
  readonly isOpen = this._isOpen.asReadonly();
  readonly isOpen$ = toObservable(this._isOpen);

  constructor() {
    const mql = window.matchMedia('(max-width: 991.98px)');
    this._isOpen.set(!mql.matches);

    mql.addEventListener('change', (e) => {
      if (e.matches) {
        this._isOpen.set(false);
      } else {
        this._isOpen.set(true);
      }
    });
  }

  toggle(): void {
    this._isOpen.update(v => !v);
  }

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }
}
