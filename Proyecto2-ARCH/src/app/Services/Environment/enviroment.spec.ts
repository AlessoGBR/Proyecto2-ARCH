import { TestBed } from '@angular/core/testing';

import { Enviroment } from './enviroment';

describe('Enviroment', () => {
  let service: Enviroment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Enviroment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
