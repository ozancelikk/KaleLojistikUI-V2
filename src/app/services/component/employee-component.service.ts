import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EmployeeService } from '../common/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../models/employee/employee';
import { ChangePassword } from '../../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class EmployeeComponentService {
  constructor(private readonly employeeService:EmployeeService,private toastrService:ToastrService) { }

  async getAllEmployee(){
    const observable= this.employeeService.getAllEmployee()
    const response= await firstValueFrom(observable)
    return response.data
  }

  async getAllEmployeeWithImage(){
    const observable= this.employeeService.getAllEmployeeWithImage()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByEmployeeId(id:string){
    const observable =this.employeeService.getByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  getByEmployee(id:string){
    const observable =this.employeeService.getByEmployeeId(id)
    return observable
  }
  async getByMail(mail:string){
    const observable =this.employeeService.getByMail(mail)
    return (await firstValueFrom(observable)).data
  }
  async getImagesByEmployeeId(id:string){
    const observable =this.employeeService.getImagesByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  getImagesByEmployeesId(id:string){
    const observable =this.employeeService.getImagesByEmployeeId(id)
    return observable
  }
  async getAllShiftEmployee(id:string){
    const observable =this.employeeService.getAllShiftEmployee(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteEmployee(id:string,callBackfunction?:()=>void){
    const observable =await this.employeeService.deleteEmployee(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async updateEmployee(employee:Employee,callBackfunction?:()=>void){
    const observable =await this.employeeService.updateEmployee(employee)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async changePassword(changePassword: ChangePassword, callBackfunction?: () => void) {
    const observable = await this.employeeService.changePassword(changePassword)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
}
