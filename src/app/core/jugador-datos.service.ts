import { Injectable } from '@angular/core';
import { JugadorDatos } from './model/jugador-datos.model';
import { JugadorEtiquetas } from './model/jugador-etiquetas.model';


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
      }   
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
    ] 
    return JugadorWorkRate;
  }

  getJugadorPositions() {
    const jugadorPositions: JugadorDatos[] = [
      {
        codigo: 'ST',
        view: 'Striker'
      },
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
        codigo: 'CDM',
        view: 'Mediocentro Defensivo' 
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
        codigo: 'Right',
        view: 'Derecho' 
      }  
    ];
    return jugadorPreferredFoot;
  }

  getEtiquetaGrupo() {
    const jugadorEtiquetaGrupo: JugadorEtiquetas[] = [
      {
        codigo: 'personal',
        view: 'Datos Personales' 
      },
      {
        codigo: 'general',
        view: 'Información del Jugador' 
      },
      {
        codigo: 'habilidad_global',
        view: 'Habilidades Globales' 
      },
      {
        codigo: 'skill',
        view: 'Habilidades Técnicas' 
      },
      {
        codigo: 'movement',
        view: 'Movilidad' 
      },
      {
        codigo: 'power',
        view: 'Fuerza y Potencia' 
      },
      {
        codigo: 'habilidad_mental',
        view: 'Actitud' 
      },
      {
        codigo: 'arco',
        view: 'Habilidades de Arquero' 
      },
      {
        codigo: 'defensa',
        view: 'Habilidades de Defensa' 
      },
      {
        codigo: 'ataque',
        view: 'Habilidades de Ataque' 
      },
    ];
    return jugadorEtiquetaGrupo;
  }
  
}
