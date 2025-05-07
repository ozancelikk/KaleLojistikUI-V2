import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../ttdHttpClient/ttd-http-client.service';
import { ResponseModel } from '../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/listResponseModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { BranchCount } from '../../models/branch/branchCount';
import { Block } from '../../models/block/block';

@Injectable({
  providedIn: 'root'
})
export class BlockService extends TtdHttpClientService {
  private _controller="Block"
  async addBlock(block:Block,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Block>({controller:this._controller,action:"Add"},block) as Observable<ResponseModel>
    return observable
  }
  async UpdateBlock(block:Block,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Block>({controller:this._controller,action:"Update"},block) as Observable<ResponseModel>
    return observable
  }
  async deleteBlock(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllBlock(){
    return this.get<ListResponseModel<Block>>({controller:this._controller,action:"GetAll"})
  }
  getAllBranchId(id:string){
    return this.get<ListResponseModel<Block>>({controller:this._controller,action:"GetAllByBranchId",queryString:`branchId=${id}`})
  }
  getByBlockId(id:string){
    return this.get<SingleResponseModel<Block>>({controller:this._controller,action:"GetByBlockId",queryString:`id=${id}`})
  }
  getDetailsByBlockId(id:string){
    return this.get<SingleResponseModel<Block>>({controller:this._controller,action:"GetDetailsByBlockId",queryString:`id=${id}`})
  }
  getByBranchId(id:string){
    return this.get<SingleResponseModel<Block>>({controller:this._controller,action:"GetByBranchId",queryString:`id=${id}`})
  }
  getAllWithCount(){
    return this.get<ListResponseModel<BranchCount>>({controller:this._controller,action:"GetAllWithCounts"})
  }
}
