import { Injectable } from '@angular/core';
import { JugadorField } from './model/jugador-field.model';
import { Observable } from 'rxjs';
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
    console.log(this.getFields$);
    if (this.getFields$ === undefined) {
        // console.log('Trae atributos haciendo petición al servidor');
        this.getFields$ = this.httpClient.get<JugadorField[]>(this.apiUrl).pipe(shareReplay(1));
    // } else {
    //   console.log('Trae atributos SIN HACER petición al servidor');

    }
    return this.getFields$;
  }

}
