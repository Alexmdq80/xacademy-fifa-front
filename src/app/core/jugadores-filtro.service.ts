import { Injectable } from '@angular/core';
import { JugadorFiltro } from './model/jugador-filtro.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresFiltroService {

  constructor() { }

// en data$ se almacenan los filtros
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
    
// '***EN filtro$ almaceno la  strFiltro para generar la query que enviaré a la API
  private filtroSubject = new BehaviorSubject<string>('');
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

  setFiltros(filtro: JugadorFiltro) {
    const indiceFiltro = this.filtros.findIndex(f => f.id === filtro.id);
    
    this.filtros[indiceFiltro].field = filtro.field;
    this.filtros[indiceFiltro].value = filtro.value;
    this.filtros[indiceFiltro].value_min = filtro.value_min;
    this.filtros[indiceFiltro].value_max = filtro.value_max;
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
    let strFiltro: string = '';
    let n: number = 1;

    // TRANSFORMAR EL ARREGLO DE FILTROS EN UNA CADENA
    for (let filtro of this.filtros) {
      if (n > 1) {
        strFiltro =   strFiltro + '&'
      } 
      strFiltro =   strFiltro + 'filtros[' + n + ']=' + filtro.field + '&';
      if (filtro.value !== '') {
        strFiltro =   strFiltro + 'valores_min[' + n + ']=' + filtro.value + '&';
        strFiltro =   strFiltro + 'valores_max[' + n + ']=0';
      } else {
        strFiltro =   strFiltro + 'valores_min[' + n + ']=' + filtro.value_min + '&';
        strFiltro =   strFiltro + 'valores_max[' + n + ']=' + filtro.value_max;
      }      
      n++;
    }

    // console.log(strFiltro);
    this.filtroSubject.next(strFiltro);
  }

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }


}
