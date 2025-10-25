import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEntregadas } from './ordenes-entregadas';

describe('OrdenesEntregadas', () => {
  let component: OrdenesEntregadas;
  let fixture: ComponentFixture<OrdenesEntregadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesEntregadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesEntregadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
