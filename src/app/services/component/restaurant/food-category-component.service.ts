import { Injectable } from '@angular/core';
import { FoodCategoryService } from '../../common/restaurant/food-category.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { FoodCategory } from '../../../models/restaurant/foodCategory';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryComponentService {

  constructor(private foodCategoryService:FoodCategoryService,private toastrService:ToastrService) { }

  async deleteFoodCategory(id:string,callBackfunction?:()=>void){
    const observable =await this.foodCategoryService.deleteFoodCategory(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addFoodCategory(foodCategory:FoodCategory,callBackfunction?:()=>void){
    const observable =await this.foodCategoryService.AddFoodCategory(foodCategory)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateFoodCategory(foodCategory:FoodCategory,callBackfunction?:()=>void){
    const observable =await this.foodCategoryService.updateFoodCategory(foodCategory)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllFoodCategory(){
    const observable= this.foodCategoryService.getAllFoodCategory()
    return (await firstValueFrom(observable)).data
  }
  async getAllImagesDetails(){
    const observable =this.foodCategoryService.getAllImagesDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByFoodCategoryId(id:string){
    const observable =this.foodCategoryService.getByFoodCategoryId(id)
    return (await (firstValueFrom(observable))).data
  }
  async getImageByFoodCategoryId(id:string){
    const observable =this.foodCategoryService.getImageByFoodCategoryId(id)
    return (await (firstValueFrom(observable))).data
  }
}
