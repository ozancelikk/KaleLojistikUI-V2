import { Injectable } from '@angular/core';
import { RepeatedDutyService } from '../common/repeated-duty.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { RepeatedDuty } from '../../models/duty/repeatedDuty';
import { RepeatedDutyAddBatch } from '../../models/duty/repeatedDutyAddBatch';

@Injectable({
  providedIn: 'root'
})
export class RepeatedDutyComponentService {

  constructor(private repeatedDutyService:RepeatedDutyService,private toastrService:ToastrService) { }

  async getAllRepeatedDuty(){
    const observable= this.repeatedDutyService.getAllRepeatedDuty()
    return(await firstValueFrom(observable)).data
  }
  async getAllRepeatedDutyDetails(){
    const observable= this.repeatedDutyService.getAllRepeatedDutyDetails()
    return(await firstValueFrom(observable)).data
  }

  async getByRepeatedDutyId(id:string){
    const observable =this.repeatedDutyService.getByRepeatedDuty(id)
    return (await firstValueFrom(observable)).data
  }
  async addEmployeeToRepeatedDuty(dutyId:string,empId:string){
    const observable =this.repeatedDutyService.addEmployeeToRepeatedDuty(dutyId,empId)
    return (await firstValueFrom(observable)).data
  }

  async deleteRepeatedDuty(id:string,callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.deleteRepeatedDuty(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addRepeatedDuty(repeatedDuty:RepeatedDuty,callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.addRepeatedDuty(repeatedDuty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async repeatedDutyBatchAdd(repeatedDuty:RepeatedDutyAddBatch,callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.repeatedDutyBatchAdd(repeatedDuty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateRepeatedDuty(repeatedDuty:RepeatedDuty,callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.updateRepeatedDuty(repeatedDuty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getBySelectedIdActive(id:string[],callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.getBySelectedIdActive(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getBySelectedIdPassive(id:string[],callBackfunction?:()=>void){
    const observable =await this.repeatedDutyService.getBySelectedIdPassive(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
