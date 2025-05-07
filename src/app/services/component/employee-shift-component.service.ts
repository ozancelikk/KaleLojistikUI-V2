import { Injectable } from '@angular/core';
import { EmployeeShiftService } from '../common/employee-shift.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { EmployeeShift } from '../../models/employeeShift/employeeShift';
import { EmployeeShiftBulkAdd } from '../../models/employeeShift/employeeShiftBulkAdd';

@Injectable({
  providedIn: 'root'
})
export class EmployeeShiftComponentService {

  constructor(private employeeShiftService:EmployeeShiftService,private toastrService:ToastrService) { }

  async addEmployeeShift(employeeShift:EmployeeShift,callBackfunction?:()=>void){
    const observable =await this.employeeShiftService.addEmployeeShift(employeeShift)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async bulkAddEmployeeShift(employeeShift:EmployeeShiftBulkAdd,callBackfunction?:()=>void){
    const observable =await this.employeeShiftService.bulkAddEmployeeShift(employeeShift)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async deleteEmployeeShift(id:string,callBackfunction?:()=>void){
    const observable =await this.employeeShiftService.deleteEmployeeShift(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async updateEmployeeShift(employeeShift:EmployeeShift,callBackfunction?:()=>void){
    const observable =await this.employeeShiftService.updateEmployeeShift(employeeShift)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }

  async getAllEmployeeShift(){
    const observable= this.employeeShiftService.getAllEmployeeShift()
    const response= await firstValueFrom(observable)
    return response.data
  }

  async getAllEmployeeShiftDetails(){
    const observable= this.employeeShiftService.getAllEmployeeShiftDetails()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByEmployeeShiftId(id:string){
    const observable =this.employeeShiftService.getByEmployeeShiftId(id)
    return (await firstValueFrom(observable)).data
  }
}
