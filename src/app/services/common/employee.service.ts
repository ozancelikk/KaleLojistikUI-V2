import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee/employee';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { EmployeeDto } from '../../models/employee/employeeDto';
import { EmployeeDetailsDto } from '../../models/employee/employeeDetailsDto';
import { ChangePassword } from '../../models/changePassword';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends TtdHttpClientService{

  private _controller="Employee"
  async updateEmployee(employee:Employee,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Employee>({controller:this._controller,action:"Update"},employee) as Observable<ResponseModel>
    return observable
  }
  async deleteEmployee(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllEmployee(){
    return this.get<ListResponseModel<Employee>>({controller:this._controller,action:"GetAll"})
  }

  getAllEmployeeWithImage(){
    return this.get<ListResponseModel<EmployeeDetailsDto>>({controller:this._controller,action:"GetAllWithImages"})
  }
  getByEmployeeId(id:string){
    return this.get<SingleResponseModel<EmployeeDto>>({controller:this._controller,action:"GetByEmployee",queryString:`id=${id}`})
  }
  getByMail(mail:string){
    return this.get<SingleResponseModel<Employee>>({controller:this._controller,action:"GetByMail",queryString:`mail=${mail}`})
  }
  changePassword(changePassword:ChangePassword){
    const observable=this.post<ResponseModel | ChangePassword>({controller:this._controller,action:"ChangePassword"},changePassword) as Observable<ResponseModel>
    return observable
  }
  getImagesByEmployeeId(id:string){
    return this.get<SingleResponseModel<EmployeeDetailsDto>>({controller:this._controller,action:"GetImagesByEmployeeId",queryString:`id=${id}`})
  }  
  getAllShiftEmployee(id:string){
    return this.get<ListResponseModel<Employee>>({controller:this._controller,action:"GetAllShiftEmployee",queryString:`id=${id}`})
  } 
}

