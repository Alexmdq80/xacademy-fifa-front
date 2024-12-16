import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OutlineButtonComponent } from '../../core/outline-button/outline-button.component';
// import { JugadorField } from '../../core/model/jugador-field.model';
// import { CommonModule } from '@angular/common';
// import { JugadorFieldService } from '../../core/jugadorField.service';
// import { Subscription } from 'rxjs';
 import { FiltroComponent } from '../../core/filtro/filtro.component';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
        OutlineButtonComponent,
        FiltroComponent
        // CommonModule
      ],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.scss'
})

export class JugadoresComponent {
  n_filtro = 1;
    
}
