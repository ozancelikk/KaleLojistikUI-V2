import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Shift } from '../../models/shiftSystem/shift';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends TtdHttpClientService {

  private readonly _controller="Shift";
  addShift(Shift: Shift) {
    const observable = this.post<ResponseModel | Shift>({ controller: this._controller, action: "Add" }, Shift) as Observable<ResponseModel>
    return observable
  }
  updateShift(Shift: Shift) {
    const observable = this.post<ResponseModel | Shift>({ controller: this._controller, action: "Update" }, Shift) as Observable<ResponseModel>
    return observable
  }
  deleteShift(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllShift() {
    return this.get<ListResponseModel<Shift>>({ controller: this._controller, action: "GetAll" })
  }
  getById(id: string) {
    const observable = this.get<SingleResponseModel<Shift>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
    return observable
  }
}
