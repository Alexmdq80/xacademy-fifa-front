import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EMPTY, merge} from 'rxjs';
import { JugadorDatosService } from '../../../../core/jugador-datos.service';
import {MatSliderModule} from '@angular/material/slider';
import { JugadorFieldService } from '../../../../core/jugadorField.service';
import { JugadorField } from '../../../../core/model/jugador-field.model';
import { Subscription } from 'rxjs';

interface Valores {
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
  
  protected readonly value: Valores = { long_name: signal(''),
                               nationalityName: signal(''),
                               clubName: signal(''),
                               playerFaceUrl: signal(''),
                               pace: signal(''),
                               passing: signal('')
                             };
                             
  errorMessage = { long_name: signal(''),
                   heighCmage: signal(''),
                   age: signal(''),
                   gender: signal(''),
                   heightCm: signal(''),
                   weightKg: signal(''),
                   nationalityName: signal(''),
                   clubName: signal(''),
                   fifaVersion: signal(''),
                   fifaUpdate: signal(''),
                   playerFaceUrl: signal(''),
                   playerPositions: signal(''),
                   valueEur: signal(''),
                   wageEur: signal(''),
                   potential: signal(''),
                   overall: signal(''),
                   preferredFoot: signal(''),
                   weakFoot: signal(''),
                   skillMoves: signal(''),
                   internationalReputation: signal(''),
                   workRate: signal(''),
                   bodyType: signal(''),
                   pace: signal(''),
                   shooting: signal(''),
                   passing: signal('')
                };

  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    // event.target as HTMLInputElement).value
  

    for (const field of this.fields) {
      if (target.id === field.name) {
        console.log('paso');
        this.value[target.id].set(target.value);
        break;
      }
    }  


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
  }
  
  playerForm: FormGroup;


  constructor(private fb: FormBuilder,
              private jugadorDatosServicio: JugadorDatosService,
              private jugadorFieldService: JugadorFieldService
             ) 
    {
    this.playerForm = this.fb.group({
      long_name: ['', [Validators.required, Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(65)]],
      gender: ['', Validators.required], 
      heightCm: ['', [Validators.required, Validators.min(120), Validators.max(235)]], 
      weightKg: ['', [Validators.required, Validators.min(40), Validators.max(130)]], 
      nationalityName: ['',  [Validators.required, Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
      clubName: ['', [Validators.required, Validators.maxLength(255),Validators.pattern(/^[a-zA-ZçÇà-ÿ'`'\s]+$/)]],
      fifaVersion: ['', [Validators.required, Validators.min(15), Validators.max(23)]], 
      fifaUpdate: ['', [Validators.required, Validators.min(1), Validators.max(99)]], 
      playerFaceUrl: ['', Validators.maxLength(255)],
      playerPositions: ['', [Validators.required]], 
      valueEur: ['', [Validators.required, Validators.min(0), Validators.max(350000000)]], // Validaciones para valor
      wageEur: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]], // Validaciones para salario
      potential: ['', [Validators.required, Validators.min(0), Validators.max(100)]], // Validaciones para potencial
      overall: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      preferredFoot: ['', Validators.required], 
      weakFoot: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      skillMoves: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      internationalReputation: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      workRate: ['', Validators.required], 
      bodyType: ['', Validators.required], 
      pace: ['', [Validators.required, Validators.min(0), Validators.max(100)]], 
      shooting: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      passing: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      dribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defending: ['', Validators.required, Validators.min(0), Validators.max(99)],
      physic: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingCrossing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingFinishing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingHeadingAccuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingShortPassing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      attackingVolleys: ['', Validators.required, Validators.min(0), Validators.max(99)],      
      skillDribbling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillCurve: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillFkAccuracy: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillLongPassing: ['', Validators.required, Validators.min(0), Validators.max(99)],
      skillBallControl: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementAcceleration: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementSprintSpeed: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementAgility: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementReactions: ['', Validators.required, Validators.min(0), Validators.max(99)],
      movementBalance: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerShotPower: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerJumping: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerStamina: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerStrength: ['', Validators.required, Validators.min(0), Validators.max(99)],
      powerLongShots: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityAggression: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityInterceptions: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityPositioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityVision: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityPenalties: ['', Validators.required, Validators.min(0), Validators.max(99)],
      mentalityComposure: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingMarking: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingStandingTackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
      defendingSlidingTackle: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingDiving: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingHandling: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingKicking: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingPositioning: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingReflexes: ['', Validators.required, Validators.min(0), Validators.max(99)],
      goalkeepingSpeed: ['', Validators.required, Validators.min(0), Validators.max(99)],
      playerTraits: [''], 
    });

    merge(this.playerForm.statusChanges, this.playerForm.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

  };

  ngOnInit() {
    this.jugadorPositions = this.jugadorDatosServicio.getJugadorPositions();
    this.jugadorWorkRate = this.jugadorDatosServicio.getJugadorWorkRate();
    this.jugadorBodyType = this.jugadorDatosServicio.getJugadorBodyType();
     
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


  }

  ngOnDestroy(): void {
    this.subscriptionField.unsubscribe();
  }

  // async nameValidator(control: AbstractControl) {
  //   const nameRegex = /^[a-zA-ZçÇà-ÿ'`'\s]+$/;

  //   return nameRegex.test(control.value) ? null : { nameInvalid: { value: control.value } };
  // }
    
  onSubmit() {


  }

  updateErrorMessage() {
    if (this.playerForm.get('long_name')?.hasError('required')) {
      this.errorMessage['long_name'].set('Debe ingresar el nombre y el apellido');
    } else if (this.playerForm.get('long_name')?.hasError('pattern')) {
      this.errorMessage['long_name'].set('No es un nombre válido');
    } else if (this.playerForm.get('long_name')?.hasError('maxlength')) {
      this.errorMessage['long_name'].set('Supera la cantidad de caracteres permitidos');
    } else {
      this.errorMessage['long_name'].set('Error sin definir en Nombre y Apellido');
    }

    if (this.playerForm.get('age')?.hasError('required')) {
      this.errorMessage['age'].set('Ingrese la edad');
    } else if (this.playerForm.get('age')?.hasError('min') || this.playerForm.get('age')?.hasError('max')) {
      this.errorMessage['age'].set('No es una edad válida');
    } else {
      this.errorMessage['age'].set('Error sin definir en Edad');
    }

    if (this.playerForm.get('gender')?.hasError('required')) {
      this.errorMessage['gender'].set('Seleccione un Sexo');
    } else {
      this.errorMessage['gender'].set('Error sin definir en Sexo');
    }

    if (this.playerForm.get('heightCm')?.hasError('required')) {
      this.errorMessage['heightCm'].set('Ingrese la altura');
    } else if (this.playerForm.get('heightCm')?.hasError('min') || this.playerForm.get('heightCm')?.hasError('max')) {
      this.errorMessage['heightCm'].set('No es una altura válida');
    } else {
      this.errorMessage['heightCm'].set('Error sin definir en Altura');
    }

    if (this.playerForm.get('weightKg')?.hasError('required')) {
      this.errorMessage['weightKg'].set('Ingrese el peso');
    } else if (this.playerForm.get('weightKg')?.hasError('min') || this.playerForm.get('weightKg')?.hasError('max')) {
      this.errorMessage['weightKg'].set('No es un peso válido');
    } else {
      this.errorMessage['weightKg'].set('Error sin definir en Peso');
    }

    if (this.playerForm.get('nationalityName')?.hasError('required')) {
      this.errorMessage['nationalityName'].set('Debe ingresar la nacionalidad');
    } else if (this.playerForm.get('nationalityName')?.hasError('pattern')) {
      this.errorMessage['nationalityName'].set('No es una nacionalidad válida');
    } else if (this.playerForm.get('nationalityName')?.hasError('maxlength')) {
      this.errorMessage['nationalityName'].set('Supera la cantidad de caracteres permitidos');
    } else {
      this.errorMessage['nationalityName'].set('Error sin definir en Nacionalidad');
    }

    if (this.playerForm.get('clubName')?.hasError('required')) {
      this.errorMessage['clubName'].set('Debe ingresar un club');
    } else if (this.playerForm.get('clubName')?.hasError('pattern')) {
      this.errorMessage['clubName'].set('No es un club válido');
    } else if (this.playerForm.get('clubName')?.hasError('maxlength')) {
      this.errorMessage['clubName'].set('Supera la cantidad de caracteres permitidos');
    } else {
      this.errorMessage['clubName'].set('Error sin definir en Club');
    }

    if (this.playerForm.get('fifaVersion')?.hasError('required')) {
      this.errorMessage['fifaVersion'].set('Ingrese la versión de FIFA');
    } else if (this.playerForm.get('fifaVersion')?.hasError('min') || this.playerForm.get('fifaVersion')?.hasError('max')) {
      this.errorMessage['fifaVersion'].set('No es una versión de FIFA válida');
    } else {
      this.errorMessage['fifaVersion'].set('Error sin definir en fifaVersion');
    }

    if (this.playerForm.get('fifaUpdate')?.hasError('required')) {
      this.errorMessage['fifaUpdate'].set('Ingrese la update de FIFA');
    } else if (this.playerForm.get('fifaUpdate')?.hasError('min') || this.playerForm.get('fifaUpdate')?.hasError('max')) {
      this.errorMessage['fifaUpdate'].set('No es una update de FIFA válida');
    } else {
      this.errorMessage['fifaUpdate'].set('Error sin definir en fifaUpdate');
    }

    if (this.playerForm.get('playerFaceUrl')?.hasError('required')) {
      this.errorMessage['playerFaceUrl'].set('Debe ingresar la URL de la foto');
    } else if (this.playerForm.get('playerFaceUrl')?.hasError('maxlength')) {
      this.errorMessage['playerFaceUrl'].set('Supera la cantidad de caracteres permitidos');
    } else {
      this.errorMessage['playerFaceUrl'].set('Error sin definir en playerFaceUrl');
    }

    if (this.playerForm.get('playerPositions')?.hasError('required')) {
      this.errorMessage['playerPositions'].set('Seleccione una Posición');
    } else {
      this.errorMessage['playerPositions'].set('Error sin definir en Posición');
    }
    
    if (this.playerForm.get('valueEur')?.hasError('required')) {
      this.errorMessage['valueEur'].set('Ingrese el valor en Euros');
    } else if (this.playerForm.get('valueEur')?.hasError('min') || this.playerForm.get('valueEur')?.hasError('max')) {
      this.errorMessage['valueEur'].set('No es un valor en Euros válido');
    } else {
      this.errorMessage['valueEur'].set('Error sin definir en Valor en Euros');
    }
    if (this.playerForm.get('wageEur')?.hasError('required')) {
      this.errorMessage['wageEur'].set('Ingrese el salario en Euros');
    } else if (this.playerForm.get('wageEur')?.hasError('min') || this.playerForm.get('wageEur')?.hasError('max')) {
      this.errorMessage['wageEur'].set('No es un salario en Euros válido');
    } else {
      this.errorMessage['wageEur'].set('Error sin definir en Valor en Salario');
    }
    if (this.playerForm.get('potential')?.hasError('required')) {
      this.errorMessage['potential'].set('Ingrese el Potencial');
    } else if (this.playerForm.get('potential')?.hasError('min') || this.playerForm.get('potential')?.hasError('max')) {
      this.errorMessage['potential'].set('No es un Potencial válido');
    } else {
      this.errorMessage['potential'].set('Error sin definir en Potencial');
    }
    if (this.playerForm.get('overall')?.hasError('required')) {
      this.errorMessage['overall'].set('Ingrese la Puntación General');
    } else if (this.playerForm.get('overall')?.hasError('min') || this.playerForm.get('overall')?.hasError('max')) {
      this.errorMessage['overall'].set('No es una Puntuación General válida');
    } else {
      this.errorMessage['overall'].set('Error sin definir en Puntuación General');
    }
    if (this.playerForm.get('preferredFoot')?.hasError('required')) {
      this.errorMessage['preferredFoot'].set('Seleccione un Pie Preferido');
    } else {
      this.errorMessage['preferredFoot'].set('Error sin definir en Pie Preferido');
    }
    if (this.playerForm.get('weakFoot')?.hasError('required')) {
      this.errorMessage['weakFoot'].set('Seleccione una Debilidad de Pie');
    } else {
      this.errorMessage['weakFoot'].set('Error sin definir en Debilidad de Pie');
    }
    if (this.playerForm.get('skillMoves')?.hasError('required')) {
      this.errorMessage['skillMoves'].set('Seleccione las Habilidades Especiales');
    } else {
      this.errorMessage['skillMoves'].set('Error sin definir en Habilidades Especiales');
    }    
    if (this.playerForm.get('internationalReputation')?.hasError('required')) {
      this.errorMessage['internationalReputation'].set('Seleccione la Reputación Internacional');
    } else {
      this.errorMessage['internationalReputation'].set('Error sin definir en Reputación Internacional');
    }
    if (this.playerForm.get('workRate')?.hasError('required')) {
      this.errorMessage['workRate'].set('Seleccione el Ritmo de Trabajo');
    } else {
      this.errorMessage['workRate'].set('Error sin definir en Ritmo de Trabajo');
    }
    if (this.playerForm.get('bodyType')?.hasError('required')) {
      this.errorMessage['bodyType'].set('Seleccione el Tipo de Cuerpo');
    } else {
      this.errorMessage['bodyType'].set('Error sin definir en Tipo de Cuerpo');
    }
    if (this.playerForm.get('pace')?.hasError('required')) {
      this.errorMessage['pace'].set('Ingrese la Velocidad');
    } else if (this.playerForm.get('pace')?.hasError('min') || this.playerForm.get('pace')?.hasError('max')) {
      this.errorMessage['pace'].set('No es una Velocidad válida');
    } else {
      this.errorMessage['pace'].set('Error sin definir en Velocidad');
    }
    if (this.playerForm.get('shooting')?.hasError('required')) {
      this.errorMessage['shooting'].set('Ingrese el Disparo');
    } else if (this.playerForm.get('shooting')?.hasError('min') || this.playerForm.get('shooting')?.hasError('max')) {
      this.errorMessage['shooting'].set('No es un Disparo válido');
    } else {
      this.errorMessage['shooting'].set('Error sin definir en Disparo');
    }
    
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
  // get nombre() {
  //   return this.playerForm.get('longName');
  // };


}


