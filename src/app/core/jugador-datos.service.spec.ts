import { TestBed } from '@angular/core/testing';

import { JugadorDatosService } from './jugador-datos.service';

describe('JugadorDatosService', () => {
  let service: JugadorDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadorDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
