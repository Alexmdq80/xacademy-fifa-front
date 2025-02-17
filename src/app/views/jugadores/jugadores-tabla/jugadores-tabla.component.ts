// import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnDestroy, OnInit, EventEmitter, Output  } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadoresService } from '../../../core/jugadores.service';
import { Jugador } from '../../../core/model/jugador.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JugadorField } from '../../../core/model/jugador-field.model';
import { JugadorFieldService } from '../../../core/jugadorField.service'; 
import { JugadorFiltro } from '../../../core/model/jugador-filtro.model';
import { JugadoresFiltroService } from '../../../core/jugadores-filtro.service';
// import { OutlineButtonComponent } from '../../../core/outline-button/outline-button.component';
import { Chart, registerables } from 'chart.js';
import { JugadoresModalComponent } from './jugadores-modal/jugadores-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//  import { Dialog } from '@angular/cdk/dialog';
import { JugadorEtiquetas } from '../../../core/model/jugador-etiquetas.model';
import { JugadorDatosService } from '../../../core/jugador-datos.service';
import { filter } from 'rxjs/operators';
Chart.register(...registerables);

interface Campo {
  [key: string]: JugadorField;
};

interface Campos {
  [key: string]: Campo;
}

interface CampoKeys {
  [key: string]: string[];
}


@Component({
    selector: 'app-jugadores-tabla',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
        // OutlineButtonComponent
    ],
    templateUrl: './jugadores-tabla.component.html',
    styleUrl: './jugadores-tabla.component.scss'
})
// export class JugadoresTablaComponent implements OnInit, OnDestroy, OnChanges {
export class JugadoresTablaComponent implements OnInit, OnDestroy {
  @Output() jugadorId_EE = new EventEmitter<string>();

  constructor(private jugadoresService : JugadoresService, 
              private jugadorFieldService: JugadorFieldService,
              private jugadoresFiltroService: JugadoresFiltroService,
              public dialog: MatDialog,
              private jugadorDatosServicio: JugadorDatosService
            ){

              this.subscriptionField.add(this.jugadorFieldService.getFields().subscribe({
                next: res => {
                  console.log("Se reciben datos de los atributos.");
                  this.fields = res;
                },
                error: error => {
                  console.warn("Ha ocurrido un error con código: ", error);
                }
              }    
              ));
          
              this.jugadorEtiquetaGrupo = this.jugadorDatosServicio.getEtiquetaGrupo();
 
                     
            }

  // *************
  fields: JugadorField[] = [];

  jugadorEtiquetaGrupo: JugadorEtiquetas[] = [];
  campoKeys: CampoKeys = {};
  campos: Campos = {};

  jugadores: Jugador[] = []; 
  jugador?: Jugador;


  n_pagina_old: number = 1;
  n_pagina: number = 1;
  n_paginas: number = 1;
  n_cantidad?: number;

  jugadoresMatrizFields: string[][] = [[]];
  jugadorArrayFields: string[] = [];

  filtros: JugadorFiltro[] = [];

  subscription = new Subscription();
  subscriptionField = new Subscription();
  subscriptionJugadoresFiltro = new Subscription();

  amountView: number = 5;
  strFiltros: string = '';

  isHovered = false;
  
  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  seleccionarFila(player: string[]){

    this.jugadorId_EE.emit(player[0]);

  // *********MODAL CON RADARCHART
    // const config = new MatDialogConfig();
    // config.enterAnimationDuration = 500;
    // config.maxHeight = '100%';
    // config.maxWidth = '100%';
    // config.width = '70%';
    // config.height = '100%';
    // config.id = 'graficoHabilidades';
    // config.hasBackdrop = true;
    // config.disableClose = false;
    // config.panelClass = "grafico"
 
    // config.data = { player: player,
    //                 fields: this.fields
    //               };

    // const dialogRef = this.dialog.open(JugadoresModalComponent, config); 
    

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('El diálogo se cerró con:', result);
    // });
  // **************MODAL CON RADARCHART
  }

  cambiarPagina(movimiento:number){
    this.n_pagina = this.n_pagina + movimiento;
    if (this.n_pagina < 1) {
      this.n_pagina = 1;
    } else if (this.n_pagina > this.n_paginas) {
      this.n_pagina = this.n_paginas;
    }
    this.n_pagina_old = this.n_pagina;
    
    this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  }  

  mostrarItems(){
    this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros);   }

  ultimaPagina(){
    this.n_pagina = this.n_paginas;
    this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  }
  
  primerPagina(){
    this.n_pagina = 1;
    this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  }


  mostrarPagina(event: any){
    const valor = Number(event.target.value); // Convertimos el valor a número

    if (valor < 1 || valor > this.n_paginas) {
      this.n_pagina = this.n_pagina_old;
    } else {
      this.n_pagina = valor;
      this.n_pagina_old= valor;
      this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
    }

  }  

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['valor']) {
  //     this.playerId = changes['valor'].currentValue;
  //     // this.hacerGet();
  //   }
  // }

  // hacerGetEncabezado() {    
  //   this.subscriptionField.add(this.jugadorFieldService.getFields().subscribe({
  //     next: res => {
  //       console.log("Se reciben datos de los atributos.");
  //       this.fields = res;
  //     },
  //     error: error => {
  //       console.warn("Ha ocurrido un error con código: ", error);
  //     }
  //   }    
  //   ));
  // }

  hacerGetDatos(pagina:number, limit:number, strFiltros$: string){    
    this.subscriptionJugadoresFiltro.add(this.jugadoresFiltroService.filtro$.subscribe({
      next: res => {
        console.log("Se reciben filtros.");
        this.strFiltros = res;
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));

    this.subscription.add(this.jugadoresService.getDataFiltrada(pagina,limit, strFiltros$).subscribe({
      next: res => {
        console.log("Se reciben datos de jugador.");
        if (!res) {
          console.log("Consulta vacía.");
        }       
        this.jugadores = res.data ;
        console.log(this.jugadores);
        this.n_cantidad = res.count;
        this.n_paginas = res.pages;
        this.jugadoresMatrizFields = [[]];
        // console.log(this.jugadores.length);
        for (let x = 0; x < this.jugadores.length; x++) {
          // this.jugador = this.jugadores[x];
          this.jugadorArrayFields = [];
          this.jugadorArrayFields = Object.values(this.jugadores[x]);
          // console.log(this.jugadorArrayFields);
          // console.log(this.jugadoresMatrizFields);
          for (let z = 0; z < this.jugadorArrayFields.length; z++ ){
            this.jugadoresMatrizFields[x].push(this.jugadorArrayFields[z]);
          }
          if (x < this.jugadores.length - 1) {
            this.jugadoresMatrizFields.push([]);
          }
        }
        // console.log(this.jugadorArrayFields);
        // console.log(this.jugadoresMatrizFields);
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));
  }

  ngOnInit(){
    // this.hacerGetEncabezado();
     // ARMAR campoKeys

    this.jugadorFieldService.getFields().pipe(
      filter(valor => valor !== null) // Espera a que el Observable emita un valor no nulo
    ).subscribe(valor => {
      for (const field of this.fields) {
               
       // en group[0] se encuentra el grupo principal al cual pertenece el campo
        if (!this.campos[field.group[0]]) {
          this.campos[field.group[0]] = {};
        }
        this.campos[field.group[0]][field.name] = field;
      } 
      console.log(this.campos);
      for (let grupo of this.jugadorEtiquetaGrupo) {
        this.campoKeys[grupo.codigo] = Object.keys(this.campos[grupo.codigo]);
      }
    });
    
    this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
    
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionField.unsubscribe();
    this.subscriptionJugadoresFiltro.unsubscribe();
  } 
}