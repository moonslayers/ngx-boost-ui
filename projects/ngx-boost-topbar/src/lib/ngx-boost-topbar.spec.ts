import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBoostTopbar } from './ngx-boost-topbar';

describe('NgxBoostTopbar', () => {
  let component: NgxBoostTopbar;
  let fixture: ComponentFixture<NgxBoostTopbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBoostTopbar],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxBoostTopbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
