import { Injectable } from '@angular/core';
import { JugadorField } from './model/jugador-field.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JugadorFieldService {
  apiUrl = 'http://localhost:8080/player/atributos';

  private getFields$?: Observable<JugadorField[]>;
  
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

}
