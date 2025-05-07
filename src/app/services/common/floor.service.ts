import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Floor } from '../../models/floor/floor';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { BranchCount } from '../../models/branch/branchCount';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService  extends TtdHttpClientService{

  private _controller="Floor"
  async addFloor(floor:Floor,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Floor>({controller:this._controller,action:"Add"},floor) as Observable<ResponseModel>
    return observable
  }
  async UpdateFloor(floor:Floor,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Floor>({controller:this._controller,action:"Update"},floor) as Observable<ResponseModel>
    return observable
  }
  async deleteFloor(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllFloor(){
    return this.get<ListResponseModel<Floor>>({controller:this._controller,action:"GetAll"})
  }
  getAllBranchId(id:string){
    return this.get<ListResponseModel<Floor>>({controller:this._controller,action:"GetAllBranchId",queryString:`branchId=${id}`})
  }
  getAllByBlockId(id:string){
    return this.get<ListResponseModel<Floor>>({controller:this._controller,action:"GetAllBlockId",queryString:`blockId=${id}`})
  }
  getByFloorId(id:string){
    return this.get<SingleResponseModel<Floor>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getDetailByFloorId(id:string){
    return this.get<SingleResponseModel<Floor>>({controller:this._controller,action:"GetDetailsByFloorId",queryString:`id=${id}`})
  }
  getByBlockId(id:string){
    return this.get<SingleResponseModel<Floor>>({controller:this._controller,action:"GetByBlockId",queryString:`id=${id}`})
  }
  getAllWithCount(){
    return this.get<ListResponseModel<BranchCount>>({controller:this._controller,action:"GetAllWithCounts"})
  }
}
