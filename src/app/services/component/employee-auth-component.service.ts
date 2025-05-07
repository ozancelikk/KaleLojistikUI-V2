import { Injectable } from '@angular/core';
import { EmployeeAuthService } from '../common/employee-auth.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { EmployeeForRegister } from '../../models/employee/employeeForRegisterDto';
import { Employee } from '../../models/employee/employee';
import { EmployeeForLoginDto } from '../../models/employee/employeeForLoginDto';
import { EmployeeTokenModel } from '../../models/employee/employeeTokenModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthComponentService {
  constructor(private readonly employeeAuthService:EmployeeAuthService,private toastrService:ToastrService,private router:Router) { }

  async addEmployee(employee:EmployeeForRegister,callBackfunction?:()=>void){
    const observable =await this.employeeAuthService.addEmployee(employee)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async login(user: EmployeeForLoginDto, callBackfunction?: () => void, callBackError?: (err) => void){
    const observable = await this.employeeAuthService.login(user)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("employeeId", response.data.employeeId)
      localStorage.setItem("expiration", response.data.expiration)
      this.router.navigate(["/duty"])
      callBackfunction && callBackfunction()
    }).catch(error => {
      callBackError && callBackError(error)
    })
  }

  async addEmployeesFromExcel(callBackfunction?:()=>void){
    const observable =await this.employeeAuthService.addEmployeesFromExcel()  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async uploadExcel(file:File,callBackfunction?:()=>void){
    const formData: FormData = new FormData();
    formData.append('file', file);
    const observable =await this.employeeAuthService.uploadExcel(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async downloadDefaultEmployeeFile(){
    return await this.employeeAuthService.downloadDefaultEmployeeFile()
  }
}
