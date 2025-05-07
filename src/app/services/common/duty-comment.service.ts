import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { Observable } from 'rxjs';
import { DutyComment } from '../../models/duty/dutyComment';
import { DutyCommentDetails } from '../../models/duty/dutyCommentDetails';

@Injectable({
  providedIn: 'root'
})
export class DutyCommentService extends TtdHttpClientService {

  private _controller = 'DutyComment';
  async addDutyComment(dutyComment:DutyComment){
    const observable=this.post<ResponseModel | DutyComment>({controller:this._controller,action:"DutyCommentAdd"},dutyComment) as Observable<ResponseModel>
    return observable
  }
  async updateDutyComment(dutyComment:DutyCommentDetails){
    const observable=this.post<ResponseModel | DutyCommentDetails>({controller:this._controller,action:"UpdateToDutyCommentsByRate"},dutyComment) as Observable<ResponseModel>
    return observable
  }
  async deleteDutyComment(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllDetails(){
    return this.get<ListResponseModel<DutyComment>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByDutyCommentId(id:string){
    return this.get<SingleResponseModel<DutyComment>>({controller:this._controller,action:"GetByDutyComment",queryString:`id=${id}`})
  }

}
