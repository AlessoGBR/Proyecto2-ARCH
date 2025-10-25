import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMod } from './inicio-mod';

describe('InicioMod', () => {
  let component: InicioMod;
  let fixture: ComponentFixture<InicioMod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioMod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioMod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
