import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FloorService } from '../common/floor.service';
import { ToastrService } from 'ngx-toastr';
import { Floor } from '../../models/floor/floor';

@Injectable({
  providedIn: 'root'
})
export class FloorComponentService {

  constructor(private floorService:FloorService,private toastrService:ToastrService) { }

  async getAllFloor(){
    const observable= this.floorService.getAllFloor()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAll(callBackfunction?:(response)=>void){
    const observable= this.floorService.getAllFloor()
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction(response)
    })
    return await promiseData
  }
  async getAllWithCount(){
    const observable= this.floorService.getAllWithCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByFloorId(id:string){
    const observable =this.floorService.getByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByBlockId(id:string){
    const observable =this.floorService.getByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getDetailByFloorId(id:string){
    const observable =this.floorService.getDetailByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByBlockId(id:string){
    const observable =this.floorService.getAllByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByBranchId(id:string){
    const observable =this.floorService.getAllBranchId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteFloor(id:string,callBackfunction?:()=>void){
    const observable =await this.floorService.deleteFloor(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addfloor(floor:Floor,callBackfunction?:()=>void){
    const observable =await this.floorService.addFloor(floor)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateFloor(floor:Floor,callBackfunction?:()=>void){
    const observable =await this.floorService.UpdateFloor(floor)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
