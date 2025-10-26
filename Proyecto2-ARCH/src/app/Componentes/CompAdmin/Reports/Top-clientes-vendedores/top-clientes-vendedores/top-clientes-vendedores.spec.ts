import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesVendedores } from './top-clientes-vendedores';

describe('TopClientesVendedores', () => {
  let component: TopClientesVendedores;
  let fixture: ComponentFixture<TopClientesVendedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientesVendedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientesVendedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
