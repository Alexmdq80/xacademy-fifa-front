import { Component, OnChanges, OnDestroy, OnInit, ViewChild  } from '@angular/core';
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


@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
        FiltroComponent,
        JugadoresTablaComponent,
        CommonModule
      ],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.scss'
})

export class JugadoresComponent implements OnInit, OnDestroy  {
 
  constructor(private jugadorFieldService: JugadorFieldService,
              private jugadoresFiltros: JugadoresFiltroService
  ){}

  fields: JugadorField[] = [];
  
  filtros: JugadorFiltro[] = [];
  
  filtro: JugadorFiltro = {
    id: 0,
    field: '',
    value: '',
    value_min: 0,
    value_max: 0
  };

  subscription = new Subscription();

  @ViewChild(JugadoresTablaComponent) JugadorTabla?: JugadoresTablaComponent;
 
  // n_filtro = 1;

  // recibirValor($event: any) {
  //   console.log('Datos recibidos:', $event);
  //   this.valorNumeroRecibido = $event;

  // }
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
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  } 


}
