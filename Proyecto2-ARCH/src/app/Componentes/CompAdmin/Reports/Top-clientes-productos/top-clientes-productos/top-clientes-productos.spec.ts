import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesProductos } from './top-clientes-productos';

describe('TopClientesProductos', () => {
  let component: TopClientesProductos;
  let fixture: ComponentFixture<TopClientesProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientesProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientesProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
