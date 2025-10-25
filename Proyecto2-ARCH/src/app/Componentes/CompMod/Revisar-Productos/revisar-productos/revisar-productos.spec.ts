import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarProductos } from './revisar-productos';

describe('RevisarProductos', () => {
  let component: RevisarProductos;
  let fixture: ComponentFixture<RevisarProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
