import { Injectable } from '@angular/core';
import { TechnicalErrorService } from '../common/technical-error.service';
import { TechnicalError } from '../../models/technicalError/technicalError';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TechnicalErrorCustomer } from '../../models/technicalError/technicalErrorCustomer';

@Injectable({
  providedIn: 'root'
})
export default class TechnicalErrorComponentService {

  constructor(private technicalErrorComponentService:TechnicalErrorService,private toastrService:ToastrService) { }
  async deleteTechnicalError(id:string,callBackfunction?:()=>void){
    const observable =await this.technicalErrorComponentService.deleteTechnicalError(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addTechnicalError(technicalError:TechnicalError,callBackfunction?:()=>void){
    const observable =await this.technicalErrorComponentService.addTechnicalError(technicalError)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addTechnicalErrorCustomer(technicalError:TechnicalErrorCustomer,callBackfunction?:()=>void){
    const observable =await this.technicalErrorComponentService.addTechnicalErrorCustomer(technicalError)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      console.log(response);
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateTechnicalError(technicalError:TechnicalError,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.technicalErrorComponentService.updateTechnicalError(technicalError)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllTechnicalError(){
    const observable= this.technicalErrorComponentService.getAllTechnicalError()
    return  (await firstValueFrom(observable)).data
  }
  async getDetails(){
    const observable= this.technicalErrorComponentService.getDetails()
    return  (await firstValueFrom(observable)).data
  }
  async getByEmployeeId(id:string){
    const observable =this.technicalErrorComponentService.getByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByDepartmentId(id:string){
    const observable =this.technicalErrorComponentService.getAllByDepartmentId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByTechnicalErrorId(id:string){
    const observable =this.technicalErrorComponentService.getByTechnicalErrorId(id)
    return (await firstValueFrom(observable)).data
  }
  async getDetailsByRoomId(id:string){
    const observable =this.technicalErrorComponentService.getDetailsByRoomId(id)
    return (await firstValueFrom(observable)).data
  }
  async technicalErrorComplete(id:string){
    const observable =this.technicalErrorComponentService.technicalErrorComplete(id)
    return (await firstValueFrom(observable)).data
  }
  async getByQrCodeImage(id:string){
    const blob = await firstValueFrom(this.technicalErrorComponentService.getByQrCodeImage(id));
    const url = window.URL.createObjectURL(blob);
    return  url;
  }
}
