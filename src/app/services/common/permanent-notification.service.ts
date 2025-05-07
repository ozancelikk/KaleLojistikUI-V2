import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { PermanentNotification } from '../../models/permanentNotification/permanentNotification';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PermanentNotificationService extends TtdHttpClientService{

  private _controller='PermanentNotification';
  getAllPermanentNotification(){
    return this.get<ListResponseModel<PermanentNotification>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByPermanentNotification(id: string) {
    return this.get<SingleResponseModel<PermanentNotification>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
  }
  sendNotification(id: string) {
    return this.get<SingleResponseModel<PermanentNotification>>({ controller: this._controller, action: "NotificationTrigger", queryString: `id=${id}` })
  }
}
