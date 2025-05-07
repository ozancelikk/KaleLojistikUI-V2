import { Injectable } from '@angular/core';
import { DynamicReportService } from '../common/dynamic-report.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { DynamicReport } from '../../models/dynamicReport/dynamicReport';

@Injectable({
  providedIn: 'root'
})
export class DynamicReportComponentService {

  constructor(private dynamicReportService:DynamicReportService,private toastrService:ToastrService) { }

  async deleteDynamicReport(id:string,callBackfunction?:()=>void){
    const observable =await this.dynamicReportService.deleteDynamicReport(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDynamicReport(dynamicReport:DynamicReport,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.dynamicReportService.addDynamicReport(dynamicReport)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{ 
      errorCallBack&&errorCallBack(error)
    })
  }
  async dynamicReportEmployeeAdd(dynamicReport:DynamicReport,employeeId:string,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.dynamicReportService.dynamicReportEmployeeAdd(dynamicReport,employeeId)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{ 
      errorCallBack&&errorCallBack(error)
    })
  }
  async dynamicReportAreaAdd(dynamicReport:DynamicReport,areaId:string,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.dynamicReportService.dynamicReportAreaAdd(dynamicReport,areaId)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{ 
      errorCallBack&&errorCallBack(error)
    })
  }
  async updateDynamicReport(dynamicReport:DynamicReport,callBackfunction?:()=>void,errorCallBack?:()=>void){
    const observable =await this.dynamicReportService.updateDynamicReport(dynamicReport)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      this.toastrService.error(error.error)
      errorCallBack&&errorCallBack()
    })
  }
  async getAllDynamicReport(){
    const observable= this.dynamicReportService.getAllDynamicReport()
    return  (await firstValueFrom(observable)).data
  }
  async getAllDynamicReportDetails(){
    const observable= this.dynamicReportService.getAllDynamicReportDetails()
    return  (await firstValueFrom(observable)).data
  }
  async getByDynamicReportId(id:string){
    const observable =this.dynamicReportService.getByDynamicReportId(id)
    return (await firstValueFrom(observable)).data
  }
  async downloadDocumentById(id:string){
    var data=(await this.getByDynamicReportId(id))
    this.dynamicReportService.downloadDocumentById(id).subscribe(response=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = data.reportName+"_"+data.reportCreatedDate+".pdf";
      link.click();
    })
  }
}
