import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { OutlineButtonComponent } from '../../core/outline-button/outline-button.component';
// import { JugadorField } from '../../core/model/jugador-field.model';
// import { CommonModule } from '@angular/common';
// import { JugadorFieldService } from '../../core/jugadorField.service';
// import { Subscription } from 'rxjs';
import { FiltroComponent } from '../../core/filtro/filtro.component';
import { JugadoresTablaComponent } from './jugadores-tabla/jugadores-tabla.component';


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

export class JugadoresComponent implements OnInit {
  @ViewChild(FiltroComponent) valorNumero?: FiltroComponent;
  valorNumeroRecibido: number = 1;

  n_filtro = 1;

  recibirValor($event: any) {
    console.log('Datos recibidos:', $event);
    this.valorNumeroRecibido = $event;

  } 
  
  ngOnInit(): void { 

   }
    

}
