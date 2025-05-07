import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Department } from '../../models/department/department';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends TtdHttpClientService{ 

  private _controller="Department";
  async addDepartment(depatment:Department,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Department>({controller:this._controller,action:"Add"},depatment) as Observable<ResponseModel>
    return observable
  }
  async updateDepartment(depatment:Department,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Department>({controller:this._controller,action:"Update"},depatment) as Observable<ResponseModel>
    return observable
  }
  async deleteDepartment(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllDepartment(){
    return this.get<ListResponseModel<Department>>({controller:this._controller,action:"GetAll"})
  }
  getAllDepartmentNoAuthorize(){
    return this.get<ListResponseModel<Department>>({controller:this._controller,action:"GetAllDepartmentNoAuthorize"})
  }
  getByDepartmentId(id:string){
    return this.get<SingleResponseModel<Department>>({controller:this._controller,action:"GetByDepertmanId",queryString:`id=${id}`})
  }
}
