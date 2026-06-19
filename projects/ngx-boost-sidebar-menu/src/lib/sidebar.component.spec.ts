import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideSidebarConfig } from './sidebar-token';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockConfig = {
    brand: { icon: 'bi-test', name: 'Test App', version: 'v1.0.0' },
    sections: [
      {
        name: 'main',
        items: [
          { label: 'Home', icon: 'bi-house', route: '/' },
          {
            label: 'Settings',
            icon: 'bi-gear',
            children: [
              { label: 'Profile', route: '/settings/profile' },
              { label: 'Account', route: '/settings/account' },
            ],
          },
        ],
      },
      {
        name: 'other',
        title: 'Other Section',
        items: [{ label: 'Help', icon: 'bi-question', route: '/help' }],
      },
    ],
    profile: {
      userName: 'TestUser',
      userRole: 'Admin',
      onLogout: () => {},
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideSidebarConfig(mockConfig), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.fw-bold')?.textContent).toContain('Test App');
  });

  it('should render the profile section when provided', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.sidebar-footer')?.textContent).toContain('TestUser');
  });

  it('should render section header for non-first sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const allHeaders = compiled.querySelectorAll('.fw-semibold.text-secondary');
    expect(allHeaders.length).toBe(1);
    expect(allHeaders[0]?.textContent).toContain('Other Section');
  });
});
