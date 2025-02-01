import { ChangeDetectionStrategy, Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { JugadorDatosService } from '../../../../core/jugador-datos.service';
import { MatSliderModule } from '@angular/material/slider';
import { JugadorFieldService } from '../../../../core/jugadorField.service';
import { JugadorField } from '../../../../core/model/jugador-field.model';
import { Subscription, merge } from 'rxjs';
import { JugadorDatos } from '../../../../core/model/jugador-datos.model';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { JugadoresService } from '../../../../core/jugadores.service';
import { Jugador } from '../../../../core/model/jugador.model';  

interface SignalsValues {
  [key: string]: WritableSignal<string>; 
}

interface Opciones {
  [key: string]: JugadorDatos[];
}

// interface Etiquetas {
//   [key: string]: string; 
// }

@Component({
  selector: 'app-agregar-persona',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.scss'
})

export class AgregarPersonaComponent implements OnDestroy {
  jugadorPositions: JugadorDatos[];
  jugadorWorkRate: JugadorDatos[];
  jugadorBodyType: JugadorDatos[];
  jugadorPlayerTraits: JugadorDatos[];
  jugadorGender: JugadorDatos[];
  jugadorPreferredFoot: JugadorDatos[];
  jugadorEtiquetaGrupo: JugadorDatos[];

  subscriptionField = new Subscription();
  fields: JugadorField[] = [];
  campos: JugadorField[][] = [ [] ];
  formulario: any[] = [{}];
  protected readonly value: SignalsValues = { };
  errorMessage: SignalsValues = { };
  playerForm: FormGroup[] = [];
  opciones: Opciones = {};

  constructor(private fb: FormBuilder,
              private jugadorDatosServicio: JugadorDatosService,
              private jugadorFieldServicio: JugadorFieldService,
              private jugadoresServicio: JugadoresService
             ) 
    {

    this.subscriptionField.add(this.jugadorFieldServicio.getFields().subscribe({
        next: res => {
          console.log("Se reciben datos de los atributos.");
          this.fields = res;
        },
        error: error => {
          console.warn("Ha ocurrido un error con código: ", error);
        }
      }    
    ));
    let n = [0,0,0,0,0,0,0];
 
    this.campos.push();
    this.campos[1] = [];
    this.campos[2] = [];    
    this.campos[3] = [];  
    this.campos[4] = [];
    this.campos[5] = [];    
    this.campos[6] = [];  
    this.formulario.push();  
    this.formulario[1] = [];
    this.formulario[2] = [];
    this.formulario[3] = [];
    this.formulario[4] = [];
    this.formulario[5] = [];
    this.formulario[6] = [];
    
    for (const field of this.fields) {
      // *** ARMAR MENSAJES DE ERROR / VALIDADORES / Y SINGALS PARA INPUTS**
      // console.log(field.name);
      
      this.errorMessage[field.name] = signal('');     
      // if (field.type === 'string') {
      if (field.esCadena) {
        this.value[field.name] = signal('');         
      }
      // *****************
      let validadores: ValidationErrors[] = [];
      
      if (field.esUrl) {
        validadores.push(Validators.pattern('https?://.+'));
      }
      if (field.required && !field.esNumeroPequenio && !field.esRangoCategorias) {
         validadores.push(Validators.required);
      }
      if (field.esNombre) {
        validadores.push(Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/));
      }
      if (field.esAlfanumerico) {
        validadores.push(Validators.pattern(/^[0-9a-zA-ZçÇà-ÿ'`'\s]+$/));
      }
      if (field.minLen != -1 || field.maxLen != -1) {
        validadores.push(Validators.minLength(field.minLen));
        validadores.push(Validators.maxLength(field.maxLen));
      } 
      // if ((field.minVal != -1 || field.maxVal != -1) && !field.esRangoCategorias) {
      if (field.minVal != -1 || field.maxVal != -1) {
        validadores.push(Validators.min(field.minVal));
        validadores.push(Validators.max(field.maxVal));
      } 
      if (field.esPersonal){
        let z = 0;
        this.formulario[z][field.name] = [field.sugerencia, validadores];
        this.campos[z][n[z]] = field;
        n[z] += 1;
      } 
      if (field.esGeneral) {
        let z = 1;
        this.formulario[z][field.name] = [field.sugerencia, validadores]
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }
      if (field.esGlobalSkill ){
        let z = 2;
        if (field.esRangoCategorias) {
           this.formulario[z][field.name + '1'] = [field.minVal, validadores];
           this.formulario[z][field.name + '2'] = [field.maxVal, validadores];
         } else {
          this.formulario[z][field.name] = [field.sugerencia, validadores];
        }
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }
      if (field.esMentalitySkill){
        let z = 3;
        this.formulario[z][field.name] = [field.sugerencia, validadores]
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }
      if (field.esGoalKeepingSkill){
        let z = 4;
        this.formulario[z][field.name] = [field.sugerencia, validadores]
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }     
      if (field.esDefendSkill){
        let z = 5;
        this.formulario[z][field.name] = [field.sugerencia, validadores]
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }   
      if (field.esAttackSkill ){
        let z = 6;
        this.formulario[z][field.name] = [field.sugerencia, validadores]
        this.campos[z][n[z]] = field;
        n[z] += 1;
      }
  
         
    }  
    // console.log(this.formulario[2]);
    // console.log(this.campos);    
    // console.log(this.campos[1]);
    // console.log(this.campos[2]);

    this.playerForm[0] = this.fb.group(this.formulario[0]);
    this.playerForm[1] = this.fb.group(this.formulario[1]);
    this.playerForm[2] = this.fb.group(this.formulario[2]);
    this.playerForm[3] = this.fb.group(this.formulario[3]);    
    this.playerForm[4] = this.fb.group(this.formulario[4]);  
    this.playerForm[5] = this.fb.group(this.formulario[5]);
    this.playerForm[6] = this.fb.group(this.formulario[6]);

    
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

    merge(this.playerForm[1].statusChanges, this.playerForm[1].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.playerForm[2].statusChanges, this.playerForm[2].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.playerForm[3].statusChanges, this.playerForm[3].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.playerForm[4].statusChanges, this.playerForm[4].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.playerForm[5].statusChanges, this.playerForm[5].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    merge(this.playerForm[6].statusChanges, this.playerForm[6].valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());


    this.jugadorPositions = this.jugadorDatosServicio.getJugadorPositions();
    this.jugadorWorkRate = this.jugadorDatosServicio.getJugadorWorkRate();
    this.jugadorBodyType = this.jugadorDatosServicio.getJugadorBodyType();
    this.jugadorPlayerTraits = this.jugadorDatosServicio.getJugadorPlayerTraits();
    this.jugadorGender = this.jugadorDatosServicio.getJugadorGender();
    this.jugadorPreferredFoot = this.jugadorDatosServicio.getJugadorPreferredFoot();
    this.jugadorEtiquetaGrupo = this.jugadorDatosServicio.getEtiquetaGrupo();

    this.opciones['player_positions'] = this.jugadorPositions;
    this.opciones['work_rate'] = this.jugadorWorkRate;
    this.opciones['body_type'] = this.jugadorBodyType;
    this.opciones['player_traits'] = this.jugadorPlayerTraits;     
    this.opciones['gender'] = this.jugadorGender;
    this.opciones['preferred_foot'] = this.jugadorPreferredFoot;
  };


  CrearJugador() {
    let newPlayer: Jugador = {   
      "id": 0,
      "fifa_version": '', 
	    "fifa_update": "",
      "player_face_url": "",
    	"long_name": "",	
      "player_positions": "",
      "club_name": "",	
      "nationality_name": "",
      "overall": 0,
      "potential": 0,
      "value_eur": 0,
      "wage_eur": 0,
      "age": 0,
      "gender": "",
      "height_cm": 0,
      "weight_kg": 0,
      "preferred_foot": "",
      "weak_foot": 0,
      "skill_moves": 0,
      "international_reputation": 0,
      "work_rate": "",
      "body_type": "",
      "pace": 0,
      "shooting": 0,
      "passing": 0,
      "dribbling": 0,
      "defending": 0,
      "physic": 0,
      "attacking_crossing": 0,
      "attacking_finishing": 0,
      "attacking_heading_accuracy": 0,
      "attacking_short_passing": 0,
      "attacking_volleys": 0,
      "skill_dribbling": 0,
      "skill_curve": 0,
      "skill_fk_accuracy": 0,
      "skill_long_passing": 0,
      "skill_ball_control": 0,
      "movement_acceleration": 0,
      "movement_sprint_speed": 0,
      "movement_agility": 0,
      "movement_reactions": 0,
      "movement_balance": 0,
      "power_shot_power": 0,
      "power_jumping": 0,
      "power_stamina": 0,
      "power_strength": 0,
      "power_long_shots": 0,
      "mentality_aggression": 0,
      "mentality_interceptions": 0,
      "mentality_positioning": 0,
      "mentality_vision": 0,
      "mentality_penalties": 0,
      "mentality_composure": 0,
      "defending_marking": 0,
      "defending_standing_tackle": 0,
      "defending_sliding_tackle": 0,
      "goalkeeping_diving": 0,
      "goalkeeping_handling": 0,
      "goalkeeping_kicking": 0,
      "goalkeeping_positioning": 0,
      "goalkeeping_reflexes": 0,
      "goalkeeping_speed": 0,
      "player_traits": ""
    };
 
    for (let i = 0; i < this.campos.length; i++) {
      for (let campo of this.campos[i] ) {
        if (campo.esMultiple){
          newPlayer[campo.name] =  this.playerForm[i].get(campo.name)?.value.toString();       
        } else if (campo.esRangoCategorias) {
          let cadena1;
          let cadena2;
          cadena1 = this.getValueFromSlider(campo, this.playerForm[i].get(campo.name + '1')?.value);
          cadena2 = this.getValueFromSlider(campo, this.playerForm[i].get(campo.name + '2')?.value);
          newPlayer[campo.name] = cadena1 + '/' + cadena2;     
          
   
        } else if (campo.esNumeroMediano || campo.esNumeroPequenio) {
          newPlayer[campo.name] =  Number(this.playerForm[i].get(campo.name)?.value);       
        } else {
          newPlayer[campo.name] =  this.playerForm[i].get(campo.name)?.value ;       
        }
      }
    } 

    console.log(newPlayer);

    this.jugadoresServicio.postDataFiltrada(newPlayer as Jugador).subscribe(res => {
      console.log(res);
    });
  }

  getValueFromSlider(campo: JugadorField, sliderValue: string): string {
    const index = Number(sliderValue);
    if (isNaN(index) || !this.opciones[campo.name] || !this.opciones[campo.name][index]) {
      return ''; // Devuelve un string vacío en lugar de 'Valor inválido' para que no se muestre nada
    }
    return this.opciones[campo.name][index].view;
  }
  
  protected onInput(event: Event, i: number) {
    const target = event.target as HTMLInputElement;

    // event.target as HTMLInputElement).value
    // console.log(this.fields);
    for (const field of this.fields) {
      if (target.id === field.name) {
        // if (field.type === 'integer' && target.value) {
        if (target.value &&  
            (field.esNumeroMediano || field.esNumeroPequenio || field.esMoneda)
           ) { 
          if (Number(target.value) < field.minVal ) {
            // this.value[target.id].set(String(field.minVal));
            // target.value = String(field.minVal);
            if (field.minVal === 0 || 
                (field.minVal > 0 && (String(target.value).length) > 
                (String(field.minVal).length - 1) )) {
              this.playerForm[i].patchValue( { [target.id]: field.minVal });
            }
          } else if (Number(target.value) > field.maxVal ) {
            // this.value[target.id].set(String(field.maxVal));
            // target.value = String(field.maxVal);
            this.playerForm[i].patchValue( { [target.id]: field.maxVal });
         }
        } else if (target.value) {
          this.value[target.id].set(target.value);
          this.playerForm[i].value[target.id] = target.value;
        } 
        break;
      }
    }  

    // this.playerFormAnterior = this.playerForm[0].value;
    // this.updateErrorMessage(target.id);
  }

  // protected onBlur(event: Event) {
  //   const target = event.target as HTMLInputElement;


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
      // console.log(this.campos[i]);
      for (let campo of this.campos[i] ) {
        let nombre = campo.name;
        if (this.playerForm[i].get(nombre)) { 
          if (this.playerForm[i].get(nombre)?.hasError('required')) {
            this.errorMessage[nombre].set('Debe ingresar ' + this.namesByCampo('viewName', nombre));
          } else if (this.playerForm[i].get(nombre)?.hasError('minlength')) { 
            this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener al menos ' + this.valorByCampo('minLen', nombre) + ' caracteres');
          } else if (this.playerForm[i].get(nombre)?.hasError('maxlength')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener menos de ' + this.valorByCampo('maxLen', nombre) + ' caracteres');
          } else if (this.playerForm[i].get(nombre)?.hasError('min')) { 
            this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener un mínimo de ' + this.valorByCampo('minVal', nombre));
          } else if (this.playerForm[i].get(nombre)?.hasError('max')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener un máximo de ' + this.valorByCampo('maxVal', nombre));
          } else if (this.playerForm[i].get(nombre)?.hasError('pattern')) {
            this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' no es válido');
          } else {
            this.errorMessage[nombre].set('Error sin definir en ' + this.namesByCampo('viewName', nombre));
          }
        }
      }
    }
      // for (let campo of this.campos[2] ) {
      //   let nombre = campo.name;  
      //   if (this.playerForm[2].get(nombre)?.hasError) {
      //     console.log(nombre);
      //     console.log(this.playerForm[2].get(nombre)?.errors);
      //   }
      // }
  } 
 
  
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



