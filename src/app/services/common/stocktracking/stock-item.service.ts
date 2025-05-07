import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../../models/listResponseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem } from '../../../models/stockItem/stockItem';

@Injectable({
  providedIn: 'root'
})
export class StockItemService  extends TtdHttpClientService{

  private _controller="StockItem"

  getAllStockItem(){
    return this.get<ListResponseModel<StockItem>>({controller:this._controller,action:"GetAll"})
  }
  getAllDetails(){
    return this.get<ListResponseModel<StockItem>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByStockItemId(id:string){
    return this.get<SingleResponseModel<StockItem>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  async addStockItem(stockItem:StockItem){
    const observable=this.post<ResponseModel | StockItem>({controller:this._controller,action:"Add"},stockItem) as Observable<ResponseModel>
    return observable
  }
  async updateStockItem(stockItem:StockItem){
    const observable=this.post<ResponseModel | StockItem>({controller:this._controller,action:"Update"},stockItem) as Observable<ResponseModel>
    return observable
  }
  async deleteStockItem(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  dateByStockReportbyEmployee(firstDate:string,endDate:string){
    return this.get<Blob>({controller:this._controller,action:"DateByStockReportbyEmployee", responseType: 'blob',queryString:`firstDate=${firstDate}&endDate=${endDate}`})
  }
}
