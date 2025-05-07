import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { LostProperty } from '../../../models/lostPropertys/lostProperty';
import { LostPropertyImageDetailsDto } from '../../../models/lostPropertys/lostPropertyImageDetailsDto';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LostPropertyService  extends TtdHttpClientService{

  private _controller = 'LostProperty';
  async addLostProperty(property:LostProperty,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | LostProperty>({controller:this._controller,action:"Add"},property) as Observable<ResponseModel>
    return observable
  }
  async updateLostProperty(property:LostProperty,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | LostProperty>({controller:this._controller,action:"Update"},property) as Observable<ResponseModel>
    return observable
  }
  async deleteLostProperty(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllLostProperty(){
    return this.get<ListResponseModel<LostProperty>>({controller:this._controller,action:"GetAll"})
  }
  getAllDetails(){
    return this.get<ListResponseModel<LostPropertyImageDetailsDto>>({controller:this._controller,action:"GetAllImageDetails"})
  }
  getById(id:string){
    return this.get<SingleResponseModel<LostProperty>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getImagesByPropertyId(id:string){
    return this.get<SingleResponseModel<LostPropertyImageDetailsDto>>({controller:this._controller,action:"GetImageByPropertyId",queryString:`id=${id}`})
  }
}
