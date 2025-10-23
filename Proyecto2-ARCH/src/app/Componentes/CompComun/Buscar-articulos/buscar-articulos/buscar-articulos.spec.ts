import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarArticulos } from './buscar-articulos';

describe('BuscarArticulos', () => {
  let component: BuscarArticulos;
  let fixture: ComponentFixture<BuscarArticulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarArticulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarArticulos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
