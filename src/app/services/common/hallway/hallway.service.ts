import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { Hallway } from '../../../models/hallway/hallway';
import { ResponseModel } from '../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { BranchCount } from '../../../models/branch/branchCount';
import { HallwayCount } from '../../../models/hallway/hallwayCount';

@Injectable({
  providedIn: 'root'
})
export class HallwayService extends TtdHttpClientService{

  private _controller="Hallway"
  async addHallway(hallway:Hallway,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Hallway>({controller:this._controller,action:"Add"},hallway) as Observable<ResponseModel>
    return observable
  }
  async updateHallway(floor:Hallway,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Hallway>({controller:this._controller,action:"Update"},floor) as Observable<ResponseModel>
    return observable
  }
  async deleteHallway(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllHallway(){
    return this.get<ListResponseModel<Hallway>>({controller:this._controller,action:"GetAll"})
  }
  getByHallwayId(id:string){
    return this.get<SingleResponseModel<Hallway>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getDetailsByHallwayId(id:string){
    return this.get<SingleResponseModel<Hallway>>({controller:this._controller,action:"GetDetailsByHallwayId",queryString:`id=${id}`})
  }
  getByFloorId(id:string){
    return this.get<SingleResponseModel<Hallway>>({controller:this._controller,action:"GetByFloorId",queryString:`id=${id}`})
  }
  getAllByFloorId(id:string){
    return this.get<ListResponseModel<Hallway>>({controller:this._controller,action:"GetAllHallwayByFloorId",queryString:`id=${id}`})
  }
  getAllByBranchId(id:string){
    return this.get<ListResponseModel<Hallway>>({controller:this._controller,action:"GetAllHallwayByBranchId",queryString:`id=${id}`})
  }
  getAllHallwayByBlockId(id:string){
    return this.get<ListResponseModel<Hallway>>({controller:this._controller,action:"GetAllHallwayByBlockId",queryString:`id=${id}`})
  }
  getAllWithCount(){
    return this.get<ListResponseModel<BranchCount>>({controller:this._controller,action:"GetAllWithCounts"})
  }
  getAllWithDutyCounts(){
    return this.get<ListResponseModel<HallwayCount>>({controller:this._controller,action:"GetAllWithDutyCounts"})
  }
 
  getByQrCodeImage(id:string): Observable<Blob>{
    return this.get<Blob>({controller:this._controller,action:"GetByQrCodeImage",queryString:`id=${id}`,responseType:"blob"})
  }
}
