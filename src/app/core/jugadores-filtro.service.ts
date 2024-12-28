import { Injectable } from '@angular/core';
import { JugadorFiltro } from './model/jugador-filtro.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresFiltroService {

  constructor() { }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
    
  private filtroSubject = new BehaviorSubject<any>(null);
  filtro$ = this.filtroSubject.asObservable();
  // private contadorSubject = new BehaviorSubject<number>(0);
  // contador$ = this.contadorSubject.asObservable();
  // contador$ = this.contadorSubject;
  // contador$ = 0;
  private contador$ = new BehaviorSubject<number>(0);

  private filtros: JugadorFiltro[] = [];

  incrementar() {
    this.contador$.next(this.contador$.value + 1);
    // this.contadorSubject.next(this.contadorSubject.value + 1);
    // this.contador$ =+ 1;
  }

  getFiltros() {
    return this.filtros;
  }

  addFiltro() {
    this.incrementar();
    let filtro: JugadorFiltro = {
      // id: this.contadorSubject.value,
      id: this.contador$.value,
      field: '',
      value: '',
      value_min: 0,
      value_max: 0,
    };

    this.filtros.push(filtro);
    // console.log(this.filtros);
    this.updateData(this.filtros);
  }

  removeFiltro(id: number) {

    const arrayNuevo = this.filtros.filter(filtro => filtro.id !== id);
    this.filtros = arrayNuevo;
    // console.log(this.filtros);

    this.updateData(this.filtros);
  }

  aplicarFiltro() {

    this.filtroSubject.next(this.filtros);
  }

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }


}
