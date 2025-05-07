import { Injectable } from '@angular/core';
import { DutyTagService } from '../common/duty-tag.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { DutyTag } from '../../models/dutyTag/dutyTag';

@Injectable({
  providedIn: 'root'
})
export class DutyTagComponentService {

  constructor(private dutyTagService:DutyTagService,private toastrService:ToastrService) { }

  async deleteDutyTag(id:string,callBackfunction?:()=>void){
    const observable =await this.dutyTagService.deleteDutyTag(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDutyTag(dutyTag:DutyTag,callBackfunction?:()=>void){
    const observable =await this.dutyTagService.addDutyTag(dutyTag)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateDutyTag(dutyTag:DutyTag,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.dutyTagService.updateDutyTag(dutyTag)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      this.toastrService.error(error.error)
      errorCallBack&&errorCallBack(error)
    })
  }
  async getAllDutyTag(){
    const observable= this.dutyTagService.getAllDutyTag()
    return  (await firstValueFrom(observable)).data
  }
  async getByDutyTagId(id:string){
    const observable =this.dutyTagService.getByDutyTagId(id)
    return (await firstValueFrom(observable)).data
  }
}
