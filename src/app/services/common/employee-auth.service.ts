import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Employee } from '../../models/employee/employee';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeForRegister } from '../../models/employee/employeeForRegisterDto';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { EmployeeTokenModel } from '../../models/employee/employeeTokenModel';
import { EmployeeForLoginDto } from '../../models/employee/employeeForLoginDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService extends TtdHttpClientService {
  private _controller="EmployeeAuth"
  async addEmployee(employee:EmployeeForRegister){
    const observable=this.post<ResponseModel | EmployeeForRegister>({controller:this._controller,action:"Register"},employee) as Observable<ResponseModel>
    return observable
  }
  login(login: EmployeeForLoginDto) {
    const observable = this.post<any>({ controller: this._controller, action: "Login" }, login) as Observable<SingleResponseModel<EmployeeTokenModel>>
    return observable
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
  async uploadExcel(file:FormData){
    const observable=this.post<ResponseModel | FormData>({controller:this._controller,action:"UploadEmployee-excel"},file) as Observable<SingleResponseModel<string>>
    return observable
  }
  async addEmployeesFromExcel(succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | any>({controller:this._controller,action:"UploadEmployee-excel"},{}) as Observable<SingleResponseModel<string>>
    return observable
  }
  downloadDefaultEmployeeFile(): void {
    // Dosyayı indireceğiniz URL'yi belirtin
    const downloadUrl = 'assets/file/DefaultEmployeeUploadFile.xlsx';
    
    // Dosyayı indirmek için tarayıcıda yeni bir pencere açın
    window.open(downloadUrl);
  }
}
