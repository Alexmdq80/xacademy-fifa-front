import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class JugadorPosicionesService {

  constructor() { }
 
  getJugadorPosiciones() {
    const jugadorPosiciones = [
       {
        codigo: 'rw',
        view: 'Right Wing Forward'
       },
       {
        codigo: 'cf',
        view: 'Center Forward'
       },
       {
        codigo: 'lw',
        view: 'Left Wing Forward'
       },
       {
        codigo: 'cam',
        view: 'Central Attacking Forward'
       },
       {
        codigo: 'rm',
        view: 'Right Midfielder'
       },
       {
        codigo: 'cm',
        view: 'Central/Box-to-Box Midfielder'
       },
       {
        codigo: 'lm',
        view: 'Left Midfielder'
       },
       {
        codigo: 'rw',
        view: 'Right Wing'
       },
       {
        codigo: 'cdm',
        view: 'Central Defensive Midfielder'
       },
       {
        codigo: 'lw',
        view: 'Left Wing'
       },
       {
        codigo: 'rb',
        view: 'Right Back'
       },
       {
        codigo: 'cb',
        view: 'Center Back'
       },
       {
        codigo: 'lb',
        view: 'Left Back'
       },
       {
        codigo: 'gk',
        view: 'Goalkeeper'
       },
      ];
    return jugadorPosiciones;
  }
}