import { Injectable } from '@angular/core';
import { RoomService } from '../common/room.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Room } from '../../models/room/room';

@Injectable({
  providedIn: 'root'
})
export class RoomComponentService {

  constructor(private roomService:RoomService,private toastrService:ToastrService) { }

  async getAllRoom(callBackfunction?:(response:any)=>void){
    const observable= this.roomService.getAllRoom()
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction(response)
    })
    return await promiseData
  }
  async getAdditionalTask(id:string){
    const observable= this.roomService.getAdditionalTask(id)
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllRoomDetails(){
    const observable =this.roomService.getAllRoomDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByRoomId(id:string){
    const observable =this.roomService.getByRoomId(id)
    return (await firstValueFrom(observable)).data
  }
  async getDetailsByRoom(id:string){
    const observable =this.roomService.getDetailsByRoom(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllWithDutyCount(){
    const observable =this.roomService.getAllWithDutyCount()
    return (await firstValueFrom(observable)).data
  }
  async getAllByBlockId(id:string){
    const observable =this.roomService.getAllByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByFloorId(id:string){
    const observable =this.roomService.getAllByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
 
  async getByQrCodeImage(id:string){
    const blob = await firstValueFrom(this.roomService.getByQrCodeImage(id));
    const url = window.URL.createObjectURL(blob);
    return  url;
  }
  async getAllByHallwayId(id:string){
    const observable =this.roomService.getAllByHallwayId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByBranchId(id:string){
    const observable =this.roomService.getAllByBranchId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteRoom(id:string,callBackfunction?:()=>void){
    const observable =await this.roomService.deleteRoom(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addRoom(room:Room,callBackfunction?:()=>void){
    const observable =await this.roomService.addRoom(room)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateRoom(room:Room,callBackfunction?:()=>void){
    const observable =await this.roomService.updateRoom(room)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
