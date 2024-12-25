import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { OutlineButtonComponent } from '../../core/outline-button/outline-button.component';
// import { JugadorField } from '../../core/model/jugador-field.model';
// import { CommonModule } from '@angular/common';
// import { JugadorFieldService } from '../../core/jugadorField.service';
// import { Subscription } from 'rxjs';
import { FiltroComponent } from './filtro/filtro.component';
import { JugadoresTablaComponent } from './jugadores-tabla/jugadores-tabla.component';
import { JugadorFieldService } from '../../core/jugadorField.service'; 
import { Subscription } from 'rxjs';
import { JugadorField } from '../../core/model/jugador-field.model';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
        // OutlineButtonComponent,
        FiltroComponent,
        JugadoresTablaComponent,
        // CommonModule
      ],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.scss'
})

export class JugadoresComponent implements OnInit, OnDestroy  {
 
  constructor(private jugadorFieldService: JugadorFieldService){}
  fields: JugadorField[] = [];
  
  subscription = new Subscription();

  @ViewChild(FiltroComponent) valorNumero?: FiltroComponent;
  valorNumeroRecibido: number = 1;

  n_filtro = 1;


  recibirValor($event: any) {
    console.log('Datos recibidos:', $event);
    this.valorNumeroRecibido = $event;

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
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


}
