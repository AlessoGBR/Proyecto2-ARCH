import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarSancion } from './quitar-sancion';

describe('QuitarSancion', () => {
  let component: QuitarSancion;
  let fixture: ComponentFixture<QuitarSancion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuitarSancion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitarSancion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
