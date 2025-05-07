import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { DynamicReport } from '../../models/dynamicReport/dynamicReport';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DynamicReportService extends TtdHttpClientService{

  private _controller="DynamicReport"
  async addDynamicReport(dynamicReport:DynamicReport){
    const observable=this.post<ResponseModel | DynamicReport>({controller:this._controller,action:"Add"},dynamicReport) as Observable<ResponseModel>
    return observable
  }
  async dynamicReportAreaAdd(dynamicReport:DynamicReport,areaId:string){
    const observable=this.post<ResponseModel | DynamicReport>({controller:this._controller,action:"DynamicReportAreaAdd",queryString:`areaId=${areaId}`},dynamicReport) as Observable<ResponseModel>
    return observable
  }
  async dynamicReportEmployeeAdd(dynamicReport:DynamicReport,employeeId:string){
    const observable=this.post<ResponseModel | DynamicReport>({controller:this._controller,action:"dynamicReportEmployeeAdd",queryString:`employeeId=${employeeId}`},dynamicReport) as Observable<ResponseModel>
    return observable
  }
  async updateDynamicReport(dynamicReport:DynamicReport){
    const observable=this.post<ResponseModel | DynamicReport>({controller:this._controller,action:"Update"},dynamicReport) as Observable<ResponseModel>
    return observable
  }
  async deleteDynamicReport(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllDynamicReport(){
    return this.get<ListResponseModel<DynamicReport>>({controller:this._controller,action:"GetAll"})
  }
  getAllDynamicReportDetails(){
    return this.get<ListResponseModel<DynamicReport>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByDynamicReportId(id:string){
    return this.get<SingleResponseModel<DynamicReport>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  downloadDocumentById(id:string){
    return this.get<Blob>({controller:this._controller,action:"DownloadDocumentById", responseType: 'blob',queryString:`documentId=${id}`})
  }
}
