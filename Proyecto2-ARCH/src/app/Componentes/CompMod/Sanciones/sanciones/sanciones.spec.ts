import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sanciones } from './sanciones';

describe('Sanciones', () => {
  let component: Sanciones;
  let fixture: ComponentFixture<Sanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sanciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sanciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
