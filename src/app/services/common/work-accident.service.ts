import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { WorkAccident } from '../../models/workAccident/workAccident';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { Shipment } from '../../models/shipment/shipment';

@Injectable({
  providedIn: 'root'
})
export class WorkAccidentService extends TtdHttpClientService {

  private _controller = "Shipment"
  addWorkAccident(workAccident: WorkAccident) {
    const observable = this.post<ResponseModel | WorkAccident>({ controller: this._controller, action: "Add" }, workAccident) as Observable<ResponseModel>
    return observable
  }
  updateWorkAccident(workAccident: WorkAccident) {
    const observable = this.post<ResponseModel | WorkAccident>({ controller: this._controller, action: "Update" }, workAccident) as Observable<ResponseModel>
    return observable
  }
  deleteWorkAccident(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllDetails() {
    return this.get<ListResponseModel<Shipment>>({ controller: this._controller, action: "GetShipment" })
  }
  getAllWorkAccident() {
    return this.get<ListResponseModel<WorkAccident>>({ controller: this._controller, action: "GetAll" })
  }
  getByDetails(id: string) {
    const observable = this.get<SingleResponseModel<WorkAccident>>({ controller: this._controller, action: "GetByDetails", queryString: `id=${id}` })
    return observable
  }
  getById(id: string) {
    const observable = this.get<SingleResponseModel<WorkAccident>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
    return observable
  }

  downloadWorkAccidentReport(id: string, date: string): Observable<Blob> {
    const observable=this.get<Blob>({controller:this._controller,action:"DownloadWorkAccidentReport?id="+`${id}&date=${date}`,responseType:'blob'})
    return observable
  }
}
