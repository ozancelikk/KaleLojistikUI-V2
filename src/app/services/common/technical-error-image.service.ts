import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../models/listResponseModel';
import { TechnicalErrorImageDto } from '../../models/technicalError/technicalErrorImageDto';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TechnicalErrorImageService extends TtdHttpClientService{

  private _controller="TechnicalErrorImage";

  getImagesByTechnicalErrorId(id: string) {
    return this.get<ListResponseModel<TechnicalErrorImageDto>>({ controller: this._controller, action: "GetImagesByTechnicalErrorId", queryString: `technicalErrorId=${id}` })
  }
}
