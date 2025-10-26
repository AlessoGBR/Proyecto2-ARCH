import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioReportes } from './inicio-reportes';

describe('InicioReportes', () => {
  let component: InicioReportes;
  let fixture: ComponentFixture<InicioReportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioReportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioReportes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
