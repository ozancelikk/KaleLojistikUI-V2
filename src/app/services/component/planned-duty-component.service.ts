import { Injectable } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { PlannedDutyService } from '../common/planned-duty.service';
import { PlannedDuty } from '../../models/plannedDuty/plannedDuty';

@Injectable({
  providedIn: 'root'
})
export class PlannedDutyComponentService {

  constructor(private plannedDutyService:PlannedDutyService,private toastrService:ToastrService) { }

   async deletePlannedDuty(id:string,callBackfunction?:()=>void){
      const observable =await this.plannedDutyService.deletePlannedDuty(id)  
      const promiseData= firstValueFrom(observable)
      promiseData.then(response=>{
        this.toastrService.success(response.message)
        callBackfunction&&callBackfunction()
      })
    }
    async addPlannedDuty(plannedDuty:PlannedDuty,callBackfunction?:()=>void){
      const observable =await this.plannedDutyService.addPlannedDuty(plannedDuty)  
      const promiseData= firstValueFrom(observable)
      promiseData.then(response=>{
        this.toastrService.success(response.message)
        callBackfunction&&callBackfunction()
      })
     
    }
    async updatePlannedDuty(plannedDuty:PlannedDuty,callBackfunction?:()=>void){
      const observable =await this.plannedDutyService.updatePlannedDuty(plannedDuty)  
      const promiseData= firstValueFrom(observable)
      promiseData.then(response=>{
        this.toastrService.success(response.message)
        callBackfunction&&callBackfunction()
      })
    }
    async getAllPlannedDutyDetails(){
        const observable= this.plannedDutyService.getAllPlannedDuty()
        return(await firstValueFrom(observable)).data
      }
    
      async getByPlannedDutyId(id:string){
        const observable =this.plannedDutyService.getByPlannedDuty(id)
        return (await firstValueFrom(observable)).data
      }
}
