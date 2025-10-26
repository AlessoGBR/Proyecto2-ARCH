import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductos } from './top-productos';

describe('TopProductos', () => {
  let component: TopProductos;
  let fixture: ComponentFixture<TopProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
