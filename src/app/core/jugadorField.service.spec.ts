import { TestBed } from '@angular/core/testing';

import { JugadorFieldService } from './jugadorField.service';

describe('JugadorFieldService', () => {
  let service: JugadorFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
