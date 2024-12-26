import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadoresService } from '../../../core/jugadores.service';
import { Jugador } from '../../../core/model/jugador.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JugadorField } from '../../../core/model/jugador-field.model';
import { JugadorFieldService } from '../../../core/jugadorField.service'; 
// import { OutlineButtonComponent } from '../../../core/outline-button/outline-button.component';

@Component({
  selector: 'app-jugadores-tabla',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      // OutlineButtonComponent
  ],
  templateUrl: './jugadores-tabla.component.html',
  styleUrl: './jugadores-tabla.component.scss'
})
export class JugadoresTablaComponent implements OnInit, OnDestroy, OnChanges {
  
  constructor(private jugadoresService : JugadoresService, 
              private jugadorFieldService: JugadorFieldService){}
  @Input() valor = 0;
  // @Input() fields: JugadorField[] = [];
  
  fields: JugadorField[] = [];

  playerId: number = this.valor;
  jugadores: Jugador[] = []; 
  jugador?: Jugador;

  n_pagina_old: number = 1;
  n_pagina: number = 1;
  n_paginas: number = 1;
  n_cantidad?: number;

  jugadoresMatrizFields: string[][] = [[]];
  jugadorArrayFields: string[] = [];

  subscription = new Subscription();
  subscriptionField = new Subscription();

  amountView: number = 5;
  
  cambiarPagina(movimiento:number){
    this.n_pagina = this.n_pagina + movimiento;
    if (this.n_pagina < 1) {
      this.n_pagina = 1;
    } else if (this.n_pagina > this.n_paginas) {
      this.n_pagina = this.n_paginas;
    }
    this.n_pagina_old = this.n_pagina;
    
    // console.log(this.n_pagina);
    // this.hacerGetEncabezado();
    this.hacerGetDatos(this.n_pagina, this.amountView); 
  }  

  mostrarItems(){
    // this.hacerGetEncabezado();

    this.hacerGetDatos(this.n_pagina, this.amountView); 
  }

  ultimaPagina(){
    this.n_pagina = this.n_paginas;
    this.hacerGetDatos(this.n_pagina, this.amountView); 
  }
  
  primerPagina(){
    this.n_pagina = 1;
    this.hacerGetDatos(this.n_pagina, this.amountView); 
  }


  mostrarPagina(event: any){
    const valor = Number(event.target.value); // Convertimos el valor a número
    // if (!isNaN(valor)) {
    //   console.log('NaN' + this.n_pagina);
    //   this.n_pagina = this.n_pagina_old;
    // } else
    if (valor < 1 || valor > this.n_paginas) {
      this.n_pagina = this.n_pagina_old;
    } else {
      this.n_pagina = valor;
      this.n_pagina_old= valor;
      this.hacerGetDatos(this.n_pagina, this.amountView); 
    }
    console.log(this.n_pagina);    


  }  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valor']) {
      this.playerId = changes['valor'].currentValue;
      // this.hacerGet();
    }
  }

  hacerGetEncabezado() {    
    this.subscriptionField.add(this.jugadorFieldService.getFields().subscribe({
      next: res => {
        console.log("Se reciben datos de los atributos.");
        console.log(res);
        this.fields = res;
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));
  }

  hacerGetDatos(pagina:number, limit:number){
    this.subscription.add(this.jugadoresService.getDataFiltrada(pagina,limit).subscribe({
      next: res => {
        console.log("Se reciben datos de jugador x ID.");
        // console.log(res);

        if (!res) {
          console.log("Consulta vacía.");
        }       
        this.jugadores = res.data ;
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
          this.jugadoresMatrizFields.push([]);
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
    this.hacerGetEncabezado();
    this.hacerGetDatos(this.n_pagina, this.amountView); 
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
