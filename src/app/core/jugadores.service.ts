import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jugador } from './model/jugador.model';
import { LineaTiempo } from './model/linea-tiempo.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  localHost = 'http://localhost:8080';
  apiUrl = this.localHost + '/player';

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
    console.log(this.apiUrl + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting);
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

  exportar_csv(page:number, limit:number, strFiltro:string, sorting: string) {
    console.log('Exportando .CSV...');
    const url = `${this.apiUrl}/exportar_csv?${strFiltro}&page=${page}&limit=${limit}&sorting=${sorting}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  exportar_xlsx(page:number, limit:number, strFiltro:string, sorting: string) {
    console.log('Exportando .XLSX...');
    const url = `${this.apiUrl}/exportar_xlsx?${strFiltro}&page=${page}&limit=${limit}&sorting=${sorting}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  // getDataDescargar_csv(page:number, limit:number, strFiltro:string, sorting: string): Observable<any> {
  //   return this.httpClient.get<any>(this.apuUrlExportar_csv + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting);
  // }
 
}
