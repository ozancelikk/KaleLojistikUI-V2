import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../../models/responseModel';
import { MenuImageDto } from '../../../models/restaurant/menuImageDto';
import { SingleResponseModel } from '../../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MenuImageService extends TtdHttpClientService {

  private _controller = "MenuImage"
  addImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Add" }, image) as Observable<ResponseModel>
    return observable
  }
  async updateImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Update" }, image) as Observable<ResponseModel>
    return observable
  }
  getByMenuId(id: string) {
    return this.get<SingleResponseModel<MenuImageDto>>({ controller: this._controller, action: "GetByMenuId", queryString: `id=${id}` })
  }
}
