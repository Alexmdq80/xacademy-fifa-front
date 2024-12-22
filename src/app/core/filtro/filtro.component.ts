import { Component, EventEmitter, Output } from '@angular/core';
// import { JugadorFieldService } from '../jugadorField.service';
import { Input } from '@angular/core';
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
// export class FiltroComponent implements OnInit, OnDestroy {
export class FiltroComponent {

  // @Input() atributo = 0;   
  // @Input() tipo = '';
  // @Input() _length = 0;
  @Input() n_filtro = 0;
  @Output() valorNumero = new EventEmitter<any>();

  
  @Input() fields: JugadorField[] = [];
  
  // subscription = new Subscription();
 
  isEnabled = new FormControl(false);
  inputString = false;
  inputNumber = false;
  selectedOption: JugadorField = { 
    name: '',
    type: '',
    viewName: ''
  };

  devolverNumero(event: any) {
    const valor = Number(event.target.value); // Convertimos el valor a número
    if (!isNaN(valor)) {
      this.valorNumero.emit(valor);
    } else {
      // Manejar el caso en que el valor no sea un número
      console.error('El valor ingresado no es un número válido');
    }
    this.valorNumero.emit(valor);
    // console.log(valor);
  }

  onOptionSelected(opcion: JugadorField) {
//  Según la opción del "Select", mostrará para llenar un 
// "Input" para texto (nombre, por ejemplo), o
//  un rango numérico (mínimo y máximo)...
    this.selectedOption = opcion;
    
    console.log('Opción seleccionada:', this.selectedOption);

    if (!this.selectedOption.name) {
      this.inputString = false
      this.inputNumber = false
    } else {
      switch (this.selectedOption.name) {
        case 'Seleccione un Filtro':
          this.inputString = false
          this.inputNumber = false
          break;

        default:
          if (this.selectedOption.type === 'string') {
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

  // ngOnInit(){
  //   this.subscription.add(this.jugadorFieldService.getFields().subscribe({
  //     next: res => {
  //       console.log("Se reciben datos de los atributos.");
  //       this.fields = res;
  //     },
  //     error: error => {
  //       console.warn("Ha ocurrido un error con código: ", error);
  //     }
  //   }    
  //   ));
  // }
  
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();

  // }

}
