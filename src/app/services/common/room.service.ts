import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Room } from '../../models/room/room';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomDetail } from '../../models/room/roomdetail';
import { RoomCount } from '../../models/room/roomTaskCount';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends TtdHttpClientService {

  private _controller="Room"
  async addRoom(hallway:Room,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Room>({controller:this._controller,action:"Add"},hallway) as Observable<ResponseModel>
    return observable
  }
  async updateRoom(floor:Room,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Room>({controller:this._controller,action:"Update"},floor) as Observable<ResponseModel>
    return observable
  }
  async deleteRoom(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllRoom(){
    return this.get<ListResponseModel<Room>>({controller:this._controller,action:"GetAll"})
  }
  getAllRoomDetails(){
    return this.get<ListResponseModel<RoomDetail>>({controller:this._controller,action:"GetAllRooms"})
  }
  getByRoomId(id:string){
    return this.get<SingleResponseModel<Room>>({controller:this._controller,action:"GetByRoomId",queryString:`id=${id}`})
  }
  getDetailsByRoom(id:string){
    return this.get<SingleResponseModel<RoomDetail>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getAdditionalTask(id:string){
    return this.get<SingleResponseModel<Room>>({controller:this._controller,action:"GetAllByAdditionalTaskRoomId",queryString:`id=${id}`})
  }
  getAllByBlockId(id:string){
    return this.get<ListResponseModel<Room>>({controller:this._controller,action:"GetAllByBlockId",queryString:`id=${id}`})
  }
  getAllByFloorId(id:string){
    return this.get<ListResponseModel<Room>>({controller:this._controller,action:"GetAllByFloorId",queryString:`id=${id}`})
  }

  getAllByHallwayId(id:string){
    return this.get<ListResponseModel<Room>>({controller:this._controller,action:"GetAllHallwayId",queryString:`hallwayId=${id}`})
  }
  getAllByBranchId(id:string){
    return this.get<ListResponseModel<Room>>({controller:this._controller,action:"GetAllByBranchId",queryString:`id=${id}`})
  }
  getByQrCodeImage(id:string): Observable<Blob>{
    return this.get<Blob>({controller:this._controller,action:"GetByQrCodeImage",queryString:`id=${id}`,responseType:"blob"})
  }
  getAllWithDutyCount(){
    return this.get<ListResponseModel<RoomCount>>({controller:this._controller,action:"GetAllWithDutyCount"})
  }
}
