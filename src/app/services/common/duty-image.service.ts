import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { DutyImageDto } from '../../models/duty/dutyImageDto';
import { ListResponseModel } from '../../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DutyImageService extends TtdHttpClientService{

  private _controller="DutyImageBefore";
  private _controller2="DutyImageAfter";

  getBeforeImagesByDutyId(id: string) {
    return this.get<ListResponseModel<DutyImageDto>>({ controller: this._controller, action: "GetByImagesByDutyId", queryString: `taskId=${id}` })
  }
  getAfterImagesByDutyId(id: string) {
    return this.get<SingleResponseModel<DutyImageDto>>({ controller: this._controller2, action: "GetImagesByDutyId", queryString: `id=${id}` })
  }
}
