import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { DashboardData } from '../../models/dashboard/dashboardData';
import { DashboardComponentService } from '../../services/component/dashboard-component.service';
import { DashboardGrafficComponent } from './dashboard-graffic/dashboard-graffic.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,DashboardGrafficComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));



  // duty:Duty[];
  dashboardData: DashboardData
  monthsValue: number[];
  weeklyValue: number[];
  dailyValue: number[];
  fiveYearValue: number[];
  yearnumberList: number[] = [];
  weeklynumberList: number[] = [];
  dailynumberList: number[] = [];
  fiveYearnumberList: number[] = [];
  weeklyDataLoad: boolean = false;
  yearlyDataLoad: boolean = false;
  monthlyDataLoad: boolean = false;
  dailyDataLoad: boolean = false;

  constructor(
    private dashboardComponentService: DashboardComponentService,
    //private dutyService:DutyService,
  ) { }




}
