import { Injectable } from '@angular/core';
import { OrderService } from '../../common/restaurant/order.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Order } from '../../../models/restaurant/order';

@Injectable({
  providedIn: 'root'
})
export class OrderComponentService {

  constructor(private orderService:OrderService,private toastrService:ToastrService) { }

  async deleteOrder(id:string,callBackfunction?:()=>void){
    const observable =await this.orderService.deleteOrder(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addOrder(order:Order,callBackfunction?:()=>void){
    const observable =await this.orderService.addOrder(order)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateOrder(order:Order,callBackfunction?:()=>void){
    const observable =await this.orderService.updateOrder(order)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllOrder(){
    const observable= this.orderService.getAllOrder()
    return (await firstValueFrom(observable)).data
  }
  async getAllOrderDetails(){
    const observable= this.orderService.getAllOrderDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByOrderId(id:string){
    const observable =this.orderService.getByOrderId(id)
    return (await (firstValueFrom(observable))).data
  }
}
