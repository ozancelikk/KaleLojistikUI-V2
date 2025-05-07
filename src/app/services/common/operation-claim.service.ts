import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { OperationClaim } from '../../models/operationClaims/operaitonClaim';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService  extends TtdHttpClientService{

  private _controller="OperationClaim"
  private _controller2="OperationClaimAdmin"

  updateClaim(formData:FormData){
    const observable=this.post<ResponseModel | any>({controller:this._controller2,action:"UpdateClaim"},formData) as Observable<ResponseModel>
    return observable
  }
  getAllClaims(){
    return this.get<ListResponseModel<OperationClaim>>({controller:this._controller,action:"GetAll"})
  }
}
