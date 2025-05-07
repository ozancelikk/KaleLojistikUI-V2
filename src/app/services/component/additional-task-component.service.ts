import { Injectable } from '@angular/core';
import { AdditionalTaskService } from '../common/additional-task.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AdditionalTask } from '../../models/additionalTask/additionalTask';

@Injectable({
  providedIn: 'root'
})
export class AdditionalTaskComponentService {

  constructor(private additionalTaskService:AdditionalTaskService,private toastrService:ToastrService) { }
  async getAllAdditionalTask(){
    const observable= this.additionalTaskService.getAllAdditionalTask()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllDetails(){
    const observable =this.additionalTaskService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByAdditionalTaskId(id:string){
    const observable =this.additionalTaskService.getByAdditionalTaskId(id)
    return (await (firstValueFrom(observable))).data
  }
  async deleteAdditionalTask(id:string,callBackfunction?:()=>void){
    const observable =await this.additionalTaskService.deleteAdditionalTask(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addAdditionalTask(addAdditionalTask:AdditionalTask,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.additionalTaskService.addAdditionalTask(addAdditionalTask)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
   
  }
  async updateAdditionalTask(addAdditionalTask:AdditionalTask,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.additionalTaskService.updateAdditionalTask(addAdditionalTask)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
  }
}
