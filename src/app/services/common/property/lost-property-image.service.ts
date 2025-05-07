import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ResponseModel } from '../../../models/responseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { LostPropertyImageDto } from '../../../models/lostPropertys/lostPropertyImageDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostPropertyImageService extends TtdHttpClientService{

  private _controller = 'LostPropertyImage';
  addImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Add" }, image) as Observable<ResponseModel>
    return observable
  }
  async updateImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Update" }, image) as Observable<ResponseModel>
    return observable
  }
  getByPropertyId(id: string) {
    return this.get<SingleResponseModel<LostPropertyImageDto>>({ controller: this._controller, action: "GetByPropertyId", queryString: `id=${id}` })
  }
}
