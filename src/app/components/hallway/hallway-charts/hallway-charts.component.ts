import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { DutyGroupIdCount } from '../../../models/duty/dutyGroupIdCount';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-hallway-charts',
  standalone: true,
  imports: [CommonModule,NgxEchartsDirective],
  templateUrl: './hallway-charts.component.html',
  styleUrl: './hallway-charts.component.css',
  providers: [
    provideEcharts()]
})
export class HallwayChartsComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  data1:any=""

  @Input() hallwayControls:DutyGroupIdCount[]
  @Input() hallwayId: any; 
  chartOptions: EChartsOption[] = [];
  zeroChartOptionCreated=false;

  
  @Input() set hallwayInfo(value: DutyGroupIdCount[]) {
    if (!value) return
    value.forEach((hallway) => {
      this.updateChart(hallway, this.hallwayId);
    });
  }

  updateChart(hallwayInfo: DutyGroupIdCount, hallwayId: string): void {
    if (hallwayId === hallwayInfo.idCount) {
      const newChartOption: EChartsOption = {
        title: {
          text: this.lang.dutyGraphic,
          textStyle: {
            fontSize: 13,
            fontWeight: 400
          },
          top: 5,
          left: 5
        },
        legend: {
          data: [this.lang.completed, this.lang.incomplete],
          bottom: 5
        },
        toolbox: {
          feature: {
            saveAsImage: {title: this.lang.saveAsImage}
          }
        },
        series: [
          {
            name: this.lang.completed,
            type: 'pie',
            radius: '65%',
            data: [
              {
                value: hallwayInfo.completedCount,
                name: this.lang.completeTask,
                itemStyle: {
                  color:this.createSeries()
                },
                label: {
                  show: false
                }
              },
              {
                value: hallwayInfo.uncompletedCount,
                name: this.lang.incomplete,
                itemStyle: {
                  color: this.createSeries() // Buraya ilk dilim için renk kodunu ekleyin
                },
                label: {
                  show: false
                }
              },
            ],
          },
        ],
      };
      this.chartOptions.push(newChartOption);
    } else if (!this.hallwayControls || this.hallwayControls.length === 0 || !this.hallwayControls.some(item => item.idCount === this.hallwayId)) {
      if (!this.zeroChartOptionCreated) {
    
        const zeroChartOption: EChartsOption = {
          title: {
            text: this.lang.dutyGraphic ,
            textStyle: {
              fontSize: 13,
              fontWeight: 400
            },
            top: 5,
            left: 5
          },
          legend: {
            data: [this.lang.completed, this.lang.incomplete],
            bottom: 5
          },
          toolbox: {
            feature: {
              saveAsImage: {title: this.lang.saveAsImage}
            }
          },
          series: [
            {
              name: this.lang.completed,
              type: 'pie',
              radius: '65%',
              data: [
                {
                  value: 0,
                  name: this.lang.completeTask,
                  itemStyle: {
                    color: this.createSeries() // Buraya ilk dilim için renk kodunu ekleyin
                  },
                  label: {
                    show: false
                  }
                },
                {
                  value: 0,
                  name: this.lang.incomplete,
                  itemStyle: {
                    color: this.createSeries(),
                  },
                  label: {
                    show: false
                  }
                },
              ],
            },
          ],
        };
        this.chartOptions.push(zeroChartOption);
       
        this.zeroChartOptionCreated = true;
      }
  }
  
}
  
  




createSeries() {
  let colorPairs = [
    ["#2F3C7E", "#FBEAEB"],
    ["#F96167", "#F9E795"],
    ["#E2D1F9", "#317773"],
    ["#ADD8E6", "#00008B"],
    ["#89ABE3", "#EA738D"],
    ["#cda5f3", "#8674aa"],
    ["#a6b8f3", "#7481aa"],
    ["#ff6680", "#b34766"],
    ["#9999ff", "#e843e5"],
    ["#99b3ff", "#6b7db3"]
  ];

  // Generate a random index to select a color pair
  let randomIndex = Math.floor(Math.random() * colorPairs.length);

  // Retrieve the color pair using the random index
  let selectedColorPair = colorPairs[randomIndex];

  // Return the first color from the selected pair
  return selectedColorPair[0];
}

    
}
