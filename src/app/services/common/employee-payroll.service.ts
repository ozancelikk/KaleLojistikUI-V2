import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { EmployeePayroll } from '../../models/employeePayroll/employeePayroll';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { UploadEmployeePayroll } from '../../models/employeePayroll/uploadEmployePayroll';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayrollService extends TtdHttpClientService{

  private _controller = "EmployeePayroll"

  getAllEmployeePayroll() {
    return this.get<ListResponseModel<EmployeePayroll>>({ controller: this._controller, action: "GetAll" })
  }
  getAllEmployeePayrollDetails(){
    return this.get<ListResponseModel<EmployeePayroll>>({controller:this._controller,action:"GetAllEmployeePayrollDetails"})
  }
  GetAllDetailsByEmployeeId(id:string){
    return this.get<ListResponseModel<EmployeePayroll>>({controller:this._controller,action:"GetAllDetailsByEmployeeId",queryString:`id=${id}`})
  }
  getById(id:string){
    return this.get<SingleResponseModel<EmployeePayroll>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }

  downloadEmployeePayroll(id: string): Observable<Blob> {
    const observable=this.get<Blob>({controller:this._controller,action:"DownloadEmployeePayroll/"+`${id}`,responseType:'blob'})
    return observable
  }


  deleteEmployeePayroll(id: string) {
    return this.get<ResponseModel>({ controller: this._controller, action: "Delete",queryString:`id=${id}`})
  }
  async uploadFile(employeePayrollFile:any){
    const observable=this.post<ResponseModel | EmployeePayroll>({controller:this._controller,action:"Add"},employeePayrollFile) as Observable<ResponseModel>
    return observable
  }
}
