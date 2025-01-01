import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { BaseChartDirective } from 'ng2-charts'; 

@Component({
  selector: 'app-jugadores-modal',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './jugadores-modal.component.html',
  styleUrl: './jugadores-modal.component.scss'
})
export class JugadoresModalComponent implements OnInit {

  chartdata: string[] = ['A','B','C']
  labeldata: number[] = [10,20,30];
  realdata: number[] = [19,28,37];
  colordata: string[] = ['red','green','pink'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // Personaliza los datos del gráfico según los datos de la fila
    // this.radarChartLabels = data.labels;
    // this.radarChartData = data.data;
  }

  Renderlinechart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'linechart','line')
  }

  Renderchart(labeldata: any, valuedata: any, colordata: any,chartid:string,charttype:any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Test',
            data: valuedata,
            backgroundColor: colordata,

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

  ngOnInit(): void {
    console.log('paso' + this.labeldata);
    this.chartdata = ['A','B','C']
    this.labeldata = [10,20,30];
    this.realdata = [99,99,99];
    this.colordata = ['red','green','pink'];
    this.Renderlinechart(this.labeldata, this.chartdata, this.colordata );
  }

}
