import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEnVenta } from './productos-en-venta';

describe('ProductosEnVenta', () => {
  let component: ProductosEnVenta;
  let fixture: ComponentFixture<ProductosEnVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosEnVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosEnVenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
