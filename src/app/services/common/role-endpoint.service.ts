import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { RoleEndpoint } from '../../models/roleEndpoints/roleEndpoint';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleEndpointService extends TtdHttpClientService{

  private _controller = 'RoleEndpoint';
  getAllDetails() {
    return this.get<ListResponseModel<RoleEndpoint>>({ controller: this._controller, action: "GetAll" })
  }

  getSelectedRoles(idList: string[]): Observable<RoleEndpoint[]> {
    return this.post<RoleEndpoint[] | any>({ controller: this._controller, action: "GetAllSelectRole"}, idList);
  }
}
