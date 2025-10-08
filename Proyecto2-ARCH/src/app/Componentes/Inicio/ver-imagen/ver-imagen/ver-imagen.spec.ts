import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImagen } from './ver-imagen';

describe('VerImagen', () => {
  let component: VerImagen;
  let fixture: ComponentFixture<VerImagen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerImagen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerImagen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
