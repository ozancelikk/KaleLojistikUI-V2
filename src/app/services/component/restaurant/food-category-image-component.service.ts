import { Injectable } from '@angular/core';
import { FoodCategoryImageService } from '../../common/restaurant/food-category-image.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryImageComponentService {

  constructor(private foodCategoryImageService:FoodCategoryImageService,private toastrService:ToastrService) { }

  async addImage(image:any,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("categoryId",image.categoryId)
    const observable = this.foodCategoryImageService.addImage(formData)  
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
    formData.append("categoryId",image.categoryId)
    const observable =await this.foodCategoryImageService.updateImage(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getByCategoryId(id:string){
    const observable =this.foodCategoryImageService.getByCategoryId(id)
    return (await firstValueFrom(observable)).data
  }
}
