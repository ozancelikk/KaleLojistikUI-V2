import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { TechnicalError } from '../../models/technicalError/technicalError';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { TechnicalErrorCustomer } from '../../models/technicalError/technicalErrorCustomer';

@Injectable({
  providedIn: 'root'
})
export class TechnicalErrorService extends TtdHttpClientService{

  private _controller="TechninalError";
  async addTechnicalError(technicalError:TechnicalError){
    const observable=this.post<ResponseModel | TechnicalError>({controller:this._controller,action:"Add"},technicalError) as Observable<ResponseModel>
    return observable
  }
  async addTechnicalErrorCustomer(technicalError:TechnicalErrorCustomer){
    const observable=this.post<ResponseModel | TechnicalErrorCustomer>({controller:this._controller,action:"TechnicalErrorCustomerAdd"},technicalError) as Observable<ResponseModel>
    return observable
  }
  async updateTechnicalError(technicalError:TechnicalError){
    const observable=this.post<ResponseModel | TechnicalError>({controller:this._controller,action:"TechnicalErrorUpdate"},technicalError) as Observable<ResponseModel>
    return observable
  }
  async deleteTechnicalError(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllTechnicalError(){
    return this.get<ListResponseModel<TechnicalError>>({controller:this._controller,action:"GetAll"})
  }
  getDetails(){
    return this.get<ListResponseModel<TechnicalError>>({controller:this._controller,action:"GetDetails"})
  }
  getByTechnicalErrorId(id:string){
    return this.get<SingleResponseModel<TechnicalError>>({controller:this._controller,action:"GetId",queryString:`id=${id}`})
  }
  getAllByDepartmentId(id:string){
    return this.get<ListResponseModel<TechnicalError>>({controller:this._controller,action:"GetAllByDepartmentId",queryString:`id=${id}`})
  }
  getDetailsByRoomId(id:string){
    return this.get<SingleResponseModel<TechnicalError>>({controller:this._controller,action:"GetDetailsByRoomId",queryString:`roomId=${id}`})
  }
  getByEmployeeId(id:string){
    return this.get<SingleResponseModel<TechnicalError>>({controller:this._controller,action:"GetByEmployeeId",queryString:`employeeId=${id}`})
  }
  technicalErrorComplete(id:string){
    return this.get<SingleResponseModel<TechnicalError>>({controller:this._controller,action:"TechnicalErrorComplete",queryString:`id=${id}`})
  }
  getByQrCodeImage(id:string): Observable<Blob>{
    return this.get<Blob>({controller:this._controller,action:"GetByQrCodeImage",queryString:`id=${id}`,responseType:"blob"})
  }
}
