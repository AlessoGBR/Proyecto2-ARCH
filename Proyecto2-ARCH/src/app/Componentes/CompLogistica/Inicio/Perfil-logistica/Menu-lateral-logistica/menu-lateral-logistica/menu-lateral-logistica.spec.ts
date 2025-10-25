import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralLogistica } from './menu-lateral-logistica';

describe('MenuLateralLogistica', () => {
  let component: MenuLateralLogistica;
  let fixture: ComponentFixture<MenuLateralLogistica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateralLogistica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateralLogistica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
