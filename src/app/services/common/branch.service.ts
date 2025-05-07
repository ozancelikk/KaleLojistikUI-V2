import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { Branch } from '../../models/branch/branch';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { BranchCount } from '../../models/branch/branchCount';

@Injectable({
  providedIn: 'root'
})
export class BranchService extends TtdHttpClientService {

  private _controller="Branch"
  async addBranch(branch:Branch,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Branch>({controller:this._controller,action:"Add"},branch) as Observable<ResponseModel>
    return observable
  }
  async UpdateBranch(branch:Branch,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Branch>({controller:this._controller,action:"Update"},branch) as Observable<ResponseModel>
    return observable
  }
  async deleteBranch(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  async branchSuserDelete(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"BranchSuserDelete",queryString:`id=${id}`}) 
    return observable
  }
  getAllBranch(){
    return this.get<ListResponseModel<Branch>>({controller:this._controller,action:"GetAll"})
  }
  getAllBranchId(id:string){
    return this.get<SingleResponseModel<Branch>>({controller:this._controller,action:"GetByBranchId",queryString:`id=${id}`})
  }
  getAllWithCount(){
    return this.get<ListResponseModel<BranchCount>>({controller:this._controller,action:"GetAllWithCounts"})
  }
}
