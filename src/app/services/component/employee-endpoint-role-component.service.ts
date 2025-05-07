import { Injectable } from '@angular/core';
import { EmployeeEndpointRole } from '../../models/employee/employeeEndpointRole';
import { EmployeeEndpointRoleService } from '../common/employee-endpoint-role.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, map } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEndpointRoleComponentService {

  constructor(private employeeEndpointRoleService:EmployeeEndpointRoleService,private toastrService:ToastrService) { }

  async updateEmployeeEndpointRole(employeeEndpointRole:EmployeeEndpointRole,callBackfunction?:()=>void,errorCallBack?:()=>void){
    const observable =await this.employeeEndpointRoleService.updateEmployeeEndpointRole(employeeEndpointRole)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      this.toastrService.error(error.error)
      errorCallBack&&errorCallBack()
    })
  }
  async addAllRoles(callBackfunction?:()=>void){
    const observable =await this.employeeEndpointRoleService.addAllRoles()  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }

  async getByEmployeeEndpointRoleId(id:string){
    const observable =this.employeeEndpointRoleService.getByEmployeeEndpointRoleId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByEndpointEmployeeId(id:string){
    const observable =this.employeeEndpointRoleService.getByEndpointEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }

  async getRole(code: string,employeeId:string): Promise<boolean> {
    return this.employeeEndpointRoleService.getPageRole(employeeId, code)
        .pipe(map((response: ResponseModel) => { return response.success;})).toPromise();
}
  

}
