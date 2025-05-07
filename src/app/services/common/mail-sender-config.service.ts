import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { MailSenderConfig } from '../../models/mailSenderConfig/mailSenderConfig';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MailSenderConfigService extends TtdHttpClientService {

  private _controller = "MailSenderConfig"
  addMailSenderConfig(mailSenderConfig: MailSenderConfig) {
    const observable = this.post<ResponseModel | MailSenderConfig>({ controller: this._controller, action: "Add" }, mailSenderConfig) as Observable<ResponseModel>
    return observable
  }
  updateMailSenderConfig(mailSenderConfig: MailSenderConfig) {
    const observable = this.post<ResponseModel | MailSenderConfig>({ controller: this._controller, action: "Update" }, mailSenderConfig) as Observable<ResponseModel>
    return observable
  }
  deleteMailSenderConfig(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllMailSenderConfig() {
    return this.get<ListResponseModel<MailSenderConfig>>({ controller: this._controller, action: "GetAll" })
  }
  getAllMailSenderConfigDetails() {
    return this.get<ListResponseModel<MailSenderConfig>>({ controller: this._controller, action: "GetAllDetails" })
  }
  getByMailConfigId(id:string){
    return this.get<SingleResponseModel<MailSenderConfig>>({controller:this._controller,action:"GetByMailConfigId",queryString:`id=${id}`})
  }
  getByDepartmentId(id:string){
    return this.get<SingleResponseModel<MailSenderConfig>>({controller:this._controller,action:"GetByDepartmentId",queryString:`departmentId=${id}`})
  }
}
