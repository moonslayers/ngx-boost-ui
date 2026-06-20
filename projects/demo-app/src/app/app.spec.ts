import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideSidebarConfig } from 'ngx-boost-sidebar-menu';
import { provideRouter } from '@angular/router';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { console.log('addListener'); },
    removeListener: () => { console.log('removeListener'); },
    addEventListener: () => { console.log('addEventListener'); },
    removeEventListener: () => { console.log('removeEventListener'); },
    dispatchEvent: () => false,
  }),
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideSidebarConfig({
          brand: { icon: 'bi-test', name: 'Test App', version: 'v1.0.0' },
          sections: [
            {
              name: 'main',
              items: [{ label: 'Home', icon: 'bi-house', route: '/' }],
            },
          ],
        }),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the sidebar', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.fw-bold')?.textContent).toContain('Test App');
  });
});
