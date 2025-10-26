import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarUsuario } from './registar-usuario';

describe('RegistarUsuario', () => {
  let component: RegistarUsuario;
  let fixture: ComponentFixture<RegistarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
