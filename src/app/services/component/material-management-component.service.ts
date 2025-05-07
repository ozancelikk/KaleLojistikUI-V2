import { Injectable } from '@angular/core';
import { MaterialManagementService } from '../common/material-management.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { MaterialManagement } from '../../models/materialManagement/materialManagement';

@Injectable({
  providedIn: 'root'
})
export class MaterialManagementComponentService {

  constructor(private materialManagementService:MaterialManagementService,private toastrService:ToastrService) { }
  async getAllMaterialManagement(){
    const observable= this.materialManagementService.getAllMaterialManagement()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getById(id:string){
    const observable =this.materialManagementService.getById(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteMaterialManagement(id:string,callBackfunction?:()=>void){
    const observable =await this.materialManagementService.deleteMaterialManagement(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addMaterialManagement(materialManagement:MaterialManagement,callBackfunction?:()=>void){
    const observable =await this.materialManagementService.addMaterialManagement(materialManagement)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateMaterialManagement(materialManagement:MaterialManagement,callBackfunction?:()=>void){
    const observable =await this.materialManagementService.updateMaterialManagement(materialManagement)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
