import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { DashboardData } from '../../models/dashboard/dashboardData';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends TtdHttpClientService {
  private _controller = "Dashboard"
  getAllDashboardData() {
    return this.get<SingleResponseModel<DashboardData>>({ controller: this._controller, action: "getAllDashboardData" })
  }
  getFiveYearTaskReportPdfExport() {
    return this.get<Blob>({ controller: this._controller, action: "GetFiveYearTaskReportPdfExport", responseType: 'blob' })
  }
  dutyCommentReportPdfExport() {
    return this.get<Blob>({ controller: this._controller, action: "dutyCommentReportPdfExport", responseType: 'blob' })
  }
  getAverageDutyBlockPdfExport() {
    return this.get<Blob>({ controller: this._controller, action: "GetAverageDutyBlockPdfExport", responseType: 'blob' })
  }
  getAverageDutyBranchPdfExport() {
    return this.get<Blob>({ controller: this._controller, action: "GetAverageDutyBranchPdfExport", responseType: 'blob' })
  }
  getAverageDutyByFloorPdfExport() {
    return this.get<Blob>({ controller: this._controller, action: "GetAverageDutyByFloorPdfExport", responseType: 'blob' })
  }
}
