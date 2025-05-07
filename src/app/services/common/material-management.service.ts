import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { MaterialManagement } from '../../models/materialManagement/materialManagement';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { ResponseModel } from '../../models/responseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class MaterialManagementService  extends TtdHttpClientService{

  private _controller="MaterialManagement"
  addMaterialManagement(MaterialManagement:MaterialManagement){
    const observable=this.post<ResponseModel | MaterialManagement>({controller:this._controller,action:"Add"},MaterialManagement) as Observable<ResponseModel>
    return observable
  }
  updateMaterialManagement(MaterialManagement:MaterialManagement){
    const observable=this.post<ResponseModel | MaterialManagement>({controller:this._controller,action:"Update"},MaterialManagement) as Observable<ResponseModel>
    return observable
  }
  deleteMaterialManagement(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllMaterialManagement(){
    return this.get<ListResponseModel<MaterialManagement>>({controller:this._controller,action:"GetAll"})
  }
  getById(id:string){
    return this.get<SingleResponseModel<MaterialManagement>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
}
