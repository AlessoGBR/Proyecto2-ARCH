import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLogistica } from './perfil-logistica';

describe('PerfilLogistica', () => {
  let component: PerfilLogistica;
  let fixture: ComponentFixture<PerfilLogistica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilLogistica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilLogistica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
