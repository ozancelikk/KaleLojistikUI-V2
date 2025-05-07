import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Duty } from '../../models/duty/duty';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { DutyDetail } from '../../models/duty/dutyDetail';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { AssignmentDuty } from '../../models/duty/assignmentDuty';
import { DutyBatchDto } from '../../models/duty/dutyBatchDto';

@Injectable({
  providedIn: 'root'
})
export class DutyService extends TtdHttpClientService{

  private _controller = "Duty"
  addDuty(duty: Duty) {
    const observable = this.post<ResponseModel | Duty>({ controller: this._controller, action: "Add" }, duty) as Observable<ResponseModel>
    return observable
  } 
  dutyAddBatch(duty: DutyBatchDto) {
    const observable = this.post<ResponseModel | DutyBatchDto>({ controller: this._controller, action: "DutyAddBatch" }, duty) as Observable<ResponseModel>
    return observable
  } 
  assignmentDuty(duty: AssignmentDuty) {
    const observable = this.post<ResponseModel | AssignmentDuty>({ controller: this._controller, action: "DutyAssignment" }, duty) as Observable<ResponseModel>
    return observable
  }  
  updateDuty(duty: Duty, succesCallback?: (response: ResponseModel) => void, errorCallback?: (error: HttpErrorResponse) => void) {
    const observable = this.post<ResponseModel | Duty>({ controller: this._controller, action: "Update" }, duty) as Observable<ResponseModel>
    return observable
  }
  deleteDuty(id: string, succesCallback?: (response: ResponseModel) => void, errorCallback?: (error: HttpErrorResponse) => void) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllDuty() {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAll" })
  }
  getAllDistinct() {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAllDistinct" })
  }


  getBranchStatusCount() {
    return this.get<ListResponseModel<DutyGroupIdCount>>({ controller: this._controller, action: "GetBranchStatusCount" })
  }
  getBlockStatusCount() {
    return this.get<ListResponseModel<DutyGroupIdCount>>({ controller: this._controller, action: "GetBlockStatusCount" })
  }
  getFloorStatusCount() {
    return this.get<ListResponseModel<DutyGroupIdCount>>({ controller: this._controller, action: "GetFloorStatusCount" })
  }
  getHallwayStatusCount() {
    return this.get<ListResponseModel<DutyGroupIdCount>>({ controller: this._controller, action: "GetHallwayStatusCount" })
  }
  getRoomStatusCount() {
    return this.get<ListResponseModel<DutyGroupIdCount>>({ controller: this._controller, action: "GetRoomStatusCount" })
  }


  getAllDutyDetails() {
    return this.get<ListResponseModel<DutyDetail>>({ controller: this._controller, action: "GetDutyDetails" })
  }
  getLatestDuties() {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetLatestDuties" })
  }
  getDutyDetailsForDate() {
    return this.get<ListResponseModel<DutyDetail>>({ controller: this._controller, action: "GetDutyDetailsForDate" })
  }
  getDutyDetailsForDateByBranchId(id: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetDutyDetailsForDateByBranchId", queryString: `id=${id}` })
  }
  getByDuty(id: string) {
    return this.get<SingleResponseModel<Duty>>({ controller: this._controller, action: "GetByDutyId", queryString: `id=${id}` })
  }
  getByDutyDetails(id: string) {
    return this.get<SingleResponseModel<DutyDetail>>({ controller: this._controller, action: "GetDetailsById", queryString: `id=${id}` })
  }
  getByDateEmployeeId(employeeId: string, beforeDate: string, afterDate: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetByDutyId", queryString: `id=${employeeId}&before=${beforeDate}&after=${afterDate}` })
  }
  getByDutyDate(beforeDate: string, afterDate: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAllDutyByDate", queryString: `before=${beforeDate}&after=${afterDate}` })
  }
  getAllByHallwayId(id: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAllByHallwayId", queryString: `id=${id}` })
  }
  getAllByEmployeeId(id: string) {
    return this.get<ListResponseModel<DutyDetail>>({ controller: this._controller, action: "GetAllByEmployeeId", queryString: `id=${id}` })
  }
  getAllByFloorId(id: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAllByFloorId", queryString: `id=${id}` })
  }
  getAllByRoomId(id: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetAllByRoomId", queryString: `id=${id}` })
  }
  getByImagesByDutyId(id: string) {
    return this.get<ListResponseModel<Duty>>({ controller: this._controller, action: "GetByImagesByTaskId", queryString: `id=${id}` })
  }
  getByRoomIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string){
    return this.get<Blob>({controller:this._controller,action:"GetByRoomIdAndFilterDateReportPdf", responseType: 'blob',queryString:`firstDate=${firstDate}&endDate=${endDate}&id=${id}`})
  }
  getByBranchIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string){
    return this.get<Blob>({controller:this._controller,action:"getByBranchIdAndFilterDateReport", responseType: 'blob',queryString:`firstDate=${firstDate}&endDate=${endDate}&id=${id}`})
  }
  getByFloorIdAndFilterDateReportPdf(firstDate:string,endDate:string,id:string){
    return this.get<Blob>({controller:this._controller,action:"GetByFloorIdAndFilterDateReport", responseType: 'blob',queryString:`firstDate=${firstDate}&endDate=${endDate}&id=${id}`})
  }
}

