import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPendientes } from './productos-pendientes';

describe('ProductosPendientes', () => {
  let component: ProductosPendientes;
  let fixture: ComponentFixture<ProductosPendientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosPendientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosPendientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
