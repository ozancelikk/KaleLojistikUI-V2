import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { EmployeeImageDto } from '../../models/employee/employeeImageDto';
import { ResponseModel } from '../../models/responseModel';
import { EmployeeImage } from '../../models/employee/employeeImage';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeImageService extends TtdHttpClientService {
  private _controller = "EmployeeImage"
  async addImage(image: any, succesCallback?: (response: ResponseModel) => void, errorCallback?: (error: HttpErrorResponse) => void) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Add" }, image) as Observable<ResponseModel>
    return observable
  }
  async updateImage(image: any, succesCallback?: (response: ResponseModel) => void, errorCallback?: (error: HttpErrorResponse) => void) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Update" }, image) as Observable<ResponseModel>
    return observable
  }
  getByImagesByEmployeeId(id: string) {
    return this.get<ListResponseModel<EmployeeImageDto>>({ controller: this._controller, action: "GetByImagesByEmployeeId", queryString: `id=${id}` })
  }
  getImagesByEmployeeId(id: string) {
    return this.get<SingleResponseModel<EmployeeImageDto>>({ controller: this._controller, action: "GetImagesByEmployeeId", queryString: `id=${id}` })
  }
}
