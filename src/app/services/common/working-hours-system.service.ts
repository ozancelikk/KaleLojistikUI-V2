import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { WorkingHoursSystem } from '../../models/workingHoursSystem/workingHoursSystem';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursSystemService extends TtdHttpClientService{

  private _controller = "WorkingHoursSystem"
  addWorkingHoursSystem(workingHoursSystem: WorkingHoursSystem) {
    const observable = this.post<ResponseModel | WorkingHoursSystem>({ controller: this._controller, action: "Add" }, workingHoursSystem) as Observable<ResponseModel>
    return observable
  }
  updateWorkingHoursSystem(workingHoursSystem: WorkingHoursSystem) {
    const observable = this.post<ResponseModel | WorkingHoursSystem>({ controller: this._controller, action: "Update" }, workingHoursSystem) as Observable<ResponseModel>
    return observable
  }
  deleteWorkingHoursSystem(id: string) {
    const observable = this.get<ResponseModel>({ controller: this._controller, action: "Delete", queryString: `id=${id}` })
    return observable
  }
  getAllDetails() {
    return this.get<ListResponseModel<WorkingHoursSystem>>({ controller: this._controller, action: "GetAllDetails" })
  }
  getAllWorkingHoursSystem() {
    return this.get<ListResponseModel<WorkingHoursSystem>>({ controller: this._controller, action: "GetAll" })
  }
  getById(id: string) {
    const observable = this.get<SingleResponseModel<WorkingHoursSystem>>({ controller: this._controller, action: "GetById", queryString: `id=${id}` })
    return observable
  }
  getEmployeeWorkinghoursPdf(id:string){
    return this.get<Blob>({controller:this._controller,action:"GetEmployeeWorkinghoursPdf", responseType: 'blob',queryString:`id=${id}`})
  }
}
