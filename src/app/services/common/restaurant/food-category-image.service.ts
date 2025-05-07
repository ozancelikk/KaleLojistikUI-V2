import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { FoodCategoryImageDto } from '../../../models/restaurant/foodCategoryImageDto';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryImageService extends TtdHttpClientService{

  private _controller = "FoodCategoryImage"
   addImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Add" }, image) as Observable<ResponseModel>
    return observable
  }
  async updateImage(image: any) {
    const observable = this.post<ResponseModel | any>({ controller: this._controller, action: "Update" }, image) as Observable<ResponseModel>
    return observable
  }
  getByCategoryId(id: string) {
    return this.get<SingleResponseModel<FoodCategoryImageDto>>({ controller: this._controller, action: "GetByCategoryId", queryString: `id=${id}` })
  }
}
