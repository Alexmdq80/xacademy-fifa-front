// import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnDestroy, OnInit, EventEmitter, Output, ViewChild  } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
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
// import { JugadoresModalComponent } from './jugadores-modal/jugadores-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//  import { Dialog } from '@angular/cdk/dialog';
import { JugadorEtiquetas } from '../../../core/model/jugador-etiquetas.model';
import { JugadorDatosService } from '../../../core/jugador-datos.service';
import { JugadorDatos } from '../../../core/model/jugador-datos.model';
import { Campos } from '../../../core/model/campos.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

// import { filter } from 'rxjs/operators';
Chart.register(...registerables);


@Component({
    selector: 'app-jugadores-tabla',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule
        // OutlineButtonComponent
    ],
    templateUrl: './jugadores-tabla.component.html',
    styleUrl: './jugadores-tabla.component.scss'
})

export class JugadoresTablaComponent implements OnInit, OnDestroy {
  @Output() jugadorId_EE = new EventEmitter<string>();
  
  displayedColumns?: string[]; 
  jugadores: Jugador[] = []; 
  dataSource = new MatTableDataSource<Jugador>(this.jugadores);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  keyObjectArray: JugadorDatos[] = [];

  fieldsOrderByGroup: JugadorField[] = [];
  
  fieldIndex: { [name: string]: number } = {};
  
  constructor(private jugadoresService : JugadoresService, 
              private jugadorFieldServicio: JugadorFieldService,
              private jugadoresFiltroService: JugadoresFiltroService,
              public dialog: MatDialog,
              private jugadorDatosServicio: JugadorDatosService,
            ){
              forkJoin([
                    this.jugadorFieldServicio.getFields(),
                    this.jugadorFieldServicio.getFieldsByGroup(),
                    this.jugadorFieldServicio.getFieldNameToIndex(),
                    // this.jugadorFieldServicio.getKeysFieldsByGroup(),
                    this.jugadorFieldServicio.getKeysFieldsObjectByGroup(),
                    // this.jugadorFieldServicio.getKeysFieldsViewByGroup(),
                    this.jugadorDatosServicio.getEtiquetasGrupo(),
                  ]).subscribe({
                    // next: ([resGetFields, resGetFieldsByGroup, resGetKeysFieldsByGroup, resGetKeysFieldsObjectByGroup, resGetKeysViewFieldsByGroup, resEtiquetasGrupo]) => {
                    next: ([resGetFields, resGetFieldsByGroup, resGetFieldNameToIndex,resGetKeysFieldsObjectByGroup, resEtiquetasGrupo]) => {
                      this.fields = resGetFields;
                      this.campos = resGetFieldsByGroup;
                      this.fieldIndex = resGetFieldNameToIndex;
                      // this.campoKeys = resGetKeysFieldsByGroup;
                      // this.campoKeysView = resGetKeysViewFieldsByGroup;
                      this.jugadorEtiquetaGrupo = resEtiquetasGrupo;
                      // console.log('campoKeys');
                      // console.log(this.campoKeys);
                      // this.keyArray = Object.values(this.campoKeys).flatMap(arr => arr);
                      this.keyObjectArray = Object.values(resGetKeysFieldsObjectByGroup).flatMap(arr => arr);
                      // this.keyViewArray = Object.values(this.campoKeysView).flatMap(arr => arr);
                      // console.log('keyObjectArray', this.keyObjectArray );
                      for (let grupo of this.jugadorEtiquetaGrupo) {
                        for (let c in this.campos[grupo.codigo]) {
                          // const i = this.fields.findIndex(n => n.name === c);
                          const index = this.fieldIndex[c];
                          this.fieldsOrderByGroup.push(this.fields[index]);
                        }
                      }

                      // console.log('fieldsOrderByGroup', this.fieldsOrderByGroup );
                    
                      this.displayedColumns = this.keyObjectArray.map(o => o.codigo);
                      this.dataSource.paginator = this.paginator; 
                     },
                    error: error => {
                          console.warn("Ha ocurrido un error con código: ", error);
                        }
                  });
              
            
              }

  // *************
  fields: JugadorField[] = [];

  jugadorEtiquetaGrupo: JugadorEtiquetas[] = [];

  campos: Campos = {};

  jugador?: Jugador;

  // n_pagina_old: number = 1;
  // n_pagina: number = 1;
  // n_paginas: number = 1;
  // n_cantidad?: number;

  // ***paginator 
  length!: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;


  // ***************
  // jugadoresMatrizFields: string[][] = [[]];
  // jugadorArrayFields: string[] = [];

  filtros: JugadorFiltro[] = [];

  subscription = new Subscription();

  amountView: number = 5;
  strFiltros: string = '';

  isHovered = false;
  
  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  seleccionarFila(player: Jugador){

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

  // cambiarPagina(movimiento:number){
  //   this.n_pagina = this.n_pagina + movimiento;
  //   if (this.n_pagina < 1) {
  //     this.n_pagina = 1;
  //   } else if (this.n_pagina > this.n_paginas) {
  //     this.n_pagina = this.n_paginas;
  //   }
  //   this.n_pagina_old = this.n_pagina;
    
  //   this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  // }  

  mostrarItems(){
    console.log('mostrarItems');
    this.pageIndex = 0;

    this.hacerGetDatos(this.pageIndex + 1, this.pageSize, this.strFiltros); 
     
    // this.dataSource.paginator = this.paginator; 
  }

  // ultimaPagina(){
  //   this.n_pagina = this.n_paginas;
  //   this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  // }
  
  // primerPagina(){
  //   this.n_pagina = 1;
  //   this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  // }


  // mostrarPagina(event: any){
  //   const valor = Number(event.target.value); // Convertimos el valor a número

  //   if (valor < 1 || valor > this.n_paginas) {
  //     this.n_pagina = this.n_pagina_old;
  //   } else {
  //     this.n_pagina = valor;
  //     this.n_pagina_old= valor;
  //     this.hacerGetDatos(this.n_pagina, this.amountView, this.strFiltros); 
  //   }

  // }  

  hacerGetDatos(pagina:number, limit:number, strFiltros$: string){    
    this.subscription.add(this.jugadoresFiltroService.filtro$.subscribe({
      next: res => {
        console.log("Se reciben filtros.");
        this.strFiltros = res;  
        this.subscription.add(this.jugadoresService.getDataFiltrada(pagina,limit, this.strFiltros).subscribe({
          next: res => {
            console.log("Se reciben datos de jugador.");
            if (!res) {
              console.log("Consulta vacía.");
            }       
            this.jugadores = res.data ;
            
            this.dataSource =  new MatTableDataSource<Jugador>(this.jugadores);
            // this.dataSource.paginator = this.paginator; 
            console.log(this.jugadores);
            // this.n_cantidad = res.count;
            // this.n_paginas = res.pages;
            this.length = res.count;

          },
          error: error => {
            console.warn("Ha ocurrido un error con código: ", error);
          }
        }    
        ));
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));    
  }


  ngOnInit(){    
    console.log('inicializa');
    this.hacerGetDatos(this.pageIndex + 1, this.pageSize, this.strFiltros);


  }

  
  ngOnDestroy(): void {
    console.log('destroy');
    this.subscription.unsubscribe();
  } 

  handlePageEvent(e: PageEvent) {
    console.log('handle');
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.hacerGetDatos(this.pageIndex + 1, this.pageSize, this.strFiltros); 
  }
}