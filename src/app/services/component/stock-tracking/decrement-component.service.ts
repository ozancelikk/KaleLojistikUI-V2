import { Injectable } from '@angular/core';
import { DecrementService } from '../../common/stocktracking/decrement.service';
import { ToastrService } from 'ngx-toastr';
import { Decrement } from '../../../models/decrement/decrement';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecrementComponentService {

  constructor(private readonly decrementService:DecrementService,private toastrService:ToastrService) { }


  async getAllDecrement(){
    const observable= this.decrementService.getAllDecrement()
    return (await firstValueFrom(observable)).data
  }
  async getAllDecrementDetails(){
    const observable= this.decrementService.getAllDecrementDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByDecrementId(id:string){
    const observable =this.decrementService.getByDecrementd(id)
    return (await firstValueFrom(observable)).data
  }
  async deleteDecrement(id:string,callBackfunction?:()=>void){
    const observable =await this.decrementService.deleteDecrement(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDecrement(decrement:Decrement,callBackfunction?:()=>void){
    const observable =await this.decrementService.addDecrement(decrement)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateDecrement(decrement:Decrement,callBackfunction?:()=>void){
    const observable =await this.decrementService.updateDecrement(decrement)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
