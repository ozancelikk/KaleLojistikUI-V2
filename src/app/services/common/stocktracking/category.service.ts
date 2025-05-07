import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { ListResponseModel } from '../../../models/listResponseModel';
import { Category } from '../../../models/category/category';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends TtdHttpClientService{

  private _controller="Category"

  getAllCategory(){
    return this.get<ListResponseModel<Category>>({controller:this._controller,action:"GetAll"})
  }
  getByCategoryId(id:string){
    return this.get<SingleResponseModel<Category>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  async addCategory(category:Category){
    const observable=this.post<ResponseModel | Category>({controller:this._controller,action:"Add"},category) as Observable<ResponseModel>
    return observable
  }
  async updateCategory(category:Category){
    const observable=this.post<ResponseModel | Category>({controller:this._controller,action:"Update"},category) as Observable<ResponseModel>
    return observable
  }
  async deleteCategory(id:string){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
}
