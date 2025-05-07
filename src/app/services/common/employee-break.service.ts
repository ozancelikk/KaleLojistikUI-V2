import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { EmployeeBreak } from '../../models/employeeBreak/employeeBreak';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBreakService extends TtdHttpClientService {
  private _controller = 'EmployeeBreak';
  async addEmployeeBreak(employeeBreak:EmployeeBreak){
    const observable=this.post<ResponseModel | EmployeeBreak>({controller:this._controller,action:"AdminAdd"},employeeBreak) as Observable<ResponseModel>
    return observable
  }
  async updateEmployeeBreak(employeeBreak:EmployeeBreak){
    const observable=this.post<ResponseModel | EmployeeBreak>({controller:this._controller,action:"Update"},employeeBreak) as Observable<ResponseModel>
    return observable
  }
  async deleteEmployeeBreak(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAll(){
    return this.get<ListResponseModel<EmployeeBreak>>({controller:this._controller,action:"GetAll"})
  }
  getById(id:string){
    return this.get<SingleResponseModel<EmployeeBreak>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getAllDetails(){
    return this.get<ListResponseModel<EmployeeBreak>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByEmployeeId(id:string){
    return this.get<SingleResponseModel<EmployeeBreak>>({controller:this._controller,action:"GetByEmployeeId",queryString:`id=${id}`})
  }
  
}
