import { Injectable } from '@angular/core';
import { DissolutionService } from '../common/dissolution.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Dissolution } from '../../models/dissolution/dissolution';

@Injectable({
  providedIn: 'root'
})
export class DissolutionComponentService {

  constructor(private dissolutionService:DissolutionService,private toastrService:ToastrService) { }
  async deleteDissolution(id:string,callBackfunction?:()=>void){
    const observable =await this.dissolutionService.deleteDissolution(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDissolution(dissolution:Dissolution,callBackfunction?:()=>void){
    const observable =await this.dissolutionService.addDissolution(dissolution)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateDissolution(dissolution:Dissolution,callBackfunction?:()=>void){
    const observable =await this.dissolutionService.updateDissolution(dissolution)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllDissolution(){
    const observable= this.dissolutionService.getAllDissolution()
    return ( await firstValueFrom(observable)).data
  }
  async getAllDetails(){
    const observable= this.dissolutionService.getAllDetails()
    return ( await firstValueFrom(observable)).data
  }
  async getByDissolutionId(id:string){
    const observable= this.dissolutionService.getByDissolutionId(id)
    return ( await firstValueFrom(observable)).data
  }
}
