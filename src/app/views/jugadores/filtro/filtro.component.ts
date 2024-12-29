// import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { JugadorFieldService } from '../../../core/jugadorField.service';
// import { Input } from '@angular/core';
import { JugadorField } from '../../../core/model/jugador-field.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JugadorFiltro } from '../../../core/model/jugador-filtro.model';
import { JugadoresFiltroService  } from '../../../core/jugadores-filtro.service';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
   ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})

export class FiltroComponent implements OnInit, OnDestroy {

  // @Input() n_filtro = 0;
  
  // @Output() valorNumero = new EventEmitter<any>();

  constructor(private jugadorFieldService: JugadorFieldService,
              private jugadoresFiltros: JugadoresFiltroService
  ){}
  
  id: number = 0;

  fields: JugadorField[] = [];
  
  filtro: JugadorFiltro = {
    id: 0,
    field: '',
    value: '',
    value_min: 0,
    value_max: 0
  };

  filtros: JugadorFiltro[] = [];

  subscription = new Subscription();
 
  isEnabled = new FormControl(false);
  inputString = false;
  inputNumber = false;
  // selectedOption: JugadorField [] = [{ 
  //   name: '',
  //   type: '',
  //   viewName: ''
  // }];
  selectedOption: JugadorField [] = [];

  valor: string[] = [];
  valor_min: number[] = [];
  valor_max: number[] = [];
  // devolverNumero(event: any) {
  //   const valor = Number(event.target.value); // Convertimos el valor a número
  //   if (!isNaN(valor)) {
  //     this.valorNumero.emit(valor);
  //   } else {
  //     // Manejar el caso en que el valor no sea un número
  //     console.error('El valor ingresado no es un número válido');
  //   }
  //   this.valorNumero.emit(valor);
  //   // console.log(valor);
  // }
  updateValorFiltro(id_filtro: number, valor: string, valor_num: number, isMin: boolean){
    this.filtro.field = this.selectedOption[id_filtro].name;
    this.filtro.id = id_filtro;
    if (this.selectedOption[id_filtro].type === 'string') {
      this.filtro.value = valor;
      this.filtro.value_max = 0;
      this.filtro.value_min = 0;
    } else if (this.selectedOption[id_filtro].type === 'integer') {
       this.filtro.value = '';
        if (isMin) {
          this.filtro.value_min = valor_num;
       } else {
         this.filtro.value_max = valor_num;
       }
    } else {
      console.warn("Error inesperado en updateValorFiltro.");
    } 
    // ACTUALIZAR EL ARREGLO DE FILTROS ***////
    console.log(this.filtro);
    console.log(this.filtros);
    this.jugadoresFiltros.setFiltros(this.filtro);
    console.log(this.filtros);

  }
  
  removeFiltro() {
    console.log('filtro.id ' + this.filtro.id)
    this.jugadoresFiltros.removeFiltro(this.filtro.id);   
    // this.filtros = this.jugadoresFiltros.getFiltros();
  }

  onOptionSelected(opcion: JugadorField, id_filtro: number) {
//  Según la opción del "Select", mostrará para llenar un 
// "Input" para texto (nombre, por ejemplo), o
//  un rango numérico (mínimo y máximo)...
    this.selectedOption[id_filtro] = opcion;
    
    console.log('Opción seleccionada:', this.selectedOption);

    if (!this.selectedOption[id_filtro].name) {
      this.inputString = false
      this.inputNumber = false
    } else {
      switch (this.selectedOption[id_filtro].name) {
        case 'Seleccione un Filtro':
          this.inputString = false
          this.inputNumber = false
          break;

        default:
          if (this.selectedOption[id_filtro].type === 'string') {
            // console.log('cadena');
            this.inputNumber = false
            this.inputString = true
          } else {
            // console.log('numero');
            this.inputNumber = true
            this.inputString = false
          } 
          break;
      }
    }

  }

  ngOnInit(){
    this.filtros = this.jugadoresFiltros.getFiltros();
    
    this.filtro.id = this.filtros[this.filtros.length - 1].id;
    
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
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
