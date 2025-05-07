import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { WorkingHoursSystemQrCode } from '../../models/workingHoursSystemQrCode/workingHoursSystemQrCode';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursSystemQrCodeService extends TtdHttpClientService {

  private _controller = "WorkingHoursSystemQrCode"
  addWorkingHoursSystemQrCode(workingHoursSystemQrCode: WorkingHoursSystemQrCode) {
    const observable = this.post<ResponseModel | WorkingHoursSystemQrCode>({ controller: this._controller, action: "Add" }, workingHoursSystemQrCode) as Observable<ResponseModel>
    return observable
  }
  updateWorkingHoursSystemQrCode(workingHoursSystemQrCode: WorkingHoursSystemQrCode) {
    const observable = this.post<ResponseModel | WorkingHoursSystemQrCode>({ controller: this._controller, action: "Update" }, workingHoursSystemQrCode) as Observable<ResponseModel>
    return observable
  }
  deleteWorkingHoursSystemQrCode(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllWorkingHoursSystemQrCode() {
    return this.get<ListResponseModel<WorkingHoursSystemQrCode>>({ controller: this._controller, action: "GetAll" })
  }
  getById(id: string) {
    const observable = this.get<SingleResponseModel<WorkingHoursSystemQrCode>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
    return observable
  }
}
