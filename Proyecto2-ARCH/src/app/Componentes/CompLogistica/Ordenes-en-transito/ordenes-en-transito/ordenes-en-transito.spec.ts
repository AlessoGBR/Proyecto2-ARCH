import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEnTransito } from './ordenes-en-transito';

describe('OrdenesEnTransito', () => {
  let component: OrdenesEnTransito;
  let fixture: ComponentFixture<OrdenesEnTransito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenesEnTransito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesEnTransito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
