import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { Notifications } from '../../models/notification/notifications';
import { PersonDetail } from '../../models/personDetail';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends TtdHttpClientService{

  private _controller = "Notification"
  updateNotification(notification: Notifications) {
    const observable = this.post<ResponseModel | Notifications>({ controller: this._controller, action: "Update" }, notification) as Observable<ResponseModel>
    return observable
  }
  addNotification(notification: Notifications) {
    const observable = this.post<ResponseModel | Notifications>({ controller: this._controller, action: "Add" }, notification) as Observable<ResponseModel>
    return observable
  }
  deleteNotification(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllNotificationDetails() {
    return this.get<ListResponseModel<Notifications>>({ controller: this._controller, action: "GetAllNotificationDetails" })
  }
  getAllPerson() {
    return this.get<ListResponseModel<PersonDetail>>({ controller: this._controller, action: "GetAllPerson" })
  }
  getMailByPersonId(id: string) {
    return this.get<SingleResponseModel<PersonDetail>>({ controller: this._controller, action: "GetMailByPersonId", queryString: `id=${id}` })
  }
  getByNotificationId(id: string) {
    return this.get<SingleResponseModel<Notifications>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
  }
}
