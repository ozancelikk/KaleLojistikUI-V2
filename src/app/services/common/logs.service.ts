import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Logs } from '../../models/logs/logs';
import { ListResponseModel } from '../../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LogsService extends TtdHttpClientService {

  private _controller="LogEntry"

  getAllLogs(){
    return this.get<ListResponseModel<Logs>>({controller:this._controller,action:"GetAll"})
  }
}
