import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class JugadorDatosService {

  constructor() { }

  getJugadorBodyType() {

    const JugadorBodyType = [
      {
        codigo: "Unique",
        view: "Único"
      },
      {
        codigo: "Lean",
        view: "Delgado"
      },
      {
        codigo: "Normal",
        view: "Normal"
      },
      {
        codigo: "Stocky",
        view: "Robusto"
      },
      // {
      //   codigo: "Lean (170-)",
      //   view: "Delgado (170-)"
      // },
      // {
      //   codigo: "Normal (170-)",
      //   view: "Normal (170-)"
      // },
      // {
      //   codigo: "Stocky (170-)",
      //   view: "Robusto (170-)"
      // },
      // {
      //   codigo: "Lean (170-185)",
      //   view: "Delgado (170-185)"
      // },
      // {
      //   codigo: "Normal (170-185)",
      //   view: "Normal (170-185)"
      // },
      // {
      //   codigo: "Stocky (170-185)",
      //   view: "Robusto (170-185)"
      // },
      // {
      //   codigo: "Lean (185+)",
      //   view: "Delgado (185+)"
      // },
      // {
      //   codigo: "Normal (185+)",
      //   view: "Normal (185+)"
      // },
      // {
      //   codigo: "Stocky (185+)",
      //   view: "Robusto (185+)"
      // },
    ] 
    return JugadorBodyType;
  }
 
  getJugadorWorkRate() {
    const JugadorWorkRate = [
      {
        codigo: "Low",
        view: "Bajo"
      },
      {
        codigo: "Medium",
        view: "Medio"
      },
      {
        codigo: "High",
        view: "Alto"
      }
      // {
      //   codigo: "High/High",
      //   view: "Alto/Alto"
      // },
      // {
      //   codigo: "High/Medium",
      //   view: "Alto/Medio"
      // },
      // {
      //   codigo: "High/Low",
      //   view: "Alto/Bajo"
      // },
      // {
      //   codigo: "Medium/Medium",
      //   view: "Medio/Medio"
      // },
      // {
      //   codigo: "Low/High",
      //   view: "Bajo/Alto"
      // },
      // {
      //   codigo: "Medium/High",
      //   view: "Medio/Alto"
      // },
      // {
      //   codigo: "Medium/Low",
      //   view: "Medio/Bajo"
      // },
      // {
      //   codigo: "Low/Medium",
      //   view: "Bajo/Medio"
      // },
      // {
      //   codigo: "Low/Low",
      //   view: "Bajo/Bajo"
      // },

    ] 
    return JugadorWorkRate;
  }

  getJugadorPositions() {
    const jugadorPositions = [
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
    return jugadorPositions;
  }
}