import { Component } from '@angular/core';
import { JugadorFieldService } from '../jugadorField.service';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadorField } from '../model/jugador-field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
      CommonModule
  ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {
  @Input() atributo = 0;   
  @Input() tipo = '';
  @Input() _length = 0;
  @Input() n_filtro = 0;

  constructor(private jugadorFieldService: JugadorFieldService){}
  
  fields?: JugadorField[]

  subscription = new Subscription();

  ngOnInit(){
    this.subscription.add(this.jugadorFieldService.getFields().subscribe({
      next: res => {
        console.log("Se reciben datos de los atributos.");
        this.fields = res;
      },
      error: error => {
        console.warn("Ha ocurrido un error con código: ", error);
      }
    }    
    ));
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

}
