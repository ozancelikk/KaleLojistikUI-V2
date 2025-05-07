import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dissolution } from '../../models/dissolution/dissolution';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DissolutionService extends TtdHttpClientService {

  private _controller = 'Dissolution';
  async addDissolution(dissolution:Dissolution){
    const observable=this.post<ResponseModel | Dissolution>({controller:this._controller,action:"DissolutionAdd"},dissolution) as Observable<ResponseModel>
    return observable
  }
  async updateDissolution(dissolution:Dissolution){
    const observable=this.post<ResponseModel | Dissolution>({controller:this._controller,action:"DissolutionUpdate"},dissolution) as Observable<ResponseModel>
    return observable
  }
  async deleteDissolution(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"DissolutionDelete",queryString:`id=${id}`}) 
    return observable
  }
  getAllDissolution(){
    return this.get<ListResponseModel<Dissolution>>({controller:this._controller,action:"GetAllDissolution"})
  }
  getAllDetails(){
    return this.get<ListResponseModel<Dissolution>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByDissolutionId(id:string){
    return this.get<SingleResponseModel<Dissolution>>({controller:this._controller,action:"GetByDissolution",queryString:`id=${id}`})
  }

}
