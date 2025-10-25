import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMod } from './perfil-mod';

describe('PerfilMod', () => {
  let component: PerfilMod;
  let fixture: ComponentFixture<PerfilMod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilMod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilMod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
