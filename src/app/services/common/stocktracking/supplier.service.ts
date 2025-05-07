import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ResponseModel } from '../../../models/responseModel';
import { ListResponseModel } from '../../../models/listResponseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../../../models/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService  extends TtdHttpClientService{

  private _controller="Supplier"

  getAllSupplier(){
    return this.get<ListResponseModel<Supplier>>({controller:this._controller,action:"GetAll"})
  }
  getBySupplierId(id:string){
    return this.get<SingleResponseModel<Supplier>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  async addSupplier(supplier:Supplier,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Supplier>({controller:this._controller,action:"Add"},supplier) as Observable<ResponseModel>
    return observable
  }
  async updateSupplier(supplier:Supplier,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Supplier>({controller:this._controller,action:"Update"},supplier) as Observable<ResponseModel>
    return observable
  }
  async deleteSupplier(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
}
