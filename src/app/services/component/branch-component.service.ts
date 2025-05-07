import { Injectable } from '@angular/core';
import { BranchService } from '../common/branch.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Branch } from '../../models/branch/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchComponentService {
  constructor(private readonly branchService:BranchService,private toastrService:ToastrService) { }

  async getAllBranch(){
    const observable= this.branchService.getAllBranch()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAll(callBackfunction?:(response)=>void){
    const observable= this.branchService.getAllBranch()
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      callBackfunction&&callBackfunction(response)
    })
    return await promiseData
  }
  async getAllWithCount(){
    const observable= this.branchService.getAllWithCount()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByBranchId(id:string){
    const observable =this.branchService.getAllBranchId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteBranch(id:string,callBackfunction?:()=>void){
    const observable =await this.branchService.deleteBranch(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async branchSuserDelete(id:string,callBackfunction?:()=>void){
    const observable =await this.branchService.branchSuserDelete(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addBranch(branch:Branch,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.branchService.addBranch(branch)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
   
  }
  async updateBranch(branch:Branch,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.branchService.UpdateBranch(branch)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
  }
}
