import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { DutyGroupIdCount } from '../../../models/duty/dutyGroupIdCount';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-room-charts',
  standalone: true,
  imports: [CommonModule,NgxEchartsDirective],
  templateUrl: './room-charts.component.html',
  styleUrl: './room-charts.component.css',
  providers:[provideEcharts()]
})
export class RoomChartsComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));


  @Input() roomControls:DutyGroupIdCount[]
  @Input() roomId: any; 
  chartOptions: EChartsOption[] = [];
  zeroChartOptionCreated=false;

  
  @Input() set roomInfo(value: DutyGroupIdCount[]) {
    if (!value) return
    value.forEach((room) => {
      this.updateChart(room, this.roomId);
    });
  }

  updateChart(roomInfo: DutyGroupIdCount, roomId: string): void {
   

    if (roomId === roomInfo.idCount) {
      debugger
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
                value: roomInfo.completedCount,
                name: this.lang.completeTask,
                itemStyle: {
                  color: this.createSeries()
                },
                label: {
                  show: false
                }
              },
              {
                value: roomInfo.uncompletedCount,
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
    } else if (!this.roomControls || this.roomControls.length === 0 || !this.roomControls.some(item => item.idCount === this.roomId)) {
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


  let randomIndex = Math.floor(Math.random() * colorPairs.length);
  let selectedColorPair = colorPairs[randomIndex];
  return selectedColorPair[0];
}

}
