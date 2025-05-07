import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DutyTag } from '../../models/dutyTag/dutyTag';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DutyTagService extends TtdHttpClientService{
  private _controller="DutyTag"
  async addDutyTag(dutyTag:DutyTag){
    const observable=this.post<ResponseModel | DutyTag>({controller:this._controller,action:"Add"},dutyTag) as Observable<ResponseModel>
    return observable
  }
  async updateDutyTag(dutyTag:DutyTag){
    const observable=this.post<ResponseModel | DutyTag>({controller:this._controller,action:"Update"},dutyTag) as Observable<ResponseModel>
    return observable
  }
  async deleteDutyTag(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllDutyTag(){
    return this.get<ListResponseModel<DutyTag>>({controller:this._controller,action:"GetAll"})
  }
  getByDutyTagId(id:string){
    return this.get<SingleResponseModel<DutyTag>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  
}
