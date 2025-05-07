import { Injectable } from '@angular/core';
import { DutyService } from '../common/duty.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Duty } from '../../models/duty/duty';
import { AssignmentDuty } from '../../models/duty/assignmentDuty';
import { DutyBatchDto } from '../../models/duty/dutyBatchDto';

@Injectable({
  providedIn: 'root'
})
export class DutyComponentService {

  constructor(private dutyService:DutyService,private toastrService:ToastrService) { }
  async getAllDuty(){
    const observable= this.dutyService.getAllDuty()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllDistinct(){
    const observable= this.dutyService.getAllDistinct()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getLatestDuties(){
    const observable= this.dutyService.getLatestDuties()
    return (await firstValueFrom(observable)).data
  }

  async getBranchStatusCount(){
    const observable= this.dutyService.getBranchStatusCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getBlockStatusCount(){
    const observable= this.dutyService.getBlockStatusCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getFloorStatusCount(){
    const observable= this.dutyService.getFloorStatusCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getHallwayStatusCount(){
    const observable= this.dutyService.getHallwayStatusCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getRoomStatusCount(){
    const observable= this.dutyService.getRoomStatusCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  
  async getAllDutyDetails(){
    const observable= this.dutyService.getAllDutyDetails()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getDutyDetailsForDate(){
    const observable= this.dutyService.getDutyDetailsForDate()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getDutyDetailsForDateByBranchId(id:string){
    const observable= this.dutyService.getDutyDetailsForDateByBranchId(id)
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByDuty(id:string){
    const observable =this.dutyService.getByDuty(id)
    return (await firstValueFrom(observable)).data
  }
  async getByDutyDetails(id:string){
    const observable =this.dutyService.getByDutyDetails(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByFloorId(id:string){
    const observable =this.dutyService.getAllByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByEmployeeId(id:string){
    const observable =this.dutyService.getAllByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByHallwayId(id:string){
    const observable =this.dutyService.getAllByHallwayId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByRoomId(id:string){
    const observable =this.dutyService.getAllByRoomId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByDateEmployeeId(id:string,before:string,after:string){
    const observable =this.dutyService.getByDateEmployeeId(id,before,after)
    return (await firstValueFrom(observable)).data
  }
  async getByImagesByDutyId(id:string){
    const observable =this.dutyService.getByImagesByDutyId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByDutyDate(before:string,after:string){
    const observable =this.dutyService.getByDutyDate(before,after)
    return (await firstValueFrom(observable)).data
  }

  async deleteDuty(id:string,callBackfunction?:()=>void){
    const observable =await this.dutyService.deleteDuty(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDuty(duty:Duty,callBackfunction?:()=>void){
    const observable =await this.dutyService.addDuty(duty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async dutyAddBatch(duty:DutyBatchDto,callBackfunction?:()=>void){
    const observable =await this.dutyService.dutyAddBatch(duty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async assignmentDuty(duty:AssignmentDuty,callBackfunction?:()=>void){
    const observable =await this.dutyService.assignmentDuty(duty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateDuty(duty:Duty,callBackfunction?:()=>void){
    const observable =await this.dutyService.updateDuty(duty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getByRoomIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string,callBackfunction?:()=>void){
    const observable= this.dutyService.getByRoomIdAndFilterDateReportPdf(firstDate,endDate,id)
    const promiseData = firstValueFrom(observable)
    
    promiseData.then(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/: ]/g, "-");
      const link = document.createElement('a');
      link.download = `duty-room-${formattedDate}.pdf`;
      link.href = downloadURL;
      link.click();
      callBackfunction && callBackfunction()
    })
  }
  async getByBranchIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string,callBackfunction?:()=>void){
    const observable= this.dutyService.getByBranchIdAndFilterDateReportPdf(firstDate,endDate,id)
    const promiseData = firstValueFrom(observable)
    
    promiseData.then(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/: ]/g, "-");
      const link = document.createElement('a');
      link.download = `duty-Branch-${formattedDate}.pdf`;
      link.href = downloadURL;
      link.click();
      callBackfunction && callBackfunction()
    })
  }
  async getByFloorIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string,callBackfunction?:()=>void){
    const observable= this.dutyService.getByFloorIdAndFilterDateReportPdf(firstDate,endDate,id)
    const promiseData = firstValueFrom(observable)
    
    promiseData.then(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/: ]/g, "-");
      const link = document.createElement('a');
      link.download = `duty-Floor-${formattedDate}.pdf`;
      link.href = downloadURL;
      link.click();
      callBackfunction && callBackfunction()
    })
  }
}
