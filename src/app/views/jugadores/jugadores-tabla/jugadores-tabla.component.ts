import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadoresService } from '../../../core/jugadores.service';
import { Jugador } from '../../../core/model/jugador.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JugadorField } from '../../../core/model/jugador-field.model';
import { JugadorFieldService } from '../../../core/jugadorField.service'; 

@Component({
  selector: 'app-jugadores-tabla',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
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

  n_pagina: number = 1;
  n_paginas: number = 1;
  n_cantidad?: number;

  jugadoresMatrizFields: string[][] = [[]];
  jugadorArrayFields: string[] = [];

  subscription = new Subscription();
  subscriptionField = new Subscription();

  cambiarPagina(movimiento:number){
    this.n_pagina = this.n_pagina + movimiento;
    console.log(this.n_pagina);
    this.hacerGetEncabezado();
    this.hacerGetDatos(this.n_pagina); 
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

  hacerGetDatos(pagina:number){
    this.subscription.add(this.jugadoresService.getDataFiltrada(pagina).subscribe({
      next: res => {
        console.log("Se reciben datos de jugador x ID.");
        console.log(res);

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
    this.hacerGetDatos(1); 
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
