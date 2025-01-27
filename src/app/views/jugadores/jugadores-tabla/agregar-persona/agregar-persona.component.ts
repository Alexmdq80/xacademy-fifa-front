import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
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

interface SignalsValues {
  [key: string]: WritableSignal<string>; 
}

interface Opciones {
  [key: string]: JugadorDatos[];
}

// interface ErrorMessage {
//   [key: string]: WritableSignal<string>; 
// }

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
  jugadorPositions?: JugadorDatos[];
  jugadorWorkRate?: JugadorDatos[];
  jugadorBodyType?: JugadorDatos[];
  jugadorPlayerTraits?: JugadorDatos[];
  jugadorGender?: JugadorDatos[];
  jugadorPreferredFoot?: JugadorDatos[];

  subscriptionField = new Subscription();
  fields: JugadorField[] = [];
  campos: any[][] = [ [{}] ];
  formulario: any[] = [ {} ];
  protected readonly value: SignalsValues = { };
  errorMessage: SignalsValues = { };
  playerForm: FormGroup[] = [];
  opciones: Opciones = {};
  // opciones: any;

 
  constructor(private fb: FormBuilder,
              private jugadorDatosServicio: JugadorDatosService,
              private jugadorFieldServicio: JugadorFieldService,
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
    let i = 0;
    let n = 0;
    let z = 0;
    this.campos.push();
    this.campos[1] = [{}];
    this.campos[2] = [{}];    
    
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
      if (field.esGeneral || field.esJuego){
        this.formulario[0][field.name] = ['', validadores]
        this.campos[1][n] = field;
        n += 1;
      }
      // if (field.esSkill){
      //   this.formulario[0][field.name] = ['', validadores]
      //   this.campos[2][z] = field;
      //   z += 1;
      // } 
      // console.log(this.formulario);
      
    }  
    // console.log(this.formulario[0]);
    console.log(this.campos[0]);    
    console.log(this.campos[1]);
    console.log(this.campos[2]);

    this.playerForm[0] = this.fb.group(this.formulario[0]);
       
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
    this.jugadorPlayerTraits = this.jugadorDatosServicio.getJugadorPlayerTraits();
    this.jugadorGender = this.jugadorDatosServicio.getJugadorGender();
    this.jugadorPreferredFoot = this.jugadorDatosServicio.getJugadorPreferredFoot();
    // this.opciones = [{}];
    this.opciones['player_positions'] = this.jugadorPositions;
    this.opciones['work_rate'] = this.jugadorWorkRate;
    this.opciones['body_type'] = this.jugadorBodyType;
    this.opciones['player_traits'] = this.jugadorPlayerTraits;     
    this.opciones['gender'] = this.jugadorGender;
    this.opciones['preferred_foot'] = this.jugadorPreferredFoot;
  }
 
  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    // event.target as HTMLInputElement).value
    // console.log(this.fields);
    for (const field of this.fields) {
      if (target.id === field.name) {
        // if (field.type === 'integer' && target.value) {
        if (target.value &&  
            (field.esNumero_mediano || field.esNumero_pequenio || field.esMoneda)
           ) { 
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



