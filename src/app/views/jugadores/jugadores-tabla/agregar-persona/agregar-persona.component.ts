import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { firstValueFrom, map, merge} from 'rxjs';
import { JugadorDatosService } from '../../../../core/jugador-datos.service';
import { MatSliderModule } from '@angular/material/slider';
import { JugadorFieldService } from '../../../../core/jugadorField.service';
import { JugadorField } from '../../../../core/model/jugador-field.model';
import { Subscription } from 'rxjs';

interface Valores {
  [key: string]: WritableSignal<string>; 
}

interface ErrorMessage {
  [key: string]: WritableSignal<string>; 
}

@Component({
  selector: 'app-agregar-persona',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.scss'
})

export class AgregarPersonaComponent implements OnInit, OnDestroy {
  jugadorPositions: any;
  jugadorWorkRate: any;
  jugadorBodyType: any;
  subscriptionField = new Subscription();
  fields: JugadorField[] = [];
  campos: any[][] = [ [{}] ];
  formulario: any[] = [ {} ];
  protected readonly value: Valores = { };
  // protected readonly value: Valores = { long_name: signal(''),
  //                              nationality_name: signal(''),
  //                              club_name: signal(''),
  //                              player_face_url: signal(''),
  //                              pace: signal(''),
  //                              passing: signal('')
  //                            };
  errorMessage: ErrorMessage = { };
  // errorMessage: ErrorMessage = { 
  //                 long_name: signal(''),
  //                 age: signal(''),
  //                 gender: signal(''),
  //                 height_cm: signal(''),
  //                 weight_kg: signal(''),
  //                 nationality_name: signal(''),
  //                 club_name: signal(''),
  //                 fifa_version: signal(''),
  //                 fifa_update: signal(''),
  //                 player_face_url: signal(''),
  //                 player_positions: signal(''),
  //                 value_eur: signal(''),
  //                 wage_eur: signal(''),
  //                 potential: signal(''),
  //                 overall: signal(''),
  //                 preferred_foot: signal(''),
  //                 weak_foot: signal(''),
  //                 skill_moves: signal(''),
  //                 international_reputation: signal(''),
  //                 work_rate: signal(''),
  //                 body_type: signal(''),
  //                 pace: signal(''),
  //                 shooting: signal(''),
  //                 passing: signal(''),
  //                 dribbling: signal(''),
  //                 defending: signal(''),
  //                 physic:signal(''),
  //                 attacking_crossing: signal(''),
  //                 attacking_finishing: signal(''),
  //                 attacking_heading_accuracy: signal(''),
  //                 attacking_short_passing: signal(''), 
  //                 attacking_volleys: signal(''),
  //                 skill_dribbling: signal(''),
  //                 skill_curve: signal(''),
  //                 skill_fk_accuracy: signal(''),
  //                 skill_long_passing: signal(''),
  //                 skill_ball_control: signal(''),
  //                 movement_acceleration: signal(''),
  //                 movement_sprint_speed: signal(''),
  //                 movement_agility: signal(''),
  //                 movement_reactions: signal(''),
  //                 movement_balance: signal(''),
  //                 power_shot_power: signal(''),
  //                 power_jumping: signal(''),
  //                 power_stamina: signpushal(''),
  //                 power_strength: signal(''),
  //                 power_long_shots: signal(''),
  //                 mentality_aggression: signal(''),
  //                 mentality_interceptions: signal(''),
  //                 mentality_positioning: signal(''),
  //                 mentality_vision: signal(''),
  //                 mentality_penalties: signal(''),
  //                 mentality_composure: signal(''),
  //                 defending_marking: signal(''),
  //                 defending_standing_tackle: signal(''),
  //                 defending_sliding_tackle: signal(''),
  //                 goalkeeping_diving: signal(''),
  //                 goalkeeping_handling: signal(''),
  //                 goalkeeping_kicking: signal(''),
  //                 goalkeeping_positioning: signal(''),
  //                 goalkeeping_reflexes: signal(''),
  //                 goalkeeping_speed: signal(''),
  //                 player_traits: signal('')
  //               };

 

    // if (target.id === 'longName') {
    //   this.value[target.id].set(target.value);
    //   // this.value.longName.set(target.value);
    // } else if (target.id === 'nationalityName') {
    //   this.value.nationalityName.set(target.value);
    // } else if (target.id === 'clubName') {
    //   this.value.clubName.set(target.value);
    // } else if (target.id === 'playerFaceUrl') {
    //   this.value.playerFaceUrl.set(target.value);
    // } else if (target.id === 'pace') {
    //   if (Number(target.value) < 0) {
    //     this.value.pace.set('0');
    //     target.value = '0';
    //   } else if (Number(target.value) > 100) {
    //     this.value.pace.set('100');
    //     target.value = '100';
    //   }
    // }
  
  
  playerForm: FormGroup[] = [];
  // playerFormAnterior; 
  // controlNameChanged:string = '';

  constructor(private fb: FormBuilder,
              private jugadorDatosServicio: JugadorDatosService,
              private jugadorFieldService: JugadorFieldService
             ) 
    {

    this.subscriptionField.add(this.jugadorFieldService.getFields().subscribe({
        next: res => {
          console.log("Se reciben datos de los atributos.");
          this.fields = res;
        },
        error: error => {
          console.warn("Ha ocurrido un error con código: ", error);
        }
      }    
    ));
    let i = 0;
    let n = 0;
    this.campos.push();
    this.campos[1] = [{}];
    
    // this.campos.push();
    
    for (const field of this.fields) {
      // *** ARMAR MENSAJES DE ERROR / VALIDADORES / Y SINGALS PARA INPUTS**
      // console.log(field.name);
      
      this.errorMessage[field.name] = signal('');     
      if (field.type === 'string') {
        this.value[field.name] = signal('');         
      }
      // *****************
      let validadores: ValidationErrors[] = [];
      
      if (field.required) {
         validadores.push(Validators.required);
      }
      if (field.esNombre) {
        validadores.push(Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/));
      }

      if (field.minLen != -1 || field.maxLen != -1) {
        validadores.push(Validators.minLength(field.minLen));
        validadores.push(Validators.maxLength(field.maxLen));
      } 

      if (field.minVal != -1 || field.maxVal != -1) {
        validadores.push(Validators.min(field.minVal));
        validadores.push(Validators.max(field.maxVal));
      } 

      if (field.group.find(g => g === 'personal')){
        this.formulario[0][field.name] = ['', validadores];
        this.campos[0][i] = field;
        i += 1;
      } 
      if (field.group.find(g => g === 'general')){
        this.formulario[0][field.name] = ['', validadores]
        this.campos[1][n] = field;
        n += 1;
      } 
      // console.log(this.formulario);
      
    }  
    // console.log(this.formulario[0]);
    console.log(this.campos[0]);
    
    console.log(this.campos[1]);
    this.playerForm[0] = this.fb.group(this.formulario[0]);
    // this.playerForm[1] = this.fb.group(this.formulario[1]);

    // this.playerForm = this.fb.group({
    //   long_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
    //   age: ['', [Validators.required, Validators.min(16), Validators.max(65)]],
    //   gender: ['', Validators.required], 
    //   height_cm: ['', [Validators.required, Validators.min(120), Validators.max(235)]], 
    //   weight_kg: ['', [Validators.required, Validators.min(40), Validators.max(130)]], 
    //   nationality_name: ['',  [Validators.required, Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
    //   club_name: ['', [Validators.required, Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
    //   fifa_version: ['', [Validators.required, Validators.min(15), Validators.max(23)]], 
    //   fifa_update: ['', [Validators.required, Validators.min(1), Validators.max(99)]], 
    //   player_face_url: ['', Validators.maxLength(255)],
    //   player_positions: ['', [Validators.required]], 
    //   value_eur: ['', [Validators.required, Validators.min(0), Validators.max(350000000)]], // Validaciones para valor
    //   wage_eur: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]], // Validaciones para salario
    //   potential: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // Validaciones para potencial
    //   overall: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    //   preferred_foot: ['', Validators.required], 
    //   weak_foot: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   skill_moves: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   international_reputation: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //   work_rate: ['', Validators.required], 
    //   body_type: ['', Validators.required], 
    //   pace: ['', [Validators.required, Validators.min(0), Validators.max(100)]], 
    //   shooting: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    //   passing: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    //   dribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   defending: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   physic: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   attacking_crossing: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   attacking_finishing: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   attacking_heading_accuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   attacking_short_passing: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   attacking_volleys: ['', Validators.required, Validators.min(0), Validators.max(99)],      
    //   skill_dribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   skill_curve: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   skill_fk_accuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   skill_long_passing: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   skill_ball_control: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   movement_acceleration: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   movement_sprint_speed: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   movement_agility: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   movement_reactions: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   movement_balance: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   power_shot_power: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   power_jumping: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   power_stamina: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   power_strength: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   power_long_shots: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_aggression: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_interceptions: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_positioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_vision: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_penalties: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   mentality_composure: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   defending_marking: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   defending_standing_tackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   defending_sliding_tackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_diving: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_handling: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_kicking: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_positioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_reflexes: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   goalkeeping_speed: ['', Validators.required, Validators.min(0), Validators.max(99)],
    //   player_traits: [''], 
    // });
   
       //  SUSCRIPCIONES???
    // for (const field of this.fields) {
    //   if (this.playerForm.get(field.name)){
    //     this.playerForm.get(field.name)?.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
    //     console.log('El valor del campo ' + field.name + ' ha cambiado a: ' + value);
    //     });
    //   };
    // }
    // this.playerForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
    //   console.log(value);
    // });
   
      // *****

    // this.playerFormAnterior = this.playerForm[0].value; 
    // this.controlNameChanged = '';

    // merge(this.playerForm[0].statusChanges, this.playerForm[0].valueChanges)
    // .pipe(
    //   map(valorActual => {
    //     for (const controlName in valorActual) {
    //       console.log(valorActual);
    //       // console.log(this.playerFormAnterior);
    //       if (valorActual[controlName] !== this.playerFormAnterior[controlName] ) {
    //            // console.log(`El control '${controlName}' ha cambiado a:`, valorActual[controlName]);
    //           this.controlNameChanged = controlName;
    //           console.log(controlName);
    //           console.log(this.playerForm[0].value['age'])
    //           break;
    //       }
    //     }
    //   }
    //   )
    // )
    // .pipe(takeUntilDestroyed())
    // .subscribe(() => this.updateErrorMessage( this.controlNameChanged ));

    merge(this.playerForm[0].statusChanges, this.playerForm[0].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());
  };

  ngOnInit() {
    this.jugadorPositions = this.jugadorDatosServicio.getJugadorPositions();
    this.jugadorWorkRate = this.jugadorDatosServicio.getJugadorWorkRate();
    this.jugadorBodyType = this.jugadorDatosServicio.getJugadorBodyType();
    


    // this.subscriptionField.add(this.jugadorFieldService.getFields().subscribe({
    //     next: res => {
    //       console.log("Se reciben datos de los atributos.");
    //       this.fields = res;
    //     },
    //     error: error => {
    //       console.warn("Ha ocurrido un error con código: ", error);
    //     }
    //   }    
    // ));


  }
  // protected onBlur(event: Event) {
  //   // const target = event.target as HTMLInputElement;

  //   this.playerFormAnterior = this.playerForm[0].value; 
  //   // this.updateErrorMessage(target.id);
    
  // }

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    // event.target as HTMLInputElement).value
    // console.log(this.fields);
    for (const field of this.fields) {
      if (target.id === field.name) {
        if (field.type === 'integer' && target.value) {
          if (Number(target.value) < field.minVal) {
            // this.value[target.id].set(String(field.minVal));
            // target.value = String(field.minVal);
            this.playerForm[0].patchValue( { [target.id]: field.minVal });
          } else if (Number(target.value) > field.maxVal) {
            // this.value[target.id].set(String(field.maxVal));
            // target.value = String(field.maxVal);
            this.playerForm[0].patchValue( { [target.id]: field.maxVal });
          }
        } else if (target.value) {
          this.value[target.id].set(target.value);
          this.playerForm[0].value[target.id] = target.value;
        } 
        break;
      }
    }  

    // this.playerFormAnterior = this.playerForm[0].value;
    // this.updateErrorMessage(target.id);
  }

  // protected onBlur(event: Event) {
  //   const target = event.target as HTMLInputElement;

  //   // event.target as HTMLInputElement).value
  //   // console.log(this.fields);
  //   for (const field of this.fields) {
  //     if (target.id === field.name) {
  //       if (field.type === 'integer') {
  //         if (Number(target.value) < field.minVal) {
  //           // this.value[target.id].set(String(field.minVal));
  //           target.value = String(field.minVal);
  //         } else if (Number(target.value) > field.maxVal) {
  //           // this.value[target.id].set(String(field.maxVal));
  //           target.value = String(field.maxVal);
  //         }
  //       } else {
  //         this.value[target.id].set(target.value);
  //       } 
  //       break;
  //     }
  //   }  
  //   this.updateErrorMessage(target.id);
  // }

  // async getFields() {
  //   try {
  //     const res = await firstValueFrom(this.jugadorFieldService.getFields()); 
  //     console.log("Se reciben datos de los atributos.");
  //     this.fields = res;
  //   } catch (error) {
  //     console.warn("Ha ocurrido un error con código: ", error);
  //   }
  // }

  ngOnDestroy(): void {
    this.subscriptionField.unsubscribe();
  }

  // async nameValidator(control: AbstractControl) {
  //   const nameRegex = /^[a-zA-ZçÇà-ÿ'`'\s]+$/;

  //   return nameRegex.test(control.value) ? null : { nameInvalid: { value: control.value } };
  // }
    
  onSubmit() {

  }

  
  trackByCampo(campo: string): number {
    // const indiceField = this.fields.findIndex(f => f.name === campo);
    // return this.fields[indiceField].viewName; 
    return this.fields.findIndex(f => f.name === campo);
  }

  valorByCampo(campo: string, nombre: string): number {
    let valor: number;

    const id = this.trackByCampo(nombre);

    if (campo === 'minLen') {
      valor = this.fields[id].minLen;   
    } else if (campo === 'maxLen') {
      valor = this.fields[id].maxLen;   
    } else if (campo === 'minVal') {
      valor = this.fields[id].minVal;   
    } else if (campo === 'maxVal') {
      valor = this.fields[id].maxVal;   
    }  
    else {
      valor = -1;
    }

    return valor;

  }


  booleanByCampo(campo: string, nombre: string): boolean {
    let valor: boolean;

    const id = this.trackByCampo(nombre);

    if (campo === 'esNombre') {
      valor = this.fields[id].esNombre;   
    } else if (campo === 'esSkill') {
      valor = this.fields[id].esSkill;   
    } else {
      valor = false;
    }

    return valor;

  }

  namesByCampo(campo: string, nombre: string): string {
    let valor;

    const id = this.trackByCampo(nombre);
 
    if (campo === 'viewName') {
      valor = this.fields[id].viewName;
    } else if (campo === 'name') {
      valor = this.fields[id].name;   
    } else {
      valor = ''
    }

    return valor;

  }
 
  
  updateErrorMessage() {
    
    for (let i = 0; i < this.campos.length; i++) {
      console.log(this.campos[i]);
      for (let campo of this.campos[i] ) {
        let nombre = campo.name;
        if (this.playerForm[0].get(nombre)) { 
          if (this.playerForm[0].get(nombre)?.hasError('required')) {
            this.errorMessage[nombre].set('Debe ingresar ' + this.namesByCampo('viewName', nombre));
          } else if (this.playerForm[0].get(nombre)?.hasError('minlength')) { 
            this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener al menos ' + this.valorByCampo('minLen', nombre) + ' caracteres');
          } else if (this.playerForm[0].get(nombre)?.hasError('maxlength')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener menos de ' + this.valorByCampo('maxLen', nombre) + ' caracteres');
          } else if (this.playerForm[0].get(nombre)?.hasError('min')) { 
            this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener un mínimo de ' + this.valorByCampo('minVal', nombre));
          } else if (this.playerForm[0].get(nombre)?.hasError('max')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener un máximo de ' + this.valorByCampo('maxVal', nombre));
          } else if (this.playerForm[0].get(nombre)?.hasError('pattern')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' no es válido');
          } else {
            this.errorMessage[nombre].set('Error sin definir en ' + this.namesByCampo('viewName', nombre));
          }
        }
      }
    }
  }
  // evaluarError(nombre: string) {
  //   if (this.playerForm[0].get(nombre)) { 
  //     if (this.playerForm[0].get(nombre)?.hasError('required')) {
  //       this.errorMessage[nombre].set('Debe ingresar ' + this.namesByCampo('viewName', nombre));
  //     } else if (this.playerForm[0].get(nombre)?.hasError('minlength')) { 
  //       this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener al menos ' + this.valorByCampo('minLen', nombre) + ' caracteres');
  //     } else if (this.playerForm[0].get(nombre)?.hasError('maxlength')) {
  //       this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener menos de ' + this.valorByCampo('maxLen', nombre) + ' caracteres');
  //     } else if (this.playerForm[0].get(nombre)?.hasError('min')) { 
  //       this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener un mínimo de ' + this.valorByCampo('minVal', nombre));
  //     } else if (this.playerForm[0].get(nombre)?.hasError('max')) {
  //       this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener un máximo de ' + this.valorByCampo('maxVal', nombre));
  //     } else if (this.playerForm[0].get(nombre)?.hasError('pattern')) {
  //       this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' no es válido');
  //     } else {
  //       this.errorMessage[nombre].set('Error sin definir en ' + this.namesByCampo('viewName', nombre));
  //     }
  //   }
  // }
  

    // for (const field of this.fields) {
    //   if (field.name = 'long_name') {
    //     if (this.playerForm.get(field.name)) {
    //       if (this.playerForm.get(field.name)?.hasError('required')) {
    //         this.errorMessage[field.name].set('Debe ingresar ' + field.viewName );
    //       }
    //       if (this.playerForm.get(field.name)?.hasError('minlength')) { 
    //         this.errorMessage[field.name].set(field.viewName + ' debe tener al menos ' + field.minLen + ' caracteres');
    //       }  
    //       if (this.playerForm.get(field.name)?.hasError('maxlength')) {
    //         this.errorMessage[field.name].set(field.viewName + ' debe tener menos de ' + field.maxLen + ' caracteres');
    //       }
    //     }
    //   }
    // }
    // // if (this.playerForm.get('long_name')?.hasError('required')) {
    //   this.errorMessage['long_name'].set('Debe ingresar el field.name y el apellido');
    // } else if (this.playerForm.get('long_name')?.hasError('pattern')) {
    //   this.errorMessage['long_name'].set('No es un field.name válido');
    // } else if (this.playerForm.get('long_name')?.hasError('maxlength')) {
    //   this.errorMessage['long_name'].set('Supera la cantidad de caracteres permitidos');
    // } else {
    //   this.errorMessage['long_name'].set('Error sin definir en field.name y Apellido');
    // }

    // if (this.playerForm.get('age')?.hasError('required')) {
    //   this.errorMessage['age'].set('Ingrese la edad');
    // } else if (this.playerForm.get('age')?.hasError('min') || this.playerForm.get('age')?.hasError('max')) {
    //   this.errorMessage['age'].set('No es una edad válida');
    // } else {
    //   this.errorMessage['age'].set('Error sin definir en Edad');
    // }

    // if (this.playerForm.get('gender')?.hasError('required')) {
    //   this.errorMessage['gender'].set('Seleccione un Sexo');
    // } else {
    //   this.errorMessage['gender'].set('Error sin definir en Sexo');
    // }

    // if (this.playerForm.get('heightCm')?.hasError('required')) {
    //   this.errorMessage['heightCm'].set('Ingrese la altura');
    // } else if (this.playerForm.get('heightCm')?.hasError('min') || this.playerForm.get('heightCm')?.hasError('max')) {
    //   this.errorMessage['heightCm'].set('No es una altura válida');
    // } else {
    //   this.errorMessage['heightCm'].set('Error sin definir en Altura');
    // }

    // if (this.playerForm.get('weightKg')?.hasError('required')) {
    //   this.errorMessage['weightKg'].set('Ingrese el peso');
    // } else if (this.playerForm.get('weightKg')?.hasError('min') || this.playerForm.get('weightKg')?.hasError('max')) {
    //   this.errorMessage['weightKg'].set('No es un peso válido');
    // } else {
    //   this.errorMessage['weightKg'].set('Error sin definir en Peso');
    // }

    // if (this.playerForm.get('nationalityName')?.hasError('required')) {
    //   this.errorMessage['nationalityName'].set('Debe ingresar la nacionalidad');
    // } else if (this.playerForm.get('nationalityName')?.hasError('pattern')) {
    //   this.errorMessage['nationalityName'].set('No es una nacionalidad válida');
    // } else if (this.playerForm.get('nationalityName')?.hasError('maxlength')) {
    //   this.errorMessage['nationalityName'].set('Supera la cantidad de caracteres permitidos');
    // } else {
    //   this.errorMessage['nationalityName'].set('Error sin definir en Nacionalidad');
    // }

    // if (this.playerForm.get('clubName')?.hasError('required')) {
    //   this.errorMessage['clubName'].set('Debe ingresar un club');
    // } else if (this.playerForm.get('clubName')?.hasError('pattern')) {
    //   this.errorMessage['clubName'].set('No es un club válido');
    // } else if (this.playerForm.get('clubName')?.hasError('maxlength')) {
    //   this.errorMessage['clubName'].set('Supera la cantidad de caracteres permitidos');
    // } else {
    //   this.errorMessage['clubName'].set('Error sin definir en Club');
    // }

    // if (this.playerForm.get('fifaVersion')?.hasError('required')) {
    //   this.errorMessage['fifaVersion'].set('Ingrese la versión de FIFA');
    // } else if (this.playerForm.get('fifaVersion')?.hasError('min') || this.playerForm.get('fifaVersion')?.hasError('max')) {
    //   this.errorMessage['fifaVersion'].set('No es una versión de FIFA válida');
    // } else {
    //   this.errorMessage['fifaVersion'].set('Error sin definir en fifaVersion');
    // }

    // if (this.playerForm.get('fifaUpdate')?.hasError('required')) {
    //   this.errorMessage['fifaUpdate'].set('Ingrese la update de FIFA');
    // } else if (this.playerForm.get('fifaUpdate')?.hasError('min') || this.playerForm.get('fifaUpdate')?.hasError('max')) {
    //   this.errorMessage['fifaUpdate'].set('No es una update de FIFA válida');
    // } else {
    //   this.errorMessage['fifaUpdate'].set('Error sin definir en fifaUpdate');
    // }

    // if (this.playerForm.get('playerFaceUrl')?.hasError('required')) {
    //   this.errorMessage['playerFaceUrl'].set('Debe ingresar la URL de la foto');
    // } else if (this.playerForm.get('playerFaceUrl')?.hasError('maxlength')) {
    //   this.errorMessage['playerFaceUrl'].set('Supera la cantidad de caracteres permitidos');
    // } else {
    //   this.errorMessage['playerFaceUrl'].set('Error sin definir en playerFaceUrl');
    // }

    // if (this.playerForm.get('playerPositions')?.hasError('required')) {
    //   this.errorMessage['playerPositions'].set('Seleccione una Posición');
    // } else {
    //   this.errorMessage['playerPositions'].set('Error sin definir en Posición');
    // }
    
    // if (this.playerForm.get('valueEur')?.hasError('required')) {
    //   this.errorMessage['valueEur'].set('Ingrese el valor en Euros');
    // } else if (this.playerForm.get('valueEur')?.hasError('min') || this.playerForm.get('valueEur')?.hasError('max')) {
    //   this.errorMessage['valueEur'].set('No es un valor en Euros válido');
    // } else {
    //   this.errorMessage['valueEur'].set('Error sin definir en Valor en Euros');
    // }
    // if (this.playerForm.get('wageEur')?.hasError('required')) {
    //   this.errorMessage['wageEur'].set('Ingrese el salario en Euros');
    // } else if (this.playerForm.get('wageEur')?.hasError('min') || this.playerForm.get('wageEur')?.hasError('max')) {
    //   this.errorMessage['wageEur'].set('No es un salario en Euros válido');
    // } else {
    //   this.errorMessage['wageEur'].set('Error sin definir en Valor en Salario');
    // }
    // if (this.playerForm.get('potential')?.hasError('required')) {
    //   this.errorMessage['potential'].set('Ingrese el Potencial');
    // } else if (this.playerForm.get('potential')?.hasError('min') || this.playerForm.get('potential')?.hasError('max')) {
    //   this.errorMessage['potential'].set('No es un Potencial válido');
    // } else {
    //   this.errorMessage['potential'].set('Error sin definir en Potencial');
    // }
    // if (this.playerForm.get('overall')?.hasError('required')) {
    //   this.errorMessage['overall'].set('Ingrese la Puntación General');
    // } else if (this.playerForm.get('overall')?.hasError('min') || this.playerForm.get('overall')?.hasError('max')) {
    //   this.errorMessage['overall'].set('No es una Puntuación General válida');
    // } else {
    //   this.errorMessage['overall'].set('Error sin definir en Puntuación General');
    // }
    // if (this.playerForm.get('preferredFoot')?.hasError('required')) {
    //   this.errorMessage['preferredFoot'].set('Seleccione un Pie Preferido');
    // } else {
    //   this.errorMessage['preferredFoot'].set('Error sin definir en Pie Preferido');
    // }
    // if (this.playerForm.get('weakFoot')?.hasError('required')) {
    //   this.errorMessage['weakFoot'].set('Seleccione una Debilidad de Pie');
    // } else {
    //   this.errorMessage['weakFoot'].set('Error sin definir en Debilidad de Pie');
    // }
    // if (this.playerForm.get('skillMoves')?.hasError('required')) {
    //   this.errorMessage['skillMoves'].set('Seleccione las Habilidades Especiales');
    // } else {
    //   this.errorMessage['skillMoves'].set('Error sin definir en Habilidades Especiales');
    // }    
    // if (this.playerForm.get('internationalReputation')?.hasError('required')) {
    //   this.errorMessage['internationalReputation'].set('Seleccione la Reputación Internacional');
    // } else {
    //   this.errorMessage['internationalReputation'].set('Error sin definir en Reputación Internacional');
    // }
    // if (this.playerForm.get('workRate')?.hasError('required')) {
    //   this.errorMessage['workRate'].set('Seleccione el Ritmo de Trabajo');
    // } else {
    //   this.errorMessage['workRate'].set('Error sin definir en Ritmo de Trabajo');
    // }
    // if (this.playerForm.get('bodyType')?.hasError('required')) {
    //   this.errorMessage['bodyType'].set('Seleccione el Tipo de Cuerpo');
    // } else {
    //   this.errorMessage['bodyType'].set('Error sin definir en Tipo de Cuerpo');
    // }
    // if (this.playerForm.get('pace')?.hasError('required')) {
    //   this.errorMessage['pace'].set('Ingrese la Velocidad');
    // } else if (this.playerForm.get('pace')?.hasError('min') || this.playerForm.get('pace')?.hasError('max')) {
    //   this.errorMessage['pace'].set('No es una Velocidad válida');
    // } else {
    //   this.errorMessage['pace'].set('Error sin definir en Velocidad');
    // }
    // if (this.playerForm.get('shooting')?.hasError('required')) {
    //   this.errorMessage['shooting'].set('Ingrese el Disparo');
    // } else if (this.playerForm.get('shooting')?.hasError('min') || this.playerForm.get('shooting')?.hasError('max')) {
    //   this.errorMessage['shooting'].set('No es un Disparo válido');
    // } else {
    //   this.errorMessage['shooting'].set('Error sin definir en Disparo');
    // }
    
  
//  slider_label(value:number): string {

//     return `${value}`;
//   }
    
  // formatLabel(value: number): string {
  //   const jugadorWorkRate = [
  //     {
  //       codigo: "Low",
  //       view: "Bajo"
  //     },
  //     {
  //       codigo: "Medium",
  //       view: "Medio"
  //     },
  //     {
  //       codigo: "High",
  //       view: "Alto"
  //     }
  //   ];
   
  //   return jugadorWorkRate[value].view;


  // }

    // return `${jugadorBodyType[value].view}`;

  // }
  // get field.name() {
  //   return this.playerForm.get('longName');
  // };


}



