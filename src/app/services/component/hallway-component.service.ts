import { Injectable } from '@angular/core';
import { HallwayService } from '../common/hallway/hallway.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Hallway } from '../../models/hallway/hallway';

@Injectable({
  providedIn: 'root'
})
export class HallwayComponentService {

  constructor(private hallwayService:HallwayService,private toastrService:ToastrService) { }

  async getAllHallway(){
    const observable= this.hallwayService.getAllHallway()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAll(callBackfunction?:(response)=>void){
    const observable= this.hallwayService.getAllHallway()
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction(response)
    })
    return await promiseData
  }
  async getAllWithCount(){
    const observable= this.hallwayService.getAllWithCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByFloorId(id:string){
    const observable =this.hallwayService.getByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByHallwayId(id:string){
    const observable =this.hallwayService.getByHallwayId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllHallwayByBlockId(id:string){
    const observable =this.hallwayService.getAllHallwayByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getDetailsByHallwayId(id:string){
    const observable =this.hallwayService.getDetailsByHallwayId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByFloorId(id:string){
    const observable =this.hallwayService.getAllByFloorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByBranchId(id:string){
    const observable =this.hallwayService.getAllByBranchId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllWithDutyCounts(){
    const observable =this.hallwayService.getAllWithDutyCounts()
    return (await firstValueFrom(observable)).data
  }
 
  async getByQrCodeImage(id:string){
    const blob = await firstValueFrom(this.hallwayService.getByQrCodeImage(id));
    const url = window.URL.createObjectURL(blob);
    return  url;
  }

  async deleteHallway(id:string,callBackfunction?:()=>void){
    const observable =await this.hallwayService.deleteHallway(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addHallway(hallway:Hallway,callBackfunction?:()=>void,errorCallBack?:(error)=>void){
    const observable =await this.hallwayService.addHallway(hallway)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(err=>{
      errorCallBack&&errorCallBack(err)
    })
   
  }
  async updateHallway(hallway:Hallway,callBackfunction?:()=>void,errorCallBack?:(error)=>void){
    const observable =await this.hallwayService.updateHallway(hallway)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(err=>{
     errorCallBack&&errorCallBack(err)
    })
  }
}
