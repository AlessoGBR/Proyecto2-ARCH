import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCategoria } from './buscar-categoria';

describe('BuscarCategoria', () => {
  let component: BuscarCategoria;
  let fixture: ComponentFixture<BuscarCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
