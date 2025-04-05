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
  // exportar_csv$?: Blob;

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
    // Define el objeto Observer
    console.log('Exportando .CSV...');
    // const observer: Observer<Blob> = {
    //   next: (data: Blob) => {
    //     const url = window.URL.createObjectURL(data);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'data.json';
    //     // document.body.appendChild(a);
    //     a.click();
    //     // document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);
    //   },
    //   error: (error) => {
    //     console.error('Error al exportar:', error);
    //   },
    //   complete: () => {
    //     console.log('Exportación completada'); // Opcional: Manejar la finalización
    //   },
    // };
    // this.httpClient.get(this.apuUrlExportar_csv, { responseType: 'blob' }).subscribe(observer); // Pasa el Observer a subscribe
    // this.httpClient.get(this.apuUrlExportar_csv + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting, { responseType: 'blob' }).subscribe(observer);
    // let url: string;
    // if (strFiltro) {
    //   console.log('con filtro');
    //   url = `${this.apiUrl}/exportar_csv?filtro=${strFiltro}&page=${page}&limit=${limit}`;
    // } else {
    //   console.log('sin filtro');
    //   url = `${this.apiUrl}/exportar_csv?page=${page}&limit=${limit}`;
    // }    
    // if (sorting) {
    //   url = url + `&sorting=${sorting}`;      
    // }
    console.log(sorting);
    const url = `${this.apiUrl}/exportar_csv?${strFiltro}&page=${page}&limit=${limit}&sorting=${sorting}`;
  
    console.log(url);
    // this.exportar_csv$ = this.httpClient.get(url, { responseType: 'blob' });

    return this.httpClient.get(url, { responseType: 'blob' });

  

    // this.httpClient.get(this.apuUrlExportar_csv + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting, { responseType: 'blob' }).subscribe((response: Blob) => {
    //   saveAs(response, 'data.csv');
    // });
    
  }

  // getDataDescargar_csv(page:number, limit:number, strFiltro:string, sorting: string): Observable<any> {
  //   return this.httpClient.get<any>(this.apuUrlExportar_csv + '?' + strFiltro + '&page=' + page + '&limit=' + limit + sorting);
  // }
 
}
