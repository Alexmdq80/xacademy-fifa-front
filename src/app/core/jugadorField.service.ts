import { Injectable } from '@angular/core';
import { JugadorField } from './model/jugador-field.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JugadorFieldService {
  apiUrl = 'http://localhost:8080/player/atributos';

  // fields : JugadorField[] = [];

  constructor(private httpClient: HttpClient) { }

  getFields(): Observable<JugadorField[]> {
    return this.httpClient.get<JugadorField[]>(this.apiUrl);
  }
  
}
