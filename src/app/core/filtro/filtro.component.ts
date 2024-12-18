import { Component } from '@angular/core';
import { JugadorFieldService } from '../jugadorField.service';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { JugadorField } from '../model/jugador-field.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
   ],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {
  // @Input() atributo = 0;   
  // @Input() tipo = '';
  // @Input() _length = 0;
  @Input() n_filtro = 0;

  constructor(private jugadorFieldService: JugadorFieldService){}
  
  fields?: JugadorField[];
  
  subscription = new Subscription();
 
  isEnabled = new FormControl(false);
  inputString = false;
  inputNumber = false;
  selectedOption: JugadorField = { atributo: '',
                                   tipo: {
                                    options: {},
                                    _length: 0
                                   }
  };
 
  onOptionSelected(opcion: JugadorField) {
//  Según la opción del "Select", mostrará para llenar un 
// "Input" para texto (nombre, por ejemplo), o
//  un rango numérico (mínimo y máximo)...
    this.selectedOption = opcion;
    
    console.log('Opción seleccionada:', this.selectedOption);

    if (!this.selectedOption.atributo) {
      this.inputString = false
      this.inputNumber = false
    } else {
      switch (this.selectedOption.atributo) {
        case 'Seleccione un Filtro':
          this.inputString = false
          this.inputNumber = false
          break;

        default:
          if (this.selectedOption.tipo._length == 255) {
            // console.log('cadena');
            this.inputNumber = false
            this.inputString = true
          } else {
            // console.log('numero');
            this.inputNumber = true
            this.inputString = false
          } 
          break;
      }
    }

  }

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
