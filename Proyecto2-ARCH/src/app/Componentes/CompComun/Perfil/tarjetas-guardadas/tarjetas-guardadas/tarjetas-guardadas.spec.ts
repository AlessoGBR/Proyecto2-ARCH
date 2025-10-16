import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasGuardadas } from './tarjetas-guardadas';

describe('TarjetasGuardadas', () => {
  let component: TarjetasGuardadas;
  let fixture: ComponentFixture<TarjetasGuardadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetasGuardadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasGuardadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
