import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { DutyGroupIdCount } from '../../../models/duty/dutyGroupIdCount';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-floor-charts',
  standalone: true,
  imports: [CommonModule,NgxEchartsDirective],
  templateUrl: './floor-charts.component.html',
  styleUrl: './floor-charts.component.css',
  providers:[provideEcharts()]
})
export class FloorChartsComponent {
  data1:any=""
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  color1:any;
  color2:any;
  @Input() floorControls:DutyGroupIdCount[]
  @Input() floorId: any; 
  chartOptions: EChartsOption[] = [];
  zeroChartOptionCreated=false;


  
  @Input() set floorInfo(value: DutyGroupIdCount[]) {
    if (!value) return
    value.forEach((floor) => {
      this.updateChart(floor, this.floorId);
    });
  }

  updateChart(floorInfo: DutyGroupIdCount, floorId: string): void {
    if (floorId === floorInfo.idCount) {
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
                value: floorInfo.completedCount,
                name: this.lang.completeTask,
                itemStyle: {
                  color: this.createSeries()
                },
                label: {
                  show: false
                }
              },
              {
                value: floorInfo.uncompletedCount,
                name: this.lang.incomplete,
                itemStyle: {
                  color: this.createSeries()
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
    } else if (!this.floorControls || this.floorControls.length === 0 || !this.floorControls.some(item => item.idCount === this.floorId)) {
      if (!this.zeroChartOptionCreated) {
    
        const zeroChartOption: EChartsOption = {
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
                  value: 0,
                  name: this.lang.completeTask,
                  itemStyle: {
                    color: this.createSeries()
                  },
                  label: {
                    show: false
                  }
                },
                {
                  value: 0,
                  name: this.lang.incomplete,
                  itemStyle: {
                    color: this.createSeries()
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
