import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../../models/listResponseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../../models/product/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService  extends TtdHttpClientService{

  private _controller="Product"

  getAllProduct(){
    return this.get<ListResponseModel<Product>>({controller:this._controller,action:"GetAll"})
  }
  getAllProductDetails(){
    return this.get<ListResponseModel<Product>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByProductId(id:string){
    return this.get<SingleResponseModel<Product>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  async addProduct(product:Product){
    const observable=this.post<ResponseModel | Product>({controller:this._controller,action:"Add"},product) as Observable<ResponseModel>
    return observable
  }
  async updateProduct(product:Product){
    const observable=this.post<ResponseModel | Product>({controller:this._controller,action:"Update"},product) as Observable<ResponseModel>
    return observable
  }
  async deleteProduct(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
}
