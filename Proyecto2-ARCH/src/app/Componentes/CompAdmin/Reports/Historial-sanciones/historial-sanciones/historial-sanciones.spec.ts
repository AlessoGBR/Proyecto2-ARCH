import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSanciones } from './historial-sanciones';

describe('HistorialSanciones', () => {
  let component: HistorialSanciones;
  let fixture: ComponentFixture<HistorialSanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialSanciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialSanciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
