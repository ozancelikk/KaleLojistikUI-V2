import { Injectable } from '@angular/core';
import { LostPropertyService } from '../../common/property/lost-property.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { LostProperty } from '../../../models/lostPropertys/lostProperty';

@Injectable({
  providedIn: 'root'
})
export class LostPropertyComponentService {

  constructor(private lostPropertyService:LostPropertyService,private toastrService:ToastrService) { }

  async getAllDetails(){
    const observable =this.lostPropertyService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getAllLostProperty(){
    const observable =this.lostPropertyService.getAllLostProperty()
    return (await firstValueFrom(observable)).data
  }
  async getById(id:string){
    const observable =this.lostPropertyService.getById(id)
    return (await (firstValueFrom(observable))).data
  }
  async getImagesByPropertyId(id:string){
    const observable =this.lostPropertyService.getImagesByPropertyId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteLostProperty(id:string,callBackfunction?:()=>void){
    const observable =await this.lostPropertyService.deleteLostProperty(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addLostProperty(lostProperty:LostProperty,callBackfunction?:()=>void){
    const observable =await this.lostPropertyService.addLostProperty(lostProperty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateLostProperty(lostProperty:LostProperty,callBackfunction?:()=>void){
    const observable =await this.lostPropertyService.updateLostProperty(lostProperty)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
