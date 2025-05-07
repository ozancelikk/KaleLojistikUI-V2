import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../models/listResponseModel';
import { ErrorLog } from '../../models/errorLog/errorLog';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService extends TtdHttpClientService {

  private _controller="ErrorLog";
  getAllErrorLog(){
    return this.get<ListResponseModel<ErrorLog>>({controller:this._controller,action:"GetAllDetails"})
  }
}
