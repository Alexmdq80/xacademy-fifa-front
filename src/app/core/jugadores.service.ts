import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jugador } from './model/jugador.model';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  apiUrl = 'http://localhost:8080/player';

  // jugadores? : Jugador[];

  constructor(private httpClient: HttpClient) { }

  // getDataxId(playerId: number): Observable<Jugador[]> {
  //   return this.httpClient.get<Jugador[]>(this.apiUrl + '/fitrosNew?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');

  // }
  getDataFiltrada(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');

  }


}
