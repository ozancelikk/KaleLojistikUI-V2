import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { AdditionalTask } from '../../models/additionalTask/additionalTask';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdditionalTaskService  extends TtdHttpClientService{

  private _controller="AdditionalTask"
  async addAdditionalTask(addAdditionalTask:AdditionalTask,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | AdditionalTask>({controller:this._controller,action:"Add"},addAdditionalTask) as Observable<ResponseModel>
    return observable
  }
  async updateAdditionalTask(addAdditionalTask:AdditionalTask,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | AdditionalTask>({controller:this._controller,action:"Update"},addAdditionalTask) as Observable<ResponseModel>
    return observable
  }
  async deleteAdditionalTask(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllAdditionalTask(){
    return this.get<ListResponseModel<AdditionalTask>>({controller:this._controller,action:"GetAll"})
  }
  getAllDetails(){
    return this.get<ListResponseModel<AdditionalTask>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByAdditionalTaskId(id:string){
    return this.get<SingleResponseModel<AdditionalTask>>({controller:this._controller,action:"GetByAdditionalTaskId",queryString:`id=${id}`})
  }
}
