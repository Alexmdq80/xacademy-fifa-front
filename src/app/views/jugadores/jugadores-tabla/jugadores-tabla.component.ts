import { Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { JugadoresService } from '../../../core/jugadores.service';
import { Jugador } from '../../../core/model/jugador.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JugadorField } from '../../../core/model/jugador-field.model';

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
  @Input() fields: JugadorField[] = [];

  playerId: number = this.valor;
  jugadores: Jugador[] = []; 
  jugador?: Jugador;

  jugadoresMatrizFields: string[][] = [[]];
  jugadorArrayFields: string[] = [];

  subscription = new Subscription();
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['valor']) {
      this.playerId = changes['valor'].currentValue;
      // this.hacerGet();
    }
  }

  hacerGet() {    
    this.subscription.add(this.jugadoresService.getDataxId(this.playerId).subscribe({
      next: res => {
        console.log("Se reciben datos de jugador x ID.");

        if (!res) {
          console.log("Consulta vacía.");
        }       
        this.jugadores = res;
        for (let x = 0; x < this.jugadores.length; x++) {
          // this.jugador = this.jugadores[x];
          this.jugadorArrayFields = Object.values(this.jugadores[x]);
          console.log(this.jugadorArrayFields.length);
          for (let z=0; z < this.jugadorArrayFields.length; z++ ){
            this.jugadoresMatrizFields[x].push(this.jugadorArrayFields[z]);
          }
        }
        console.log(this.jugadorArrayFields);
        console.log(this.jugadoresMatrizFields);
        
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));
  }

  ngOnInit(){
    this.playerId = 1;
    this.hacerGet(); 
    
    // this.jugador = { 
    //   id: 0,
    //   fifa_version: '',
    //   fifa_update: '',
    //   player_face_url: '',
    //   long_name: '',	
    //   player_positions: '',
    //   club_name: '',	
    //   nationality_name: '',
    //   overall: 0,
    //   potential: 0,
    //   value_eur: 0,
    //   wage_eur: 0,
    //   age: 0,
    //   gender: '',
    //   height_cm: 0,
    //   weight_kg: 0,
    //   preferred_foot: '',
    //   weak_foot: 0,
    //   skill_moves: 0,
    //   international_reputation: 0,
    //   work_rate: '',
    //   body_type: '',
    //   pace: 0,
    //   shooting: 0,
    //   passing: 0,
    //   dribbling: 0,
    //   defending: 0,
    //   physic: 0,
    //   attacking_crossing: 0,
    //   attacking_finishing: 0,
    //   attacking_heading_accuracy: 0,
    //   attacking_short_passing: 0,
    //   attacking_volleys: 0,
    //   skill_dribbling: 0,
    //   skill_curve: 0,
    //   skill_fk_accuracy: 0,
    //   skill_long_passing: 0,
    //   skill_ball_control: 0,
    //   movement_acceleration: 0,
    //   movement_sprint_speed: 0,
    //   movement_agility: 0,
    //   movement_reactions: 0,
    //   movement_balance: 0,
    //   power_shot_power: 0,
    //   power_jumping: 0,
    //   power_stamina: 0,
    //   power_strength: 0,
    //   power_long_shots: 0,
    //   mentality_aggression: 0,
    //   mentality_interceptions: 0,
    //   mentality_positioning: 0,
    //   mentality_vision: 0,
    //   mentality_penalties: 0,
    //   mentality_composure: 0,
    //   defending_marking: 0,
    //   defending_standing_tackle: 0,
    //   defending_sliding_tackle: 0,
    //   goalkeeping_diving: 0,
    //   goalkeeping_handling: 0,
    //   goalkeeping_kicking: 0,
    //   goalkeeping_positioning: 0,
    //   goalkeeping_reflexes: 0,
    //   goalkeeping_speed: 0,
    //   player_traits: ''   
    // };
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
