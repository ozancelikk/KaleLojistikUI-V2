import { Component } from '@angular/core';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { CommonModule } from '@angular/common';
import { DashboardData } from '../../../models/dashboard/dashboardData';
import { DashboardComponentService } from '../../../services/component/dashboard-component.service';
import { Duty } from '../../../models/duty/duty';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import * as echarts from 'echarts';
import { RouterLink } from '@angular/router';
import { DutyComponentService } from '../../../services/component/duty-component.service';
@Component({
  selector: 'app-dashboard-graffic',
  standalone: true,
  imports: [CommonModule,NgxEchartsDirective,RouterLink],
  templateUrl: './dashboard-graffic.component.html',
  styleUrl: './dashboard-graffic.component.css',
  providers: [provideEcharts()]
})

export class DashboardGrafficComponent {
 lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  //Flag
 dataLoaded = false;
 dutyLoaded = false;


 //#region Class
  duty:Duty[];
  dashboardData: DashboardData
  firstElement:number;
  monthsValue: number[];
  weeklyValue: number[];
  dailyValue: number[] = [];
  fiveYearValue: number[];
  yearnumberList: number[] = [];
  weeklynumberList: number[] = [];
  dailynumberList: number[] = [];
  fiveYearnumberList: number[] = [];
  weeklyDataLoad: boolean = false;
  yearlyDataLoad: boolean = false;
  monthlyDataLoad: boolean = false;
  dailyDataLoad: boolean = false;
  chartDom: any;
  dutyCount:any

  //#endregion


  ngOnInit(): void {
   this.getAllDashboardData();
  
   this.getAllDuty()

  }
  constructor(private dashboardComponentService: DashboardComponentService, private dutyComponentService:DutyComponentService) { }


  async getAllDuty() {
    this.duty = (await this.dutyComponentService.getLatestDuties())
    this.dutyLoaded = true;
  };


  //#region Graffic Data

  async getAllDashboardData() {
    this.dashboardData = (await this.dashboardComponentService.getAllDashboardData())
      this.weeklyValue = this.dashboardData.weeklyTask.weeklyDutyGraficValue;
      this.monthsValue = this.dashboardData.yearTask.yearDutyGraficValue;
      this.dailyValue = this.dashboardData.dailyTask.dailyDutyGraficValue;
      this.fiveYearValue = this.dashboardData.fiveYearTask.yearlyDutyValue;
      this.dutyCount = this.dashboardData.dashboard.dutyCount;
      this.dataLoaded = true;
      this.updateCharts();
      
  }

  getYearGrafic() {
    this.monthsValue.forEach(monthData => {
      this.yearnumberList.push(monthData);
    });
    this.yearlyDataLoad = true;
    if(this.yearlyDataLoad==true){
      this.fiveYearCharts();
    }
  }

  getWeeklyGrafic() {
    this.weeklyValue.forEach(weeklyData => {
      this.weeklynumberList.push(weeklyData);
    });
    this.weeklyDataLoad = true
  
    if(this.weeklyDataLoad==true){
      this.weeklyGraffic();
    }
  }

  getDailyGrafic() {
    this.dailyValue.forEach(dailyData => {
      this.dailynumberList.push(dailyData);
    });
    this.dailyDataLoad = true
    if(this.dailyDataLoad==true){
      this.dailyCharts();
    }
  }
  getFiveYearGrafic() {
    this.fiveYearValue.forEach(fiveYearData => {
      this.fiveYearnumberList.push(fiveYearData);
      
    });
    this.yearlyDataLoad = true
  }

   
  updateCharts() {
    this.getYearGrafic();
    this.getWeeklyGrafic();
    this.getDailyGrafic();
    this.getFiveYearGrafic();
  }
  //#endregion
  

  //#region Graffic
 
    resize(id: string, chart: any) { 
      const container = document.getElementById(id) as HTMLElement;
      if(container) new ResizeObserver(() => chart.resize()).observe(container);}

   weeklyGraffic(){

  var chartDom = document.getElementById('weeklychart');
  let weeklyLogCountChartInit = echarts.getInstanceByDom(chartDom)
  var myChart = echarts.init(chartDom);
  weeklyLogCountChartInit = echarts.init(chartDom, null, { renderer: "canvas", useDirtyRect: true });
  var option;
  var fontSize;
  const width = chartDom.offsetWidth;
  if (width < 500) {
    fontSize= 10;
  } else if (width < 800) {
     fontSize= 16;
  } else {
    fontSize=18;
  }
  option = {
    xAxis: {
      type: 'category',
      data: [1, 2, 3, 4]
    },
    yAxis: {
      type: 'value'
    },
    title: {
      text: this.lang.weeklyCompletedTasks,
      left: 'center',
      textStyle:{
        fontSize:fontSize
      }
    },
    series: [
      {
        data: this.weeklynumberList,
        type: 'bar',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,    
            y: 0,   
            x2: 0,   
            y2: 1,  
            colorStops: [
              { offset: 0, color: '#313866' },
              { offset: 0.33, color: '#504099' },
              { offset: 0.66, color: '#974EC3' },
              { offset: 1, color: '#FE7BE5' },
            ]
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
  this.resize("weeklychart",weeklyLogCountChartInit);
  window.addEventListener('resize', this.weeklyGraffic);
 }

 dailyCharts(){

  var dailychartDom = document.getElementById('dailychart');
  let dailyLogCountChartInit = echarts.getInstanceByDom(dailychartDom)
  var dailyChart = echarts.init(dailychartDom);
  dailyLogCountChartInit = echarts.init(dailychartDom, null, { renderer: "canvas", useDirtyRect: true }); 
  var dailyOption;
  var fontSize;
  const width = dailychartDom.offsetWidth;
  if (width < 500) {
    fontSize= 10;
  } else if (width < 800) {
     fontSize= 16;
  } else {
    fontSize=18;
  }
  
  dailyOption = {
    title: {
      text: this.lang.dailyCompletedTasks,
      left: 'center',
      textStyle: {
        fontSize: fontSize
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      bottom: 5
    },
    series: [
      {
        name: this.lang.accessFrom,
        type: 'pie',
        radius: '50%',
        data: [
          { value: this.dailynumberList[0], name: this.lang.monday },
          { value: this.dailynumberList[1], name: this.lang.thuseday },
          { value: this.dailynumberList[2], name: this.lang.wednesday },
          { value: this.dailynumberList[3], name: this.lang.thursday },
          { value: this.dailynumberList[4], name: this.lang.friday },
          { value: this.dailynumberList[5], name: this.lang.saturday },
          { value: this.dailynumberList[6], name: this.lang.sunday }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}: {c}',
          fontSize: fontSize
        },
        labelLine: {
          length: 10,
          length2: 0
        }
      }
    ]
  
};

this.dailyDataLoad=true;
dailyOption && dailyChart.setOption(dailyOption);
this.resize("dailychart",dailyLogCountChartInit);
window.addEventListener('resize', this.dailyCharts);
  }

 fiveYearCharts(){
   
    var yearchartDom = document.getElementById('optionyear');
    let yearLogCountChartInit = echarts.getInstanceByDom(yearchartDom)
    var fiveYearChart = echarts.init(yearchartDom);
    yearLogCountChartInit = echarts.init(yearchartDom, null, { renderer: "canvas", useDirtyRect: true }); 
    var optionFiveYear;
    var fontSize;
    const width = yearchartDom.offsetWidth;
    if (width < 500) {
      fontSize=10;
    } else if (width < 800) {
       fontSize= 16;
    } else {
      fontSize=18;
    }
    
optionFiveYear= {
  xAxis: {
    type: 'category',
    data: [ '1', '2', '3', '4', '5']
  },
  yAxis: {
    type: 'value'
  },
  title: {
    text: this.lang.fiveYearCompletedTasks,
    left: 'center',
    textStyle:{
      fontSize:fontSize
    }
  },
  series: [
    {
      data: this.yearnumberList,
      color: '#1D267D',
      type: 'line',
      smooth: true
    }
  ]
};

this.yearlyDataLoad=true;
optionFiveYear && fiveYearChart.setOption(optionFiveYear);
this.resize("optionyear",yearLogCountChartInit);
window.addEventListener('resize', this.fiveYearCharts);
  }





  //#endregion 
}
