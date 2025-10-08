import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArticulos } from './ver-articulos';

describe('VerArticulos', () => {
  let component: VerArticulos;
  let fixture: ComponentFixture<VerArticulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerArticulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerArticulos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
