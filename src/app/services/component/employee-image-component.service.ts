import { Injectable } from '@angular/core';
import { EmployeeImageService } from '../common/employee-image.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeImage } from '../../models/employee/employeeImage';
import { firstValueFrom } from 'rxjs';
import { EmployeeImageDto } from '../../models/employee/employeeImageDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeImageComponentService {

  constructor(private employeeImageService:EmployeeImageService,private toastrService:ToastrService) { }
  
  async addImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("employeeId",image.employeeId)
    const observable =await this.employeeImageService.addImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction()
    })
  }
  async updateImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("id",image.id)
    formData.append("image",image.image)
    formData.append("employeeId",image.employeeId)
    const observable =await this.employeeImageService.updateImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction()
    })
  }
  async getImagesByEmployeeId(id:string){
    const observable =this.employeeImageService.getImagesByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByImagesByEmployeeId(id:string){
    const observable =this.employeeImageService.getByImagesByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
}
