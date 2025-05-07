import { Injectable } from '@angular/core';
import { MenuImageService } from '../../common/restaurant/menu-image.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuImageComponentService {

  constructor(private menuImageService:MenuImageService,private toastrService:ToastrService) { }

  async addImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("menuId",image.menuId)
    const observable = this.menuImageService.addImage(formData)  
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
    formData.append("menuId",image.menuId)
    const observable =await this.menuImageService.updateImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getByMenuId(id:string){
    const observable =this.menuImageService.getByMenuId(id)
    return (await firstValueFrom(observable)).data
  }
}
