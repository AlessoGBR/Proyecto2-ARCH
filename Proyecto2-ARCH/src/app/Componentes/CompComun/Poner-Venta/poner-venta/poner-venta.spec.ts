import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonerVenta } from './poner-venta';

describe('PonerVenta', () => {
  let component: PonerVenta;
  let fixture: ComponentFixture<PonerVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PonerVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PonerVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
