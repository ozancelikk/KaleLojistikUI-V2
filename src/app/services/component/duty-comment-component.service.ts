import { Injectable } from '@angular/core';
import { DutyCommentService } from '../common/duty-comment.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { DutyComment } from '../../models/duty/dutyComment';
import { DutyCommentDetails } from '../../models/duty/dutyCommentDetails';

@Injectable({
  providedIn: 'root'
})
export class DutyCommentComponentService {

  constructor(private dutyCommentService:DutyCommentService,private toastrService:ToastrService) { }

  async deleteDutyComment(id:string,callBackfunction?:()=>void){
    const observable =await this.dutyCommentService.deleteDutyComment(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDutyComment(dissolution:DutyComment,callBackfunction?:()=>void){
    const observable =await this.dutyCommentService.addDutyComment(dissolution)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateDutyComment(dissolution:DutyCommentDetails,callBackfunction?:()=>void){
    const observable =await this.dutyCommentService.updateDutyComment(dissolution)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction()
    })
  }
  async getAllDetails(){
    const observable= this.dutyCommentService.getAllDetails()
    return ( await firstValueFrom(observable)).data
  }
  async getByDutyCommentId(id:string){
    const observable= this.dutyCommentService.getByDutyCommentId(id)
    return ( await firstValueFrom(observable)).data
  }
}
