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
import { LineaTiempo } from '../../../../core/model/linea-tiempo.model';
// import { MatSelectModule } from '@angular/material/select';


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
  grafico?: string;
  jugador?: Jugador;
  fields: JugadorField[] = [];
  dataLineaTiempo: LineaTiempo[] = [];
  titulo: string = 'Gráfico de Habilidades'; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<string>    
            ) {
    this.grafico = data.grafico;
    if (this.grafico === 'radar_habilidades') {
      this.jugador = data.player;
      this.fields = data.fields;
    } else if (this.grafico === 'linea_tiempo') {
      this.jugador = data.player;
      this.fields = data.fields;
      this.dataLineaTiempo = data.dataLineaTiempo;
    }
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    let tipo: string = ''; 
    if (this.myChart) {
      this.myChart.destroy();
    }

    if (this.dialogRef.id === 'graficoHabilidades') {
      tipo = 'radar';
    } else if (this.dialogRef.id === 'graficoLineaTiempo') {
      tipo = 'line';
    }

    let habilidadesJugador:JugadorHabilidades = {};

    // const indice: number = this.fields.findIndex(i => i.name === 'long_name');
    const nombre: string = this.jugador!.long_name;

    console.log(nombre);

    let dataset: ChartObject[] = [
      {
        label: nombre,
        data: [],
        backgroundColor: 'rgba(255, 239, 99, 0.5)'
      }      
    ];

    if (tipo === 'radar') {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].esSpecifSkill  === true) {
          habilidadesJugador[this.fields[i].viewName] = this.jugador![this.fields[i].name];
          dataset[0].data.push(Number(this.jugador![this.fields[i].name]));
        }
      }        
      const etqs:string[] =  Object.keys(habilidadesJugador); 

      console.log(etqs);
      this.Renderchart(etqs, dataset, 'radarchart', tipo);
    } else if (tipo=== 'line') {
      const etqs: string[] = this.dataLineaTiempo.map(objeto => `${objeto.fifa_version}.${objeto.fifa_update}`);
      this.titulo = 'Línea de Tiempo';

      for (let i = 0; i < this.dataLineaTiempo.length; i++) {
        const valor: number[] = Object.values(this.dataLineaTiempo[i]);
        dataset[0].data.push(valor[2]);
      }        
 
      const atributo = Object.keys(this.dataLineaTiempo[0])[2];
      const indice = this.fields.findIndex(i => i.name === atributo);
      const atributo_viewName = this.fields[indice].viewName;

      this.RenderchartLine(etqs, dataset, 'radarchart', tipo, atributo_viewName);
    } 

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
    RenderchartLine(labeldata: string[], dataset:ChartObject[], chartid:string, charttype:any, atributo: string) {
      this.myChart = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [{
            label: atributo,
            data: dataset[0].data,
            backgroundColor: dataset[0].backgroundColor,
          }]
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

}
