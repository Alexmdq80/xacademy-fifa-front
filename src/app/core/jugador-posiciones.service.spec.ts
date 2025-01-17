import { TestBed } from '@angular/core/testing';

import { JugadorPosicionesService } from './jugador-posiciones.service';

describe('JugadorPosicionesService', () => {
  let service: JugadorPosicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorPosicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
