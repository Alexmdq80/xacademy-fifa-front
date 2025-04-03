// import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnDestroy, OnInit, EventEmitter, Output, ViewChild, inject, AfterViewInit  } from '@angular/core';
import { Subscription, forkJoin, take, switchMap, Subject } from 'rxjs';
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
import { JugadorDatos } from '../../../core/model/jugador-datos.model';
import { Campos } from '../../../core/model/campos.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LineaTiempo } from '../../../core/model/linea-tiempo.model';
import { saveAs } from 'file-saver';
// import { EventManager } from '@angular/platform-browser';
// import { filter } from 'rxjs/operators';
// Chart.register(...registerables);


@Component({
    selector: 'app-jugadores-tabla',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkDropList,
        CdkDrag,
        MatMenu,
        MatMenuTrigger,
        MatIconModule

        // OutlineButtonComponent
    ],
    templateUrl: './jugadores-tabla.component.html',
    styleUrl: './jugadores-tabla.component.scss'
})

export class JugadoresTablaComponent implements OnInit, AfterViewInit, OnDestroy {
  private _liveAnnouncer = inject(LiveAnnouncer);

  @Output() jugadorId_EE = new EventEmitter<Jugador>();
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  displayedColumns?: string[]; 
  jugadores: Jugador[] = []; 
  dataSource = new MatTableDataSource<Jugador>(this.jugadores);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns!, event.previousIndex, event.currentIndex);
  }

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
                      // // console.log('keyObjectArray', this.keyObjectArray );
                      let i = 0;
                      console.log('keyObject', this.keyObjectArray);
                      // for (let grupo of this.jugadorEtiquetaGrupo) {
                      //   console.log('grupo', grupo);
                      //   for (let c in this.campos[grupo.codigo]) {
                      //     console.log('campo:', c);
                      //     const index = this.fieldIndex[c];
                      //     this.fieldsOrderByGroup.push(this.fields[index]);
                      //   }
                      // }
                      for (let item in this.keyObjectArray) {
                        const index = this.fieldIndex[this.keyObjectArray[item].codigo]; 
                        this.fieldsOrderByGroup.push(this.fields[index]);
                      }                        

                      // console.log('fieldsOrderByGroup', this.fieldsOrderByGroup );
                    
                      this.displayedColumns = this.keyObjectArray.map(o => o.codigo);
                      // funciona igual con este o sin este???
                      // this.dataSource.paginator = this.paginator; 
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
  jugador?: Jugador ;
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  filtros: JugadorFiltro[] = [];
  sorting: string = '';

  subscription = new Subscription();

  amountView: number = 5;
  strFiltros: string = '';

  isHovered = false;
  private destroy$ = new Subject<void>();
  // '*****************'
  // MEŃU CONTEXTUAL
  mostrar_boton: boolean = false;
  selectedRow: any;
  selectedCell?: JugadorField;

 
  onTriggerClick(cell: JugadorField, row: any, event: MouseEvent) {
    event.stopPropagation(); // Evita la propagación del clic
    // event.preventDefault(); 

    this.selectedCell = cell;
    this.selectedRow = row;  
    

}

  onContextMenu(event: MouseEvent) {
     event.stopPropagation(); // Evita la propagación del clic
     event.preventDefault(); // Evita el menú contextual del navegador
  }
    
  editarJugador(jugador: any) {
    console.log('Editar', jugador);       
    if (jugador) {
      this.jugadorId_EE.emit(jugador);
    }

  }

  verHabilidades(jugador: Jugador) {
    console.log('Visualizar habilidades', jugador);
      // *********MODAL CON RADARCHART
    const config = new MatDialogConfig();
    config.enterAnimationDuration = 500;
    config.maxHeight = '100%';
    config.maxWidth = '100%';
    config.width = '70%';
    config.height = '100%';
    config.id = 'graficoHabilidades';
    config.hasBackdrop = true;
    config.disableClose = false;
    config.panelClass = "grafico"
 
    config.data = { grafico: 'radar_habilidades',
                    player: jugador,
                    fields: this.fields
                  };

    const dialogRef = this.dialog.open(JugadoresModalComponent, config); 
    

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró con:', result);
    });
  // **************MODAL CON RADARCHART
  }

  verLineaTiempo(jugador: Jugador) {
    let dataLineaTiempo: LineaTiempo[] = [];
    console.log('Visualizar Linea de Tiempo', jugador);
    // ***suscribirse al servicio
    this.subscription.add(this.jugadoresService.
      getDataLineaTiempo(jugador.long_name, this.selectedCell!.name).subscribe({
        next: res => {
          console.log("Se reciben datos de linea de tiempo.");
          if (!res) {
            console.log("Consulta vacía.");
          }       
          dataLineaTiempo = res;

          //           *********MODAL CON RADARCHART
          const config = new MatDialogConfig();
          config.enterAnimationDuration = 500;
          config.maxHeight = '100%';
          config.maxWidth = '100%';
          config.width = '70%';
          config.height = '100%';
          config.id = 'graficoLineaTiempo';
          config.hasBackdrop = true;
          config.disableClose = false;
          config.panelClass = "grafico"

  //    '********HAY QUE BUSCAR EL HISTORIAL DE DATOS DE LA HABILIDAD SELECCIONADA'
 
          config.data = { 
            grafico: 'linea_tiempo',
            player: jugador,
            fields: this.fields,
            dataLineaTiempo: dataLineaTiempo,
          };
      
          const dialogRef = this.dialog.open(JugadoresModalComponent, config); 
          
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('El diálogo se cerró con:', result);
          });
  //  **************MODAL CON RADARCHART
 
        },
        error: error => {
          console.warn("Ha ocurrido un error con código: ", error);
        }
      }    
    ));
   
  }

  
  mostrarItems(){
    console.log('mostrarItems');     
    this.hacerGetDatos(0, this.paginator.pageSize); 
  }

  descargar(){
    console.log('desgargar ' + this.paginator.pageIndex + this.paginator.pageSize );     
    console.log(this.strFiltros);
    return this.jugadoresService.exportar_csv(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.strFiltros,
            this.sorting
    ).subscribe({
        next: (response: Blob) => {
          saveAs(response, 'data.csv');
        },
        error: (error) => {
          console.error('Error al descargar CSV:', error);
        },
    });;

    // this.jugadoresFiltroService.filtro$
    // .pipe(
    //   take(1),
    //   switchMap((res) => {
    //     console.log('Se reciben filtros para descargar.');
    //     this.strFiltros = res;
    //     return this.jugadoresService.exportar_csv(
    //       this.paginator.pageIndex,
    //       this.paginator.pageSize,
    //       this.strFiltros,
    //       this.sorting
    //     );
    //   })
    // )
    // .subscribe({
    //   next: (response: Blob) => {
    //     saveAs(response, 'data.csv');
    //   },
    //   error: (error) => {
    //     console.error('Error al descargar CSV:', error);
    //   },
    // });

    // this.subscription.add(this.jugadoresFiltroService.filtro$.subscribe({
    //   next: res => {
    //     console.log("Se reciben filtros para descargar.");
    //     this.strFiltros = res;  
    //     this.subscription.add(this.jugadoresService.exportar_csv(this.paginator.pageIndex,this.paginator.pageSize, this.strFiltros, this.sorting).subscribe(
    //       (response: Blob) => {
    //         saveAs(response, 'data.csv');
    //       },
    //       (error) => {
    //         console.error('Error al descargar CSV:', error);
    //       }
    //     ));
    //   },
    //   error: error => {
    //     console.warn("Ha ocurrido un error con código: ", error);
    //   }
    // }    
    // ));    


  }


  hacerGetDatos(pagina:number, limit:number){        
  
    this.subscription.add(this.jugadoresFiltroService.filtro$.subscribe({
      next: res => {
        console.log("Se reciben filtros.");
        this.strFiltros = res;  
        this.subscription.add(this.jugadoresService.getData(pagina,limit, this.strFiltros, this.sorting).subscribe({
          next: res => {
            console.log("Se reciben datos de jugador.");
            if (!res) {
              console.log("Consulta vacía.");
            }       
            this.jugadores = res.data ;
            
            // this.dataSource =  new MatTableDataSource<Jugador>(this.jugadores);
            // this.dataSource =  this.jugadores;
         
            // console.log(this.jugadores);
            // this.n_cantidad = res.count;
            // this.n_paginas = res.pages;
            // this.length = res.count;
            // this.dataSource.paginator = this.paginator; 
            this.paginator.length = res.count;
            // this.dataSource.sort = this.sort;
            // this.dataSource.data = this.jugadores;
            // this.dataSource.sort = this.sort;

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
    this.hacerGetDatos(0, 5);
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  ngOnDestroy(): void {
    console.log('destroy');
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  } 

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.hacerGetDatos(e.pageIndex, e.pageSize); 
  }

 /** Announce the change in sort state for assistive technology. */
 announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  // console.log(sortState.direction);
  // console.log(sortState);
  //  ACÁ TENDRÍA QUE HACER EL GET PASANDO EL PARÁMETRO DE ORDENAMIENTO.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.sorting = '&sort[1]=' + sortState.active + '&direction[1]=' + sortState.direction;
      this.hacerGetDatos(0, this.paginator.pageSize); 
    } else {
      this.sorting = '';
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}