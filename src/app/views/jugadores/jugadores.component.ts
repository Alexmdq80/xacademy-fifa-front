import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
// import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { OutlineButtonComponent } from '../../core/outline-button/outline-button.component';
// import { JugadorField } from '../../core/model/jugador-field.model';
import { CommonModule } from '@angular/common';
// import { JugadorFieldService } from '../../core/jugadorField.service';
// import { Subscription } from 'rxjs';
import { FiltroComponent } from './filtro/filtro.component';
import { JugadoresTablaComponent } from './jugadores-tabla/jugadores-tabla.component';
import { JugadorFieldService } from '../../core/jugadorField.service'; 
import { JugadoresFiltroService } from '../../core/jugadores-filtro.service';
import { Subscription } from 'rxjs';
import { JugadorField } from '../../core/model/jugador-field.model';
import { JugadorFiltro } from '../../core/model/jugador-filtro.model';
import { AgregarPersonaComponent } from "./jugadores-tabla/agregar-persona/agregar-persona.component";
import { Jugador } from '../../core/model/jugador.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JugadoresService } from '../../core/jugadores.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';


@Component({
    selector: 'app-jugadores',
    imports: [
    FiltroComponent,
    JugadoresTablaComponent,
    CommonModule,
    AgregarPersonaComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
],
    templateUrl: './jugadores.component.html',
    styleUrl: './jugadores.component.scss'
})

export class JugadoresComponent implements OnInit, OnDestroy  {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  subscription = new Subscription();

  constructor(private jugadorFieldService: JugadorFieldService,
              private jugadoresFiltros: JugadoresFiltroService,
              private jugadoresService: JugadoresService
  ){
    this.lista = true;
    console.log(this.jugadorFieldService.getFields());
    this.subscription.add(this.jugadorFieldService.getFields().subscribe({
      next: res => {
        console.log("Se reciben datos de los atributos.");
        this.fields = res;
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));

    this.subscription.add(this.jugadoresFiltros.data$.subscribe(data => {
      if (data) {
        this.filtros = data;
      }  
    }));

    this.jugadoresFiltros.eventoAplicarFiltro.subscribe(() => {
      this.aplicarFiltro();
    });
  }

  lista: boolean = true;

  fields: JugadorField[] = [];
  
  filtros: JugadorFiltro[] = [];
  
  filtro: JugadorFiltro = {
    id: 0,
    field: '',
    value: '',
    value_min: 0,
    value_max: 0
  };


  @ViewChild(JugadoresTablaComponent) JugadorTabla?: JugadoresTablaComponent;
  @ViewChild(AgregarPersonaComponent) mostrar_formulario?: AgregarPersonaComponent;

  jugadorId: number = 0;
  
  // n_filtro = 1;

  // recibirValor($event: any) {
  //   console.log('Datos recibidos:', $event);
  //   this.valorNumeroRecibido = $event;

  // }

  descargar(formato: string) {
    // this.jugadoresFiltros.aplicarFiltro();
    if (this.JugadorTabla) {
      if (formato === 'csv') {
        this.JugadorTabla.descargar_csv();
      } else if (formato === 'xlsx') {
        this.JugadorTabla.descargar_xlsx();
      } else {
        console.warn('Formato no soportado');
      }
    }
  }


  recibirJugadorId(jugador: Jugador) { 
    console.log(this.jugadorId);
    this.jugadorId = Number(jugador.id);

    if (this.jugadorId > 0) { 
      this.lista = !this.lista;
    } else {
      this.lista = false;      
    }
  }
  cerrar_formulario() { 
    // NO PASO EL VALOR COMO PARÁMETRO, YA QUE SIEMPRE QUE AGREGAR_PERSONA
    // EMITA UN VALOR, SE DEBE CERRAR EL FORMULARIO
    this.lista = true;
  }

  agregarPersona() {
    this.jugadorId = 0;
    this.lista = !this.lista;
  }

  addFiltro() {
    this.jugadoresFiltros.addFiltro();
  }

  aplicarFiltro() {
    this.jugadoresFiltros.aplicarFiltro();
    if (this.JugadorTabla) {
      this.JugadorTabla.mostrarItems();
    }
  }

  ngOnInit(){
   
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  } 

  onTriggerClick(event: MouseEvent) {
    event.stopPropagation(); // Evita la propagación del clic
    // event.preventDefault(); 

    

}

  onContextMenu(event: MouseEvent) {
     event.stopPropagation(); // Evita la propagación del clic
     event.preventDefault(); // Evita el menú contextual del navegador
  }

}
