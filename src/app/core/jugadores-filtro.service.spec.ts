import { TestBed } from '@angular/core/testing';

import { JugadoresFiltroService } from './jugadores-filtro.service';

describe('JugadoresFiltroService', () => {
  let service: JugadoresFiltroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JugadoresFiltroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
