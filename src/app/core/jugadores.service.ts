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
  getDataFiltrada(page:number, limit:number, strFiltro:string): Observable<any> {
    // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
    // console.log(strFiltro);
    return this.httpClient.get<any>(this.apiUrl + '?' + strFiltro + '&page=' + page + '&limit=' + limit);

  }
  getDataxID(id: number): Observable<Jugador[]> {
    // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
    // console.log(strFiltro);
    return this.httpClient.get<Jugador[]>(this.apiUrl + '/' + id);

  }

  postCrearJugador(newPlayer: Jugador): Observable<{ message: string }> {
    console.log(newPlayer);
    return this.httpClient.post<{ message: string }>(this.apiUrl, {"newPlayer": newPlayer});
    
  }

  putActualizarJugador(playerToUpdate: Jugador): Observable<{ message: string }> {
    console.log(playerToUpdate);
    return this.httpClient.put<{ message: string }>(this.apiUrl + '/' + playerToUpdate.id, {"playerToUpdate": playerToUpdate});
    
  }
  
  getDataxIdSync(id: number) {
    let data: any;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.apiUrl + '/' + id, false); // El tercer argumento 'false' indica que la petición es síncrona
    xhr.onload = () => {
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        console.log('Respuesta recibida:', data[0]);
        return data;
      } else {
        console.error('Error en la petición:', xhr.status);
        return '';
      }
    };
    xhr.onerror = () => {
      console.error('Error en la petición');
      return '';
    };
    xhr.send();

    return data[0];
  
  }
  
}
