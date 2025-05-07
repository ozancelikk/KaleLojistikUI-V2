import { Injectable } from '@angular/core';
import { BlockService } from '../common/block.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Block } from '../../models/block/block';

@Injectable({
  providedIn: 'root'
})
export class BlockComponentService {
  constructor(private blockService:BlockService,private toastrService:ToastrService) { }

  async getAllBlock(){
    const observable= this.blockService.getAllBlock()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAll(callBackfunction?:(response)=>void){
    const observable= this.blockService.getAllBlock()
    const promiseData= firstValueFrom(observable)
    // promiseData.then(response=>{
    //   callBackfunction&&callBackfunction(response)
    // })
    return await promiseData
  }
  async getAllWithCount(){
    const observable= this.blockService.getAllWithCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByBlockId(id:string){
    const observable =this.blockService.getByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getDetailsByBlockId(id:string){
    const observable =this.blockService.getDetailsByBlockId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByBranchId(id:string){
    const observable =this.blockService.getByBranchId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByBranchId(id:string){
    const observable =this.blockService.getAllBranchId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteBlock(id:string,callBackfunction?:()=>void){
    const observable =await this.blockService.deleteBlock(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addBlock(block:Block,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.blockService.addBlock(block)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
   
  }
  async updateBlock(block:Block,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.blockService.UpdateBlock(block)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
  }
}
