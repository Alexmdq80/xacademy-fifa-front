import { Injectable } from '@angular/core';
import { JugadorDatos } from './model/jugador-datos.model';


@Injectable({
  providedIn: 'root'
})
export class JugadorDatosService {

  constructor() { }

  getJugadorBodyType() {

    const JugadorBodyType: JugadorDatos[] = [
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
    const JugadorWorkRate: JugadorDatos[] = [
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
    const jugadorPositions: JugadorDatos[] = [
      {
        codigo: 'RW',
        view: 'Extremo Derecho' 
      },
      {
        codigo: 'CF',
        view: 'Delantero Centro' 
      },
      {
        codigo: 'LW',
        view: 'Extremo Izquierdo' 
      },
      {
        codigo: 'CAM',
        view: 'Mediocentro Ofensivo' 
      },
      {
        codigo: 'RM',
        view: 'Mediocampista Derecho' 
      },
      {
        codigo: 'CM',
        view: 'Mediocentro Centro/Box-to-Box' 
      },
      {
        codigo: 'LM',
        view: 'Mediocampista Izquierdo' 
      },
      {
        codigo: 'RW',
        view: 'Extremo Derecho' 
      },
      {
        codigo: 'CDM',
        view: 'Mediocentro Defensivo' 
      },
      {
        codigo: 'LW',
        view: 'Extremo Izquierdo' 
      },
      {
        codigo: 'RB',
        view: 'Lateral Derecho' 
      },
      {
        codigo: 'CB',
        view: 'Central' 
      },
      {
        codigo: 'LB',
        view: 'Lateral Izquierdo' 
      },
      {
        codigo: 'GK',
        view: 'Portero' 
      }
    ];
    return jugadorPositions;
  }
  getJugadorPlayerTraits() {
    const jugadorPlayerTraits: JugadorDatos[] = [
      {
        codigo: 'Solid Player',
        view: 'Jugador Sólido' 
      },
      {
        codigo: 'Leadership ',
        view: 'Liderazgo' 
      },
      {
        codigo: 'Finesse Shot',
        view: 'Tiro Fino' 
      },
      {
        codigo: 'Speed Dribbler (AI)',
        view: 'Regateador Rápido (IA)' 
      },
      {
        codigo: 'Power Header',
        view: 'Cabezazo Poderoso' 
      },
      {
        codigo: 'Chip Shot (AI)',
        view: 'Tiro Picado (IA)' 
      },
      {
        codigo: 'Long Passer (AI)',
        view: 'Pasador Largo (IA)' 
      },
      {
        codigo: 'Flair',
        view: 'Habilidad' 
      },
      {
        codigo: 'Outside Foot Shot',
        view: 'Tiro con el Pie Abierto' 
      },
      {
        codigo: 'Team Player',
        view: 'Jugador de Equipo' 
      },
      {
        codigo: 'Technical Dribbler (AI)',
        view: 'Regateador Técnico (IA)' 
      },
      {
        codigo: 'Giant Throw-in',
        view: 'Saque de Banda Gigante' 
      },
      {
        codigo: 'Early Crosser',
        view: 'Centro Temprano' 
      },
      {
        codigo: 'Long Shot Taker (AI)',
        view: 'Tirador de Distancia (IA)' 
      },
      {
        codigo: 'Playmaker (AI)',
        view: 'Director de Juego (IA)' 
      },
      {
        codigo: 'Injury Prone',
        view: 'Propenso a Lesiones' 
      },
      {
        codigo: 'Dives Into Tackles (AI)',
        view: 'Se Lanza a las Entradas (IA)' 
      }
    ];
    return jugadorPlayerTraits;
  }

  getJugadorGender() {
    const jugadorGender: JugadorDatos[] = [
      {
        codigo: 'F',
        view: 'Femenino' 
      },
      {
        codigo: 'M ',
        view: 'Masculino' 
      }  
    ];
    return jugadorGender;
  }

  getJugadorPreferredFoot() {
    const jugadorPreferredFoot: JugadorDatos[] = [
      {
        codigo: 'Left',
        view: 'Izquierdo' 
      },
      {
        codigo: 'Right ',
        view: 'Derecho' 
      }  
    ];
    return jugadorPreferredFoot;
  }


}
