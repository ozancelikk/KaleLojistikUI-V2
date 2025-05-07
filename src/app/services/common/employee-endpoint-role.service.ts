import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { EmployeeEndpointRole } from '../../models/employee/employeeEndpointRole';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEndpointRoleService extends TtdHttpClientService {

  private _controller = 'EmployeeAuthorizationRole';
  private _controller2 = 'ApplicationServices';

  async updateEmployeeEndpointRole(employeeEndpointRole:EmployeeEndpointRole){
    const observable=this.post<ResponseModel | EmployeeEndpointRole>({controller:this._controller,action:"RoleEndpointUpdate"},employeeEndpointRole) as Observable<ResponseModel>
    return observable
  }
  getByEmployeeEndpointRoleId(id:string){
    return this.get<SingleResponseModel<EmployeeEndpointRole>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }

  getByEndpointEmployeeId(id:string){
    return this.get<SingleResponseModel<EmployeeEndpointRole>>({controller:this._controller,action:"GetByEmployeeId",queryString:`id=${id}`})
  }

  getPageRole(employeeId:string,code:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"PageRole",queryString:`employeeId=${employeeId}&code=${code}`}) 
    return observable
  }

  addAllRoles(){
    const observable=this.get<ResponseModel>({controller:this._controller2,action:"GetAll"}) 
    return observable
  }


}
