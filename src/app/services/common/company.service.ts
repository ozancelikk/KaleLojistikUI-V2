import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../../models/company/compant';
import { ResponseModel } from '../../models/responseModel';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends TtdHttpClientService {

  private _controller="Company";
  async addCompany(company:Company){
    const observable=this.post<ResponseModel | Company>({controller:this._controller,action:"Add"},company) as Observable<ResponseModel>
    return observable
  }
  async updateCompany(company:Company){
    const observable=this.post<ResponseModel | Company>({controller:this._controller,action:"Update"},company) as Observable<ResponseModel>
    return observable
  }
  async deleteCompany(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllCompany(){
    return this.get<ListResponseModel<Company>>({controller:this._controller,action:"GetAll"})
  }
  getById(id:string){
    return this.get<SingleResponseModel<Company>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
}
