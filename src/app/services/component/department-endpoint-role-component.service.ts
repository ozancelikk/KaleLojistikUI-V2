import { Injectable } from '@angular/core';
import { DepartmentEndpointRoleService } from '../common/department-endpoint-role.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentEndpointRole } from '../../models/department/departmentEndpointRole';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentEndpointRoleComponentService {

  constructor(private departmentEndpointRoleService:DepartmentEndpointRoleService,private toastrService:ToastrService) { }
  async updateDepartmentEndpointRole(employeeEndpointRole:DepartmentEndpointRole,callBackfunction?:()=>void,errorCallBack?:()=>void){
    const observable =await this.departmentEndpointRoleService.updateDepartmentEndpointRole(employeeEndpointRole)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      this.toastrService.error(error.error)
      errorCallBack&&errorCallBack()
    })
  }

  async getById(id:string){
    const observable =this.departmentEndpointRoleService.getById(id)
    return (await firstValueFrom(observable)).data
  }
}
