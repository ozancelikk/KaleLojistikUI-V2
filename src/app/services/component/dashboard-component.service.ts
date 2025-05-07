import { Injectable } from '@angular/core';
import { DashboardService } from '../common/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class DashboardComponentService {

  constructor(private dashboardService:DashboardService,private toastrService:ToastrService) { }

  async getAllDashboardData(){
    const observable =this.dashboardService.getAllDashboardData()
    return (await firstValueFrom(observable)).data
  }
  async getAverageDutyBlockPdfExport(){
    const observable =this.dashboardService.getAverageDutyBlockPdfExport().subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'block_report.pdf';
      link.click();
    
    })
  }
  async getAverageDutyBranchPdfExport(){
    const observable =this.dashboardService.getAverageDutyBranchPdfExport().subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'branch_report.pdf';
      link.click();
    })
  }
  async getAverageDutyByFloorPdfExport(){
    const observable =this.dashboardService.getAverageDutyByFloorPdfExport().subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'floor_report.pdf';
      link.click();
    })
  }
  async getFiveYearTaskReportPdfExport(){
     this.dashboardService.getFiveYearTaskReportPdfExport().subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'five_year_report.pdf';
      link.click();
    })
  }
  async dutyCommentReportPdfExport(){
    const observable =this.dashboardService.dutyCommentReportPdfExport().subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'employee_report.pdf';
        link.click();
    })
  }
}
