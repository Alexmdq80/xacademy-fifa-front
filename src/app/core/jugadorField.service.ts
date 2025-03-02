import { Injectable } from '@angular/core';
import { JugadorField } from './model/jugador-field.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs';
import { Campos } from './model/campos.model';
import { Keys } from './model/keys.model'; 
import { KeysObject } from './model/keys-object.model';

@Injectable({
  providedIn: 'root'
})

export class JugadorFieldService {
  apiUrl = 'http://localhost:8080/player/atributos';

  private getFields$?: Observable<JugadorField[]>;
  private campos: Campos = {};
  private getFieldsByGroup$?: Observable<Campos>;
  private keyCampos: Keys = {};
  private keyViewCampos: Keys = {};
  private keyObjectCampos: KeysObject = { };
  private getKeysFieldsByGroup$?: Observable<Keys>;
  private getKeysFieldsViewByGroup$?: Observable<Keys>;
  private getKeysFieldsObjectByGroup$?: Observable<KeysObject>;
  private keyArray: string []  = [];
  private getKeysArray$?: Observable<string[]>;
  
  
  constructor(private httpClient: HttpClient) { }
 
  getFields(): Observable<JugadorField[]> {
    // console.log(this.getFields$);
    if (this.getFields$ === undefined) {
        // console.log('Trae atributos haciendo petición al servidor');
        // this.getFields$ = this.httpClient.get<JugadorField[]>(this.apiUrl).pipe(shareReplay(1));
   
        this.getFields$ = this.httpClient.get<JugadorField[]>(this.apiUrl)
          .pipe(
            map(
             fields => 
                fields.map(field => ({ 
                 ...field, 
                 esCadena: field.contenido.find(c => c === 'cadena')? true:false, 
                 esNombre: field.contenido.find(c => c === 'nombre')? true:false, 
                 esAlfanumerico: field.contenido.find(c => c === 'alfanumérico')? true:false, 
                 esNumeroPequenio: field.contenido.find(c => c === 'número_pequeño')? true:false, 
                 esNumeroMediano: field.contenido.find(c => c === 'número_mediano')? true:false, 
                 esMoneda: field.contenido.find(c => c === 'moneda')? true:false, 
                 esUnico: field.contenido.find(c => c === 'único')? true:false,
                 esMultiple: field.contenido.find(c => c === 'múltiple')? true:false,
                 esRangoCategorias: field.contenido.find(c => c === 'rango_categorías')? true:false,
                 esUrl: field.contenido.find(c => c === 'url')? true:false,
                 esKey: field.group.find(c => c === 'key')? true:false, 
                 esGlobalSkill: field.group.find(c => c === 'habilidad_global')? true:false,
                 esSpecifSkill: field.group.find(c => c === 'habilidad_específica')? true:false,
                 esSkill: field.group.find(c => c === 'skill')? true:false,
                 esPower: field.group.find(c => c === 'power')? true:false,
                 esMovement: field.group.find(c => c === 'movement')? true:false,
                 esAttackSkill: field.group.find(c => c === 'ataque')? true:false,
                 esDefendSkill: field.group.find(c => c === 'defensa')? true:false,
                 esGoalKeepingSkill: field.group.find(c => c === 'arco')? true:false,
                 esMentalitySkill: field.group.find(c => c === 'habilidad_mental')? true:false,
                 esJuego: field.group.find(c => c === 'juego')? true:false,
                 esGeneral: field.group.find(c => c === 'general')? true:false,
                 esPersonal: field.group.find(c => c === 'personal')? true:false
                }))
            ), 
            shareReplay(1)
          );
        }
   
        return this.getFields$;
  }

  getFieldsByGroup(): Observable<Campos> {
    // DEVUELVE LOS CAMPOS (jugadorField) AGRUPADOS POR ETIQUETA
    if (!this.getFieldsByGroup$) { // Comprobar si ya existe el observable
      this.getFieldsByGroup$ = this.getFields().pipe(
        tap(fields => {
          fields.forEach(field => {
            if (!this.campos[field.group[0]]) {
              this.campos[field.group[0]] = {};
            }
            this.campos[field.group[0]][field.name] = field;
          });
        }),
        map(() => this.campos),
        shareReplay(1) // Usar shareReplay aquí
      );
    }
    return this.getFieldsByGroup$;
  }

  getKeysFieldsByGroup(): Observable<Keys> {
    // DEVUELVE LAS NOS NOMBRES DE LOS CAMPOS AGRUPADOS POR ETIQUETAS...
    if (!this.getKeysFieldsByGroup$) { // Comprobar si ya existe el observable
     
      this.getKeysFieldsByGroup$ = this.getFields().pipe(
        tap(fields => {
          fields.forEach(field => {
            if (!this.keyCampos[field.group[0]]) {
              this.keyCampos[field.group[0]] = [];
            }
            this.keyCampos[field.group[0]].push(field.name);
          });
        }),
        map(() => this.keyCampos),
        shareReplay(1) // Usar shareReplay aquí
      );
    }
    return this.getKeysFieldsByGroup$;
  }


  getKeysFieldsViewByGroup(): Observable<Keys> {
    // DEVUELVE LAS NOS NOMBRES DE LOS CAMPOS AGRUPADOS POR ETIQUETAS...
    if (!this.getKeysFieldsViewByGroup$) { // Comprobar si ya existe el observable
     
      this.getKeysFieldsViewByGroup$ = this.getFields().pipe(
        tap(fields => {
          fields.forEach(field => {
            if (!this.keyViewCampos[field.group[0]]) {
              this.keyViewCampos[field.group[0]] = [];
            }
            this.keyViewCampos[field.group[0]].push(field.viewName);
          });
        }),
        map(() => this.keyViewCampos),
        shareReplay(1) // Usar shareReplay aquí
      );
    }
    return this.getKeysFieldsViewByGroup$;
  }

  getKeysFieldsObjectByGroup(): Observable<KeysObject> {
    // DEVUELVE LAS NOS NOMBRES DE LOS CAMPOS AGRUPADOS POR ETIQUETAS...
    if (!this.getKeysFieldsObjectByGroup$) { // Comprobar si ya existe el observable
     
      this.getKeysFieldsObjectByGroup$ = this.getFields().pipe(
        tap(fields => {
          fields.forEach(field => {
            if (!this.keyObjectCampos[field.group[0]]) {
              this.keyObjectCampos[field.group[0]] = [];
            }
            this.keyObjectCampos[field.group[0]].push(
                                                      {
                                                        codigo: field.name,
                                                        view: field.viewName
                                                      }
                                                    );
          });
        }),
        map(() => this.keyObjectCampos),
        shareReplay(1) // Usar shareReplay aquí
      );
    }
    return this.getKeysFieldsObjectByGroup$;
  }
// NECESITO DEVOLVER LOS NOMBRES DE LOS CAMPOS SIN AGRUPAR, PERO ORDENADOS
// DE ACUERDO A LAS ETIQUETAS
  getKeysArray(): Observable<string[]> {
    // DEVUELVE LAS NOS NOMBRES DE LOS CAMPOS AGRUPADOS POR ETIQUETAS...
    if (!this.getKeysArray$) { // Comprobar si ya existe el observable
    // HAY QUE RECORRER EL OBJETO KEYSBYGROUP
      this.getKeysArray$ = this.getKeysFieldsByGroup().pipe(
        tap(fields => {
          for (const clave in fields) {
            fields[clave].forEach(field => {
              this.keyArray.push(field);
            });
          }
        }),
        map(() => this.keyArray),
        shareReplay(1) // Usar shareReplay aquí
      );
    }

    // console.log(this.keyArray);
    return this.getKeysArray$;
  }

 }
  
  