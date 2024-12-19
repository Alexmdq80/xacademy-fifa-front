import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadoresService } from '../../../core/jugadores.service';
import { Jugador } from '../../../core/model/jugador.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  
  constructor(private jugadoresService : JugadoresService){}
  @Input() valor = 0;

  playerId: number = this.valor;
  jugador?: Jugador;

  subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valor']) {
      this.playerId = changes['valor'].currentValue;
      this.hacerGet();
    }
  }

  hacerGet() {    
    this.subscription.add(this.jugadoresService.getDataxId(this.playerId).subscribe({
      next: res => {
        console.log("Se reciben datos de jugador x ID.");
        console.log(res);
        this.jugador = res;
        console.log(this.jugador);
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));
  }

  ngOnInit(){
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
