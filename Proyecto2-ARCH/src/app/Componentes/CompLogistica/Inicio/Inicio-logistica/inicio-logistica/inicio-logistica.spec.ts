import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioLogistica } from './inicio-logistica';

describe('InicioLogistica', () => {
  let component: InicioLogistica;
  let fixture: ComponentFixture<InicioLogistica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioLogistica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioLogistica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
