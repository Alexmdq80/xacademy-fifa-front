import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { JugadorHabilidades } from '../../../../core/model/jugador-habilidades.model';
import { ChartObject } from '../../../../core/model/chart-object.model';
import { JugadorField } from '../../../../core/model/jugador-field.model';
// import { BaseChartDirective } from 'ng2-charts'; 
// import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-jugadores-modal',
  standalone: true,
  imports: [
  ],
  templateUrl: './jugadores-modal.component.html',
  styleUrl: './jugadores-modal.component.scss'
})


export class JugadoresModalComponent  implements OnInit, OnDestroy {
 
  // readonly dialog = inject(MatDialog);
  myChart!: Chart;
  player: string[] = [];
  fields: JugadorField[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<string>    
            ) {
    this.player = data.player;
    this.fields = data.fields;
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    if (this.myChart) {
      this.myChart.destroy();
    }

    let habilidadesJugador:JugadorHabilidades = {};

    const indice: number = this.fields.findIndex(i => i.name === 'long_name');
    const nombre: string = this.player[indice];

    let dataset: ChartObject[] = [
      {
        label: 'Habilidades ' + nombre,
        data: [],
        backgroundColor: 'rgba(255, 239, 99, 0.5)'
      }      
    ];

    for (let i = 0; i < this.player.length; i++) {
      if (this.fields[i].name !== 'id' && 
          this.fields[i].name !== 'value_eur' &&
          this.fields[i].name !== 'wage_eur' &&
          this.fields[i].name !== 'height_cm' &&
          this.fields[i].name !== 'weight_kg' &&
          this.fields[i].type === 'integer'){
        habilidadesJugador[this.fields[i].viewName] = this.player[i];
        dataset[0].data.push(Number(this.player[i]));
      }
    }
   
    const etqs:string[] =  Object.keys(habilidadesJugador);
    
    this.Renderchart(etqs, dataset, 'radarchart', 'radar');

  }

  
  ngOnDestroy(): void {

    if (this.myChart) {
      this.myChart.destroy();
    }
    this.dialogRef.close();
  } 

  Renderchart(labeldata: string[], dataset:ChartObject[], chartid:string, charttype:any) {
  
      this.myChart = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: 
          [
            {
              label: dataset[0].label,
              data: dataset[0].data,
              backgroundColor: dataset[0].backgroundColor,
  
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
  
      });
    }
    // **************

}
