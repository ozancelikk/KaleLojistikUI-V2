import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Observable } from 'rxjs';
import { DepartmentEndpointRole } from '../../models/department/departmentEndpointRole';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentEndpointRoleService extends TtdHttpClientService{

  private _controller = 'DepartmentRole';

  async updateDepartmentEndpointRole(departmentEndpointRole:DepartmentEndpointRole){
    const observable=this.post<ResponseModel | DepartmentEndpointRole>({controller:this._controller,action:"Update"},departmentEndpointRole) as Observable<ResponseModel>
    return observable
  }
  getById(id:string){
    return this.get<SingleResponseModel<DepartmentEndpointRole>>({controller:this._controller,action:"GetByDepertmanId",queryString:`id=${id}`})
  }
}
