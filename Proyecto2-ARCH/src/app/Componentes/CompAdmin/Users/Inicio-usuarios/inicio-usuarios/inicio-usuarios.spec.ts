import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioUsuarios } from './inicio-usuarios';

describe('InicioUsuarios', () => {
  let component: InicioUsuarios;
  let fixture: ComponentFixture<InicioUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
