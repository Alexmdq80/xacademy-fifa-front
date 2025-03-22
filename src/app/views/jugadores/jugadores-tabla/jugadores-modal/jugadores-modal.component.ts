import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { JugadorHabilidades } from '../../../../core/model/jugador-habilidades.model';
import { ChartObject } from '../../../../core/model/chart-object.model';
import { JugadorField } from '../../../../core/model/jugador-field.model';
// import { BaseChartDirective } from 'ng2-charts'; 
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { Jugador } from '../../../../core/model/jugador.model';


@Component({
    selector: 'app-jugadores-modal',
    imports: [
      MatDialogContent      
    ],
    templateUrl: './jugadores-modal.component.html',
    styleUrl: './jugadores-modal.component.scss'
})


export class JugadoresModalComponent  implements OnInit, OnDestroy {

  // readonly dialog = inject(MatDialog);
  myChart!: Chart;
  // player: string[] = [];
  jugador?: Jugador;
  fields: JugadorField[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<string>    
            ) {
    this.jugador = data.player;
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
    const nombre: string = this.jugador!.long_name;

    let dataset: ChartObject[] = [
      {
        label: 'Habilidades ' + nombre,
        data: [],
        backgroundColor: 'rgba(255, 239, 99, 0.5)'
      }      
    ];

    // for (let i = 0; i < this.player.length; i++) {
    //   // if (this.fields[i].name !== 'id' && 
    //   //     this.fields[i].name !== 'value_eur' &&
    //   //     this.fields[i].name !== 'wage_eur' &&
    //   //     this.fields[i].name !== 'height_cm' &&
    //   //     this.fields[i].name !== 'weight_kg' &&
    //   //     this.fields[i].type === 'integer'){
    //   if (this.fields[i].esSkill === true) {
    //     habilidadesJugador[this.fields[i].viewName] = this.player[i];
    //     dataset[0].data.push(Number(this.player[i]));
    //   }
    // }

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].esSpecifSkill  === true) {
        habilidadesJugador[this.fields[i].viewName] = this.jugador![this.fields[i].name];
        dataset[0].data.push(Number(this.jugador![this.fields[i].name]));
      }
    }
   

    const etqs:string[] =  Object.keys(habilidadesJugador);
    
    let tipo: string = ''; 
    if (this.dialogRef.id === 'graficoHabilidades') {
      tipo = 'radar';
    } else if (this.dialogRef.id === 'graficoLineaTiempo') {
      tipo = 'line';
    }

    console.log(tipo);

    this.Renderchart(etqs, dataset, 'radarchart', tipo);

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
          responsive: true, // Ajusta el tamaño al contenedor
          maintainAspectRatio: true, // Deshabilita el aspecto de relación
          legend: {
            labels: {
              font: {
                size: 8
              }
            }
          },
          font: {
            size: 32
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            y: {
              beginAtZero: false,
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            r: {
              ticks: {
                font: {
                  size: 10
                }
              }
            }
          }
        }  
      });
    }
    // **************

}
