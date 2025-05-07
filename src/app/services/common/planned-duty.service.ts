import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { PlannedDuty } from '../../models/plannedDuty/plannedDuty';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PlannedDutyService extends TtdHttpClientService {
  private _controller = "PlannedDuty"
  addPlannedDuty(repeated: PlannedDuty) {
    const observable = this.post<ResponseModel | PlannedDuty>({ controller: this._controller, action: "Add" }, repeated) as Observable<ResponseModel>
    return observable
  }
  updatePlannedDuty(repeated: PlannedDuty,) {
    const observable = this.post<ResponseModel | PlannedDuty>({ controller: this._controller, action: "Update" }, repeated) as Observable<ResponseModel>
    return observable
  }
  deletePlannedDuty(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllPlannedDuty() {
    return this.get<ListResponseModel<PlannedDuty>>({ controller: this._controller, action: "GetAll" })
  }
  getByPlannedDuty(id: string) {
    return this.get<SingleResponseModel<PlannedDuty>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
  }
}
