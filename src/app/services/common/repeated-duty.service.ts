import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { RepeatedDuty } from '../../models/duty/repeatedDuty';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { RepeatedDutyAddBatch } from '../../models/duty/repeatedDutyAddBatch';

@Injectable({
  providedIn: 'root'
})
export class RepeatedDutyService extends TtdHttpClientService{

  private _controller="RepeatedDuty"


  addRepeatedDuty(repeated: RepeatedDuty) {
    const observable = this.post<ResponseModel | RepeatedDuty>({ controller: this._controller, action: "Add" }, repeated) as Observable<ResponseModel>
    return observable
  }
  repeatedDutyBatchAdd(repeated: RepeatedDutyAddBatch) {
    const observable = this.post<ResponseModel | RepeatedDutyAddBatch>({ controller: this._controller, action: "RepeatedDutyBatchAdd" }, repeated) as Observable<ResponseModel>
    return observable
  }
  updateRepeatedDuty(repeated: RepeatedDuty,) {
    const observable = this.post<ResponseModel | RepeatedDuty>({ controller: this._controller, action: "Update" }, repeated) as Observable<ResponseModel>
    return observable
  }
  deleteRepeatedDuty(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllRepeatedDuty() {
    return this.get<ListResponseModel<RepeatedDuty>>({ controller: this._controller, action: "GetAll" })
  }
  getAllRepeatedDutyDetails() {
    return this.get<ListResponseModel<RepeatedDuty>>({ controller: this._controller, action: "GetAllDetails" })
  }

  getByRepeatedDuty(id: string) {
    return this.get<SingleResponseModel<RepeatedDuty>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
  }
  addEmployeeToRepeatedDuty(dutyId: string,empId:string) {
    return this.get<SingleResponseModel<RepeatedDuty>>({ controller: this._controller, action: "AddEmployeeToRepeatedDuty", queryString: `dutyId=${dutyId}&empId=${empId}` })
  }

  getBySelectedIdActive(idList: string[]) {
    const observable=this.post<ResponseModel | any>({ controller: this._controller, action: "GetAllByIdStatusActive"},idList ) as Observable<ResponseModel>
    return observable;
  }
  getBySelectedIdPassive(idList: string[]) {
    const observable=this.post<ResponseModel | any>({ controller: this._controller, action: "GetAllByIdStatusPassive"},idList ) as Observable<ResponseModel>
    return observable;
  }
}
