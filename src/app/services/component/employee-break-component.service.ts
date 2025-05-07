import { Injectable } from '@angular/core';
import { EmployeeBreakService } from '../common/employee-break.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { EmployeeBreak } from '../../models/employeeBreak/employeeBreak';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBreakComponentService {

  constructor(private employeeBreakService:EmployeeBreakService,private toastrService:ToastrService) { }

  async deleteEmployeeBreak(id:string,callBackfunction?:()=>void){
    const observable =await this.employeeBreakService.deleteEmployeeBreak(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addEmployeeBreak(employeeBreak:EmployeeBreak,callBackfunction?:()=>void ){
    const observable =await this.employeeBreakService.addEmployeeBreak(employeeBreak)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateEmployeeBreak(employeeBreak:EmployeeBreak,callBackfunction?:()=>void){
    const observable =await this.employeeBreakService.updateEmployeeBreak(employeeBreak)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }

  async getAll(){
    const observable =this.employeeBreakService.getAll()
    return (await firstValueFrom(observable)).data
  }
  async getById(id:string){
    const observable =this.employeeBreakService.getById(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllDetails(){
    const observable =this.employeeBreakService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByEmployeeId(id:string){
    const observable =this.employeeBreakService.getByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  
}
