import { ChangeDetectionStrategy, Component, OnDestroy, signal, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ValidationErrors  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { JugadorDatosService } from '../../../../core/jugador-datos.service';
import { MatSliderModule } from '@angular/material/slider';
import { JugadorFieldService } from '../../../../core/jugadorField.service';
import { JugadorField } from '../../../../core/model/jugador-field.model';
import { Subscription, merge } from 'rxjs';
import { JugadorDatos } from '../../../../core/model/jugador-datos.model';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { JugadoresService } from '../../../../core/jugadores.service';
import { Jugador } from '../../../../core/model/jugador.model';  
import { JugadorEtiquetas } from '../../../../core/model/jugador-etiquetas.model';
// import { Campo } from '../../../../core/model/campo.model';
import { Campos } from '../../../../core/model/campos.model';
import { Opciones } from '../../../../core/model/opciones.model';
import { Keys } from '../../../../core/model/keys.model';
import { SignalValues } from '../../../../core/model/signal-values.model';

// interface SignalsValues {
//   [key: string]: WritableSignal<string>; 
// }

// interface Opciones {
//   [key: string]: JugadorDatos[];
// }

// interface Campo {
//   [key: string]: JugadorField;
// };

// interface Campos {
//   [key: string]: Campo;
// }

// interface CampoKeys {
//   [key: string]: string[];
// }

interface Formulario {
  [key: string]: any[];
}

interface Formularios {
  [key: string]: Formulario;
}

interface PlayerForms {
  [key: string]: FormGroup;
}

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

export class AgregarPersonaComponent implements OnInit, OnDestroy {
  @Input() jugadorId_INPUT: number = 0;

  jugadorPositions: JugadorDatos[] = [];
  jugadorWorkRate: JugadorDatos[] = [];
  jugadorBodyType: JugadorDatos[] = [];
  jugadorPlayerTraits: JugadorDatos[] = [];
  jugadorGender: JugadorDatos[] = [];
  jugadorPreferredFoot: JugadorDatos[] = [];
  jugadorEtiquetaGrupo: JugadorEtiquetas[] = [];

  subscriptionField = new Subscription();
  fields: JugadorField[] = [];

  // campos: JugadorField[][] = [ [] ];
  // formulario: any[] = [{}];
  // campoKeys: CampoKeys = {};
  campoKeys: Keys = {};

  campos: Campos = {};
  formularios: Formularios = {};
  playerForms: PlayerForms = {};
  // playerForm: FormGroup[] = [];
  
  // protected readonly value: SignalsValues = { };
  // errorMessage: SignalsValues = { };
  protected readonly value: SignalValues = { };
  errorMessage: SignalValues = { };


  opciones: Opciones = {};
  subscription = new Subscription();
  jugador: Jugador = {   
    "id": 0,
    "fifa_version": '', 
    "fifa_update": "",
    "player_face_url": "",
    "long_name": "",	
    "player_positions": "",
    "club_name": null,	
    "nationality_name": null,
    "overall": 0,
    "potential": 0,
    "value_eur": null,
    "wage_eur": null,
    "age": 0,
    "gender": null,
    "height_cm": null,
    "weight_kg": null,
    "preferred_foot": null,
    "weak_foot": null,
    "skill_moves": null,
    "international_reputation": null,
    "work_rate": null,
    "body_type": null,
    "pace": null,
    "shooting": null,
    "passing": null,
    "dribbling": null,
    "defending": null,
    "physic": null,
    "attacking_crossing": null,
    "attacking_finishing": null,
    "attacking_heading_accuracy": null,
    "attacking_short_passing": null,
    "attacking_volleys": null,
    "skill_dribbling": null,
    "skill_curve": null,
    "skill_fk_accuracy": null,
    "skill_long_passing": null,
    "skill_ball_control": null,
    "movement_acceleration": null,
    "movement_sprint_speed": null,
    "movement_agility": null,
    "movement_reactions": null,
    "movement_balance": null,
    "power_shot_power": null,
    "power_jumping": null,
    "power_stamina": null,
    "power_strength": null,
    "power_long_shots": null,
    "mentality_aggression": null,
    "mentality_interceptions": null,
    "mentality_positioning": null,
    "mentality_vision": null,
    "mentality_penalties": null,
    "mentality_composure": null,
    "defending_marking": null,
    "defending_standing_tackle": null,
    "defending_sliding_tackle": null,
    "goalkeeping_diving": null,
    "goalkeeping_handling": null,
    "goalkeeping_kicking": null,
    "goalkeeping_positioning": null,
    "goalkeeping_reflexes": null,
    "goalkeeping_speed": null,
    "player_traits": null
  };

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
  
    // AGREGA UNA OPCIÓN NULA PARA AQUELLOS ITEMS QUE PUEDEN SER NULOS, O SEA
    // QUE NO SON REQUERIDOS.
    for (const field of this.fields) {
      if (field.esUnico && !field.required) {
        this.opciones[field.name].unshift({
          'codigo': null,
          'view': 'Seleccione una Opción'
        });
      }
    }
    // console.log(this.opciones);
    // *******************
  };


  ngOnInit(): void {

    if (this.jugadorId_INPUT != 0) {
      let datos: any;
      datos = this.jugadoresServicio.getDataxIdSync(this.jugadorId_INPUT);
      this.jugador = datos;
    }


    // for (const field of this.fields) {
    //   let cadena: any;
    //   if (this.jugadorId_INPUT != 0) {
    //     cadena = this.jugador[field.name] ;
    //   } else {
    //     cadena = null;
    //   }
    //   this.jugador[field.name] = cadena;
    // }
          
    for (const field of this.fields) {
      // *** ARMAR MENSAJES DE ERROR / VALIDADORES / Y SINGALS PARA INPUTS**
      // console.log(field.name);
      let cadena: any;
      if (this.jugadorId_INPUT != 0) {
        cadena = this.jugador[field.name] ;
      } else {
        cadena = null;
      }
      this.jugador[field.name] = cadena;

      let valor: any;
      this.errorMessage[field.name] = signal('');     
      // if (field.type === 'string') {
      if (field.esCadena) {
      // este signal es para que muestre luego la cantidad de caracteres
      // mientras está llenando el campo 
        this.value[field.name] = signal('');         
      }
      // Armo el arreglo de validadores....
      let validadores: ValidationErrors[] = [];
      
      if (field.esUrl) {
        validadores.push(Validators.pattern('https?://.+'));
      }
      if (field.required) {
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
      if (field.minVal != -1 || field.maxVal != -1) {
        validadores.push(Validators.min(field.minVal));
        validadores.push(Validators.max(field.maxVal));
      } 

// Cargo el valor desde el objeto Jugador, que ya tiene
// los valores sugeridos, en caso de ser un jugador nuevo,
// o los valores cargados desde la BD en caso de ser una actualización.
      let aux: any;
      let arreglo: string[] = [];
      let valor_rango: number[] = [];
      if (field.esMultiple) {
        if (this.jugador[field.name]) {
          // si es múltiple, tengo que separar la cadena y armar un Array 
          aux = this.jugador[field.name];
          arreglo = aux.split(", ");
          valor = arreglo;
        }
      } else if (field.esRangoCategorias) { 
          valor = null;
          valor_rango[0] = field.minVal;
          valor_rango[1] = field.maxVal;
          if (this.jugador[field.name]) {
            // si es un rango, se supone que debe estar guardado
            // "valor" "/" "valor"
            // así armo un arreglo con los dos valores del rango
            aux = this.jugador[field.name];
            if (aux.includes("/")) {
              arreglo = aux.split("/");
              valor = arreglo;
              valor_rango[0] = this.opciones[field.name].findIndex(o => o.codigo === valor[0]);
              valor_rango[1] = this.opciones[field.name].findIndex(o => o.codigo === valor[1]);
            }
            // console.log(valor_rango);
          }
      } else {
        aux = this.jugador[field.name];
        // SI ES UN CLAVE, COMO EL CASO DEL ID, NO PERMITO 
        // INGRESARLA NI MODIFICARLA, POR ESO DESHABILITO EL CONTROL.
        // PARA ELLO, DEBO PASAR UN OBJETO AL FORMBUILDER EN VEZ DE UN VALOR
        if (field.esKey) {
          valor = {
              value: [aux],
              disabled: true
          }
        } else {
          valor = aux;
        }
      }  
      // en group[0] se encuentra el grupo principal al cual pertenece el campo
      if (!this.campos[field.group[0]]) {
        this.campos[field.group[0]] = {};
      }
      this.campos[field.group[0]][field.name] = field;

      if (!this.formularios[field.group[0]]) {
      //  si no existe el formulario para esa etiqueta, entonces creo el objeto vacío
        this.formularios[field.group[0]] = {};
      }

      this.formularios[field.group[0]][field.name] = [valor, validadores];

      if (field.esRangoCategorias) {
        // si es un rango de categorías, como Work_Rate Low/High por ejemplo,
        // necesito dos controles.
        this.formularios[field.group[0]][field.name + '1'] = [valor_rango[0], validadores];
        this.formularios[field.group[0]][field.name + '2'] = [valor_rango[1], validadores];
      }
      if (!field.required && (field.esRangoCategorias || field.esNumeroPequenio)) {
        // si no un campo requerido, y es un tipo de slider
        // entonces debo crear un checkbox para poder habilitar o deshabilitar
        if (valor === null) {
          valor = false
        } else {
          valor = true
        }
        // console.log(valor);
        this.formularios[field.group[0]][field.name + '_chk'] = [valor];
 
      }
      
    } 
    for (let grupo of this.jugadorEtiquetaGrupo) {
      this.playerForms[grupo.codigo] = this.fb.group(this.formularios[grupo.codigo]);
      this.campoKeys[grupo.codigo] = Object.keys(this.campos[grupo.codigo]);
      this.subscription.add(merge(this.playerForms[grupo.codigo].statusChanges, this.playerForms[grupo.codigo].valueChanges)
      .subscribe(() => this.updateErrorMessage()));
        
      for (let nombre in this.campos[grupo.codigo]) {
        if (!this.campos[grupo.codigo][nombre].required && (this.campos[grupo.codigo][nombre].esRangoCategorias || this.campos[grupo.codigo][nombre].esNumeroPequenio)) {
          // si no un campo requerido, y es un tipo de slider
          // entonces debo hacer suscribir para que al cambiar el valor se
          // realice una acción
          this.subscription.add(this.playerForms[grupo.codigo].get(nombre + '_chk')?.valueChanges.subscribe(checked => {
            if (this.campos[grupo.codigo][nombre].esRangoCategorias){
              if (checked) {
                this.playerForms[grupo.codigo].get(nombre + '1')?.enable();
                this.playerForms[grupo.codigo].get(nombre + '2')?.enable();
              } else {
                this.playerForms[grupo.codigo].get(nombre + '1')?.disable();
                this.playerForms[grupo.codigo].get(nombre + '2')?.disable();
              }
            } else {
              if (checked) {
                this.playerForms[grupo.codigo].get(nombre)?.enable();
              } else {
                this.playerForms[grupo.codigo].get(nombre)?.disable();
              }
            }
          }));
        }            
      }
    }

    // tengo que setear el valor inicial de los checkbox
    for (let grupo of this.jugadorEtiquetaGrupo) {
      for (let nombre in this.campos[grupo.codigo]) {
        if (!this.campos[grupo.codigo][nombre].required && (this.campos[grupo.codigo][nombre].esRangoCategorias || this.campos[grupo.codigo][nombre].esNumeroPequenio)) {
          if (this.campos[grupo.codigo][nombre].esRangoCategorias){
            if (this.jugador[nombre] != null) {
              this.playerForms[grupo.codigo].get(nombre + '1')?.enable();
              this.playerForms[grupo.codigo].get(nombre + '2')?.enable();
            } else {
              this.playerForms[grupo.codigo].get(nombre + '1')?.disable();
              this.playerForms[grupo.codigo].get(nombre + '2')?.disable();
            }
          } else {
            if (this.jugador[nombre] === null) {
              this.playerForms[grupo.codigo].get(nombre)?.disable();
            } else {
              this.playerForms[grupo.codigo].get(nombre)?.enable();
            }
          }
        }            
      }
    }

    this.armaBody_Type();

  }


  
  guardar() {
     for (let grupo of this.jugadorEtiquetaGrupo) {
      for (let campo in this.campos[grupo.codigo] ) {
        let val: any;
        if (this.campos[grupo.codigo][campo].esMultiple) {
          if (this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name)?.value != null) {
            let aux = this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name)?.value;       
            for (let i = 1; i < aux.length; i++) {
              aux[i] = ' ' + aux[i];
            }
            val = aux.toString();
            val = val.length > this.campos[grupo.codigo][campo].type ? val.slice(0, 255): val;
            // console.log(val);
          } else {
            val  =  null;       
          }
      } else if (this.campos[grupo.codigo][campo].esRangoCategorias) {
          if (!this.campos[grupo.codigo][campo].required) {
            if (this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name + '_chk')?.value != true) {
              val = null;
            } else {
              val = 'leer';
            }
          } 
          if (val === 'leer') {
            let cadena1;
            let cadena2;
            cadena1 = this.getValueFromSlider(this.campos[grupo.codigo][campo], this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name + '1')?.value, true);
            cadena2 = this.getValueFromSlider(this.campos[grupo.codigo][campo], this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name + '2')?.value, true);
            val = cadena1 + '/' + cadena2;
          }        
        } else if (this.campos[grupo.codigo][campo].esNumeroPequenio && !this.campos[grupo.codigo][campo].required) {
          if (this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name + '_chk')?.value != true) {
            val = null;
          } else {
            val = this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name)?.value;        
          }
        } else {
          val = this.playerForms[grupo.codigo].get(this.campos[grupo.codigo][campo].name)?.value;        
        }
        if (this.campos[grupo.codigo][campo].esKey && this.jugadorId_INPUT === 0) {
            val = null;
        }
        this.jugador[this.campos[grupo.codigo][campo].name] =  val;       
      }
    } 

    if (this.jugadorId_INPUT === 0){
      // si no hay id, significa que es un alta... crea jugador
      this.jugadoresServicio.postCrearJugador(this.jugador as Jugador).subscribe(res => {
        console.log(res);
      });
      console.log("nuevo");
    } else {
      // si tiene un id, entonces modifica el jugador
      this.jugadoresServicio.putActualizarJugador(this.jugador as Jugador).subscribe(res => {
        console.log(res);
      });   
      console.log("actualizado");
    }
  };

  getValueFromSlider(campo: JugadorField, sliderValue: string, codigo: boolean): string | null {
    const index = Number(sliderValue);
    if (isNaN(index) || !this.opciones[campo.name] || !this.opciones[campo.name][index]) {
      return ''; // Devuelve un string vacío en lugar de 'Valor inválido' para que no se muestre nada
    }
    let valor: string | null;
    if (codigo) {
      valor = this.opciones[campo.name][index].codigo;
    } else {
      valor = this.opciones[campo.name][index].view;
    }
    return valor;
  }
  
  protected onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    for (const field of this.fields) {
      const grupo = field.group[0];
      if (target.id === field.name) {
        if (target.value &&  
            (field.esNumeroMediano || field.esNumeroPequenio || field.esMoneda)
           ) { 
          if (Number(target.value) < field.minVal ) {
            if (field.minVal === 0 || 
                (field.minVal > 0 && (String(target.value).length) > 
                (String(field.minVal).length - 1) )) {
              this.playerForms[grupo].patchValue( { [target.id]: field.minVal });
            }
          } else if (Number(target.value) > field.maxVal ) {
            this.playerForms[grupo].patchValue( { [target.id]: field.maxVal });
          }
        } else if (target.value) {
          this.value[target.id].set(target.value);
          this.playerForms[grupo].patchValue( { [target.id]: target.value });
        } 
        break;
      }
    }  
    if (target.id === "height_cm" || target.id === "body_type"){
      this.armaBody_Type();
    }
 }

 
  armaBody_Type () {
    // ACTUALIZA EL CAMPO BODY-TYPES PARA AGREGARLE, EN CASO DE QUE SEA UN VALOR 
    // VÁLIDO, LA ALTURA (HEIGHT_CM), Y MANTENER LA OPCIÓN (SI ES QUE ESTÁ SELECCIONADA)
    // DE BODY-TYPE MÁS ALLÁ DEL VALOR DE LA ALTURA (HEIGHT_CM) 
    let height: string = '';
    let height_rango: string = '';
    let grupo: string = '';
    let minVal: number = 0;
    let maxVal: number = 0;
    const n = this.opciones['body_type'].length;
    
    if (!this.playerForms) {
      return 'no está definido el formulario';
    } 

    let valor: string;
    let valor_array: string[] = [];

    // BUSCA EL VALOR DEL CAMPO HEIGHT_CM.
    for (let field of this.fields) {
      if (field.name === 'height_cm') {
        if (!this.playerForms[field.group[0]]) {
          return 'no existe el formulario para el grupo de height_cm';
        }
        if (this.playerForms[field.group[0]].contains(field.name)) { 
          const control = this.playerForms[field.group[0]].get('height_cm');
          if (!control) {
            return 'no existe el control height_cm';
          }
          valor = control.value;
          if (valor){
            height = valor.toString();
          } else {
            height = '';
          }
        }
        minVal = field.minVal;
        maxVal = field.maxVal;
        break;
      }
    } 
    for (let field of this.fields) {
      if (field.name === 'body_type') {
        grupo = field.group[0];
        if (!this.playerForms[grupo]) {
          return 'no existe el formulario para el grupo de body_type';
        }
        if (this.playerForms[grupo].contains(field.name)) { 
          const control = this.playerForms[grupo].get('body_type');
          if (!control) {
            return 'no existe el control body_type';
          }
          valor = control.value;
          if (valor){
            if (valor.includes(' (')){
              valor_array = valor.split(' ('); 
            } else {
              valor_array[0] = valor;
            }
          } else {
            valor_array[0] = '';
          }
        }
        break;
      }
    }  
    if (height === '' || Number(height) < minVal && minVal != -1) {
      height_rango = '';
    } else if (Number(height) < 170) {
      height_rango = '(170-)';
    } else if (Number(height) >= 170 && Number(height) <= 185) {
      height_rango = '(170-185)';
    } else if (Number(height) > maxVal && Number(height) != -1)  {
      height_rango = '';
    } else if (Number(height) > 185) {
      height_rango = '(185+)';
    }
    // Arma las opciones *****
    this.opciones['body_type'] = [];

    for (let i = 0; i < n; i++){
      let btc: string | null; 
      let btv: string; 

      if (this.jugadorBodyType[i].codigo === null) {
        btc = this.jugadorBodyType[i].codigo;     
        btv = this.jugadorBodyType[i].view;     
      } else {
        if (height_rango === '') {
          btc = this.jugadorBodyType[i].codigo;     
          btv = this.jugadorBodyType[i].view;     
        } else {
          btc = this.jugadorBodyType[i].codigo + ' ' + height_rango;     
          btv = this.jugadorBodyType[i].view + ' ' + height_rango;     
        }
      }
      this.opciones['body_type'].push();
      this.opciones['body_type'][i] = {
        "codigo": btc,
        "view": btv
      };      
    //  *****  
    //  Selecciona la opción correspondiente con el nuevo valor de height.
      if (valor_array[0] != '') {
        if (grupo != '') {
          let valor_elegido: string = '';
          if (height_rango === '') {
            valor_elegido = valor_array[0];
          } else {
            valor_elegido = valor_array[0] + ' ' + height_rango;
          }
          // console.log('valor elegido');
          // console.log(valor_elegido);
          if (this.playerForms[grupo]) {
            this.playerForms[grupo].patchValue({'body_type': valor_elegido } );
          }
        }
      }
      // *******************
    }
    return 'arma_body existoso';
  }
  
  ngOnDestroy(): void {
    this.subscriptionField.unsubscribe();
    this.subscription.unsubscribe();
  }
 
  trackByCampo(campo: string): number {
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

    for (let grupo of this.jugadorEtiquetaGrupo) {
     for (let nombre in this.campos[grupo.codigo]) {
       if (!this.campos[grupo.codigo][nombre].esRangoCategorias) { 
          // SI ES UN RANGO DE CATEGORÍAS O UN NÚMERO PEQUEÑO, ENTONCES SON SLIDERS, NO ES
          // NECESARIO QUE PASE POR ACÁ.
          // ADEMÁS, EN EL CASO DE LOS RANGOS, EL NOMBRE DEL CONTROL TIENE UN SUFIJO
          // NUMÉRICO 1 Ó 2, Y SINO SE CORRIJE EL NOMBRE, DA ERROR
          if (this.playerForms[grupo.codigo].get(nombre)) { 
            if (this.playerForms[grupo.codigo].get(nombre)?.hasError('required')) {
              this.errorMessage[nombre].set('Debe ingresar ' + this.namesByCampo('viewName', nombre));
            } else if (this.playerForms[grupo.codigo].get(nombre)?.hasError('minlength')) { 
              this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener al menos ' + this.valorByCampo('minLen', nombre) + ' caracteres');
            } else if (this.playerForms[grupo.codigo].get(nombre)?.hasError('maxlength')) {
              this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener menos de ' + this.valorByCampo('maxLen', nombre) + ' caracteres');
            } else if (this.playerForms[grupo.codigo].get(nombre)?.hasError('min')) { 
              this.errorMessage[nombre].set(this.namesByCampo('viewName', nombre) + ' debe tener un mínimo de ' + this.valorByCampo('minVal', nombre));
            } else if (this.playerForms[grupo.codigo].get(nombre)?.hasError('max')) {
              this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' debe tener un máximo de ' + this.valorByCampo('maxVal', nombre));
            } else if (this.playerForms[grupo.codigo].get(nombre)?.hasError('pattern')) {
              this.errorMessage[nombre].set(this.namesByCampo('viewName',nombre) + ' no es válido');
            } else {
              this.errorMessage[nombre].set('Error sin definir en ' + this.namesByCampo('viewName', nombre));
            }
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
 
}



