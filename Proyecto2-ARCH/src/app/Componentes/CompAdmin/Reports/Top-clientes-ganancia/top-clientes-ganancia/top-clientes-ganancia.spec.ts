import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopClientesGanancia } from './top-clientes-ganancia';

describe('TopClientesGanancia', () => {
  let component: TopClientesGanancia;
  let fixture: ComponentFixture<TopClientesGanancia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopClientesGanancia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopClientesGanancia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
