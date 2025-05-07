import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { EmployeeShift } from '../../models/employeeShift/employeeShift';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { EmployeeShiftBulkAdd } from '../../models/employeeShift/employeeShiftBulkAdd';

@Injectable({
  providedIn: 'root'
})
export class EmployeeShiftService extends TtdHttpClientService{

  private _controller = 'EmployeeShift';

  async addEmployeeShift(employeeShift:EmployeeShift){
    const observable=this.post<ResponseModel | EmployeeShift>({controller:this._controller,action:"Add"},employeeShift) as Observable<ResponseModel>
    return observable
  }
  async bulkAddEmployeeShift(employeeShift:EmployeeShiftBulkAdd){
    const observable=this.post<ResponseModel | EmployeeShiftBulkAdd>({controller:this._controller,action:"ShiftBulkAdd"},employeeShift) as Observable<ResponseModel>
    return observable
  }
  async updateEmployeeShift(employeeShift:EmployeeShift){
    const observable=this.post<ResponseModel | EmployeeShift>({controller:this._controller,action:"Update"},employeeShift) as Observable<ResponseModel>
    return observable
  }
  async deleteEmployeeShift(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllEmployeeShift(){
    return this.get<ListResponseModel<EmployeeShift>>({controller:this._controller,action:"GetAll"})
  }
  getAllEmployeeShiftDetails(){
    return this.get<ListResponseModel<EmployeeShift>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByEmployeeShiftId(id:string){
    return this.get<SingleResponseModel<EmployeeShift>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }  
}
