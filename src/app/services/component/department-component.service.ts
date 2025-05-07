import { Injectable } from '@angular/core';
import { DepartmentService } from '../common/department.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../models/department/department';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentComponentService {

  constructor(private departmentService:DepartmentService,private toastrService:ToastrService) { }
  async deleteDepartment(id:string,callBackfunction?:()=>void){
    const observable =await this.departmentService.deleteDepartment(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addDepartment(department:Department,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.departmentService.addDepartment(department)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error)
    })
   
  }
  async updateDepartment(department:Department,callBackfunction?:()=>void){
    const observable =await this.departmentService.updateDepartment(department)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllDepartment(){
    const observable= this.departmentService.getAllDepartment()
    return ( await firstValueFrom(observable)).data
  }
  async getAllDepartmentNoAuthorize(){
    const observable= this.departmentService.getAllDepartmentNoAuthorize()
    return ( await firstValueFrom(observable)).data
  }
  async getByDepartmentId(id:string){
    const observable= this.departmentService.getByDepartmentId(id)
    return ( await firstValueFrom(observable)).data
  }
}
