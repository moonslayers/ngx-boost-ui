import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBoostSidebarMenu } from './ngx-boost-sidebar-menu';

describe('NgxBoostSidebarMenu', () => {
  let component: NgxBoostSidebarMenu;
  let fixture: ComponentFixture<NgxBoostSidebarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBoostSidebarMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxBoostSidebarMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
