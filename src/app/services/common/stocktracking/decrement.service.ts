import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../../models/listResponseModel';
import { Decrement } from '../../../models/decrement/decrement';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from '../../../models/responseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecrementService  extends TtdHttpClientService{

  private _controller="Decrement"

  getAllDecrement(){
    return this.get<ListResponseModel<Decrement>>({controller:this._controller,action:"GetAll"})
  }
  getAllDecrementDetails(){
    return this.get<ListResponseModel<Decrement>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByDecrementd(id:string){
    return this.get<SingleResponseModel<Decrement>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  async addDecrement(decrement:Decrement){
    const observable=this.post<ResponseModel | Decrement>({controller:this._controller,action:"Add"},decrement) as Observable<ResponseModel>
    return observable
  }
  async updateDecrement(decrement:Decrement){
    const observable=this.post<ResponseModel | Decrement>({controller:this._controller,action:"Update"},decrement) as Observable<ResponseModel>
    return observable
  }
  async deleteDecrement(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
}
