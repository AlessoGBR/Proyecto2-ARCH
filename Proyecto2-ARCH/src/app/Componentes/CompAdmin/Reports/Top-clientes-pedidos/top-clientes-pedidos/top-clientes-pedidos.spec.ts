import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesPedidos } from './top-clientes-pedidos';

describe('TopClientesPedidos', () => {
  let component: TopClientesPedidos;
  let fixture: ComponentFixture<TopClientesPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientesPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientesPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
