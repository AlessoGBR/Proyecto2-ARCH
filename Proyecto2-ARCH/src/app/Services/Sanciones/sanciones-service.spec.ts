import { TestBed } from '@angular/core/testing';

import { SancionesService } from './sanciones-service';

describe('SancionesService', () => {
  let service: SancionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SancionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
