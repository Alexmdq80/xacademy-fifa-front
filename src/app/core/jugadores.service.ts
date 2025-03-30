import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jugador } from './model/jugador.model';
import { LineaTiempo } from './model/linea-tiempo.model';


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  localHost = 'http://localhost:8080';
  apiUrl = this.localHost + '/player';
  
  // jugadores? : Jugador[];

  constructor(private httpClient: HttpClient) { }

  // getDataxId(playerId: number): Observable<Jugador[]> {
  //   return this.httpClient.get<Jugador[]>(this.apiUrl + '/fitrosNew?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');

  // }
  // getDataFiltrada(page:number, limit:number, strFiltro:string): Observable<any> {
  //   // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
  //   // console.log(strFiltro);
  //   return this.httpClient.get<any>(this.apiUrl + '?' + strFiltro + '&page=' + page + '&limit=' + limit);

  // }
  getData(page:number, limit:number, strFiltro:string, sorting: string): Observable<any> {
    // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
    // console.log(strFiltro);
    return this.httpClient.get<any>(this.apiUrl + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting);

  }

  getDataxID(id: number): Observable<Jugador[]> {
    // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
    // console.log(strFiltro);
    return this.httpClient.get<Jugador[]>(this.apiUrl + '/' + id);

  }

  getDataLineaTiempo(long_name: string, atributo: string): Observable<LineaTiempo[]> {
    // return this.httpClient.get<any>(this.apiUrl + '?filtros[1]=id&valores_min[1]=1&valores_max[1]=100&limit=100');
    // console.log(strFiltro);
    const consulta = 'long_name=' + long_name + '&atributo=' + atributo; 
    return this.httpClient.get<LineaTiempo[]>(this.apiUrl + '/linea_tiempo?' + consulta);

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

  exportar() {
    // Define el objeto Observer
    console.log('Exportando...');
    const observer: Observer<Blob> = {
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al exportar:', error);
      },
      complete: () => {
        console.log('Exportación completada'); // Opcional: Manejar la finalización
      },
    };
    this.httpClient.get(this.apiUrl, { responseType: 'blob' }).subscribe(observer); // Pasa el Observer a subscribe

  }
}
