import { Injectable } from '@angular/core';
import { ProductService } from '../../common/stocktracking/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../models/product/product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductComponentService {

  constructor(private readonly productService:ProductService,private toastrService:ToastrService) { }

  async getAllProduct(){
    const observable= this.productService.getAllProduct()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllProductDetails(){
    const observable= this.productService.getAllProductDetails()
    return  (await firstValueFrom(observable)).data
  }
  async getByProductId(id:string){
    const observable =this.productService.getByProductId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteProduct(id:string,callBackfunction?:()=>void){
    const observable =await this.productService.deleteProduct(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addProduct(product:Product,callBackfunction?:()=>void){
    const observable =await this.productService.addProduct(product)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateProduct(product:Product,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.productService.updateProduct(product)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
  }
}
