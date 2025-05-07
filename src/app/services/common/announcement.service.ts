import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Announcement } from '../../models/announcement/announcement';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnnouncementDto } from '../../models/announcement/announcementDto';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends TtdHttpClientService {

  private _controller = "Announcement"
  updateAnnouncement(Announcement: Announcement) {
    const observable = this.post<ResponseModel | Announcement>({ controller: this._controller, action: "Update" }, Announcement) as Observable<ResponseModel>
    return observable
  }
  addAnnouncement(changePassword: Announcement) {
    const observable = this.post<ResponseModel | Announcement>({ controller: this._controller, action: "Add" }, changePassword) as Observable<ResponseModel>
    return observable
  }
  deleteAnnouncement(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllAnnouncement() {
    return this.get<ListResponseModel<Announcement>>({ controller: this._controller, action: "GetAll" })
  }
  getAllAnnouncementDetails() {
    return this.get<ListResponseModel<AnnouncementDto>>({ controller: this._controller, action: "GetAllDetails" })
  }
  getByAnnouncementId(id: string) {
    return this.get<SingleResponseModel<Announcement>>({ controller: this._controller, action: "GetByAnnoucement", queryString: `id=${id}` })
  }
  getById(id: string) {
    return this.get<SingleResponseModel<AnnouncementDto>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
  }
  getAllByUserId(id: string) {
    return this.get<SingleResponseModel<AnnouncementDto>>({ controller: this._controller, action: "GetAllByUserId", queryString: `id=${id}` })
  }
  getAnnoucementDetailsForDate() {
    return this.get<SingleResponseModel<AnnouncementDto>>({ controller: this._controller, action: "GetAnnoucementDetailsForDate" })
  }
}
