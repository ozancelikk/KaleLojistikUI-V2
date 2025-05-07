import { Injectable } from '@angular/core';
import { SupplierService } from '../../common/stocktracking/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Supplier } from '../../../models/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierComponentService {

  constructor(private readonly supplierService:SupplierService,private toastrService:ToastrService) { }

  async getAllSupplier(){
    const observable= this.supplierService.getAllSupplier()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getBySupplierId(id:string){
    const observable =this.supplierService.getBySupplierId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteSupplier(id:string,callBackfunction?:()=>void){
    const observable =await this.supplierService.deleteSupplier(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addSupplier(supplier:Supplier,callBackfunction?:()=>void){
    const observable =await this.supplierService.addSupplier(supplier)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateSupplier(supplier:Supplier,callBackfunction?:()=>void){
    const observable =await this.supplierService.updateSupplier(supplier)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
