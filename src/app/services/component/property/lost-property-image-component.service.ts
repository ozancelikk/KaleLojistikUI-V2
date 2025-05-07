import { Injectable } from '@angular/core';
import { LostPropertyImageService } from '../../common/property/lost-property-image.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPropertyImageComponentService {

  constructor(private lostPropertyImageService:LostPropertyImageService,private toastrService:ToastrService) { }

  async addImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("propertyId",image.propertyId)
    const observable = this.lostPropertyImageService.addImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      window.location.reload()
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
    return await promiseData
  }
  async updateImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("id",image.id)
    formData.append("image",image.image)
    formData.append("propertyId",image.propertyId)
    const observable =await this.lostPropertyImageService.updateImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getByPropertyId(id:string){
    const observable =this.lostPropertyImageService.getByPropertyId(id)
    return (await firstValueFrom(observable)).data
  }
}
