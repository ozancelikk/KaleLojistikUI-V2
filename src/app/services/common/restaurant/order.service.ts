import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { Order } from '../../../models/restaurant/order';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends TtdHttpClientService{

  private _controller="Order";

  async addOrder(order:Order,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Order>({controller:this._controller,action:"Add"},order) as Observable<ResponseModel>
    return observable
  }
  async updateOrder(order:Order,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Order>({controller:this._controller,action:"Update"},order) as Observable<ResponseModel>
    return observable
  }
  async deleteOrder(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllOrder(){
    return this.get<ListResponseModel<Order>>({controller:this._controller,action:"GetAll"})
  }
  getAllOrderDetails(){
    return this.get<ListResponseModel<Order>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByOrderId(id:string){
    return this.get<SingleResponseModel<Order>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
}
