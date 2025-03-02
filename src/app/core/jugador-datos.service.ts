import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { JugadorDatos } from './model/jugador-datos.model';
import { JugadorEtiquetas } from './model/jugador-etiquetas.model';
import { JugadorFieldService } from './jugadorField.service';
import { Subscription, shareReplay, from, Observable, scheduled, asyncScheduler, of } from 'rxjs';
import { JugadorField } from './model/jugador-field.model';
import { Opciones } from './model/opciones.model';

@Injectable({
  providedIn: 'root'
})

export class JugadorDatosService implements OnInit, OnDestroy {
  subscriptionField = new Subscription();
  fields: JugadorField[] = [];
  // private getJugadorPositions$?: Observable<JugadorDatos[]>;
  getJugadorPositions$?: Observable<JugadorDatos[]> | undefined | null;
  
  getOpciones$?: Observable<Opciones>;  
  getjugadorEtiquetaGrupo$?: Observable<JugadorEtiquetas[]>;

  opciones?: Opciones; 
  etiquetasGrupo?: JugadorEtiquetas[] = [
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
    }
  ]; 

  JugadorBodyType: JugadorDatos[] = [
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
  ]; 

  JugadorWorkRate: JugadorDatos[] = [
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
  ];

  // jugadorPositions: Observable<JugadorDatos[]> = of([
  jugadorPositions: JugadorDatos[] = [
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

  jugadorPlayerTraits: JugadorDatos[] = [
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

  jugadorGender: JugadorDatos[] = [
    {
      codigo: 'F',
      view: 'Femenino' 
    },
    {
      codigo: 'M ',
      view: 'Masculino' 
    }  
  ];

  jugadorPreferredFoot: JugadorDatos[] = [
    {
      codigo: 'Left',
      view: 'Izquierdo' 
    },
    {
      codigo: 'Right',
      view: 'Derecho' 
    }  
  ];

  constructor(  private jugadorFieldServicio: JugadorFieldService ) {
    this.subscriptionField.add(this.jugadorFieldServicio.getFields().subscribe({
      next: res => {
        console.log("Se reciben datos de los atributos.");
        this.fields = res;
        this.armarOpciones();
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
  ));


   }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptionField.unsubscribe(); 
  }
  
  agregarOpcion(campo: string, objeto: any): JugadorDatos[] {    

    console.log('agregarOpcion');
    for (const field of this.fields) {
      if (field.name === campo) {
        if (!field.required && field.esUnico) {
          objeto.unshift({
            'codigo': null,
            'view': 'Seleccione una Opción'
          });
        }
        break;        
      }
    } 
    return objeto;       
  }

  armarOpciones() {
    // primero agrego la opción nula de cada campo
    const genero: JugadorDatos[] = this.agregarOpcion("gender", this.jugadorGender);
    const caracteristicas: JugadorDatos[] = this.agregarOpcion("player_traits", this.jugadorPlayerTraits);
    const posiciones: JugadorDatos[] = this.agregarOpcion("player_positions", this.jugadorPositions);
    const pie_preferido: JugadorDatos[] = this.agregarOpcion("preferred_foot", this.jugadorPreferredFoot);
    const tipo_cuerpo: JugadorDatos[] = this.agregarOpcion("body_type", this.JugadorBodyType);
    const esfuerzo: JugadorDatos[] = this.agregarOpcion("work_rate", this.JugadorWorkRate);
  // ***********
  // ahora tengo que armar el objeto
    this.opciones = {
      'gender': genero,
      'player_traits': caracteristicas,
      'player_positions': posiciones,
      'preferred_foot': pie_preferido,
      'body_type': tipo_cuerpo,
      'work_rate': esfuerzo
    }
    console.log('armar', this.opciones);

  }


  // agregarOpcion(campo: string, objeto: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // Simulación de operación asíncrona (por ejemplo, setTimeout para simular una espera)
  //     setTimeout(() => {
  //       for (const field of this.fields) {
  //         if (field.name === campo) {
  //           if (!field.required && field.esUnico) {
  //             objeto.unshift({
  //               'codigo': null,
  //               'view': 'Seleccione una Opción'
  //             });
  //           }
  //           // console.log('paso');
  //           // console.log(objeto);
  //           resolve(objeto); // Resuelve la promesa con el objeto modificado
  //           return;
  //         }
  //       }
  //       reject(new Error(`Campo '${campo}' no encontrado`)); // Rechaza la promesa si el campo no se encuentra
  //     }, 0); // Simula un retraso de 1 segundo
  //   });
  // }
  

  getJugadorBodyType() {

    const jugadorBodyType = this.agregarOpcion("body_type", this.JugadorBodyType);
    
    return jugadorBodyType;
  }
 
  getJugadorWorkRate() {
   
    const jugadorWorkRate = this.agregarOpcion("work_rate", this.JugadorWorkRate);
   
    return jugadorWorkRate;
  }

  // getJugadorPositions(): Observable<JugadorDatos[]> {
  // getJugadorPositions(): JugadorDatos[] | undefined {
  // getJugadorPositions():  Observable<JugadorDatos[]> {

  //   // const jugadorPositions = this.agregarOpcion("player_positions", this.jugadorPositions);
  //   const jugadorPositionsPromise: Promise<JugadorDatos[]> = this.agregarOpcion("player_positions", this.jugadorPositions) as Promise<JugadorDatos[]>;
  //   // let jugadorPositions: any;
  
  //   // this.agregarOpcion("player_positions", this.jugadorPositions)
  //   //   .then(data => {
  //   //     jugadorPositions = data;
  //   //   })
  //   //   .catch(error => {
  //   //     jugadorPositions = null;
  //   //     console.log('Error!!!', error);
  //   //   })
  //   //   .finally(() => {
  //   //     console.log('finalizado');
  //   //   })

  //   if (!this.getJugadorPositions$) { // Comprobar si ya existe el observable
  //     // this.getJugadorPositions$ = jugadorPositions;
  //     // this.getJugadorPositions$ = from(jugadorPositions).pipe(shareReplay(1));

  //     // this.getJugadorPositions$ = of(jugadorPositions);
  //     //scheduled(jugadorPositions, asyncScheduler).subscribe((x) => console.log(x));
  //     this.getJugadorPositions$ = scheduled(jugadorPositionsPromise, asyncScheduler).pipe(shareReplay(1));
  //     // scheduled(jugadorPositions, asyncScheduler).subscribe(posiciones => {
  //     //   console.log('Posiciones emitidas:', posiciones);

  //     // });
  //   }
  //   // console.log(jugadorPositionsPromise);
  //   // return this.getJugadorPositions$;
  //   return this.getJugadorPositions$;
  // }

  getJugadorPlayerTraits() {
  
    const jugadorPlayerTraits = this.agregarOpcion("player_traits", this.jugadorPlayerTraits);
    return jugadorPlayerTraits;
  }

  getJugadorGender() {

    const jugadorGender = this.agregarOpcion("gender", this.jugadorGender);
    return jugadorGender;
  }

  getJugadorPreferredFoot() {
   
    const jugadorPreferredFoot = this.agregarOpcion("preferred_foot", this.jugadorPreferredFoot);
    return jugadorPreferredFoot;
  }

  getOpciones():  Observable<Opciones> {
    
    if (!this.getOpciones$){
      // this.getOpciones$ = scheduled(this.opciones, asyncScheduler).pipe(shareReplay(1));
      this.getOpciones$ = of(this.opciones!).pipe(shareReplay(1));
    }
    console.log('getOpciones$', this.getOpciones$);
    console.log(this.opciones);
    return this.getOpciones$;
  }

  getEtiquetasGrupo(): Observable<JugadorEtiquetas[]>  {


    if (!this.getjugadorEtiquetaGrupo$){
      this.getjugadorEtiquetaGrupo$ = of(this.etiquetasGrupo!).pipe(shareReplay(1));
    }

    return this.getjugadorEtiquetaGrupo$;
  }
  
}


