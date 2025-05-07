import { Injectable } from '@angular/core';
import { CategoryService } from '../../common/stocktracking/category.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Category } from '../../../models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryComponentService {

  constructor(private readonly categoryService:CategoryService,private toastrService:ToastrService) { }

  async getAllCategory(){
    const observable= this.categoryService.getAllCategory()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByCategoryId(id:string){
    const observable =this.categoryService.getByCategoryId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteCategory(id:string,callBackfunction?:()=>void){
    const observable =await this.categoryService.deleteCategory(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addCategory(category:Category,callBackfunction?:()=>void){
    const observable =await this.categoryService.addCategory(category)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateCategory(category:Category,callBackfunction?:()=>void){
    const observable =await this.categoryService.updateCategory(category)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
