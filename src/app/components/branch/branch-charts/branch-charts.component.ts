import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { DutyGroupIdCount } from '../../../models/duty/dutyGroupIdCount';

@Component({
  selector: 'app-branch-charts',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './branch-charts.component.html',
  styleUrl: './branch-charts.component.css',
  providers: [
    provideEcharts()],


})
export class BranchChartsComponent {
  data:DutyGroupIdCount[]
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Input() branchControls: DutyGroupIdCount[]
  @Input() branchId: any;
  chartOptions: EChartsOption[] = [];
  zeroChartOptionCreated = false;


  @Input() set branchInfo(value: DutyGroupIdCount[]) {
    if (!value) return
    this.data = value
    value.forEach((branch) => {
      this.updateChart(branch, this.branchId);
    });
  }

  updateChart(branchInfo: DutyGroupIdCount, branchId: string): void {
    if (branchId === branchInfo.idCount) {
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
                value: branchInfo.completedCount,
                name: this.lang.completeTask,
                itemStyle: {
                  color: this.createSeries()
                },
                label: {
                  show: false
                }
              },
              {
                value: branchInfo.uncompletedCount,
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
    } else if (!this.branchControls || this.branchControls.length === 0 || !this.branchControls.some(item => item.idCount === this.branchId)) {
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
              saveAsImage: {title:this.lang.saveAsImage}
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
                    color:   this.createSeries()
                  },
                  label: {
                    show: false
                  }
                },
                {
                  value: 0,
                  name: this.lang.incomplete,
                  itemStyle: {
                    color:  this.createSeries()
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



  resize(id: string, chart: any) {
    const container = document.getElementById(id) as HTMLElement;
    new ResizeObserver(() => chart.resize()).observe(container);
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
