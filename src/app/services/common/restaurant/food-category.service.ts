import { Injectable } from '@angular/core';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { FoodCategory } from '../../../models/restaurant/foodCategory';
import { ResponseModel } from '../../../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { FoodCategoryImageDetailsDto } from '../../../models/restaurant/foodCategoryImageDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class FoodCategoryService  extends TtdHttpClientService{

  private _controller="FoodCategory";

  async AddFoodCategory(foodCategory:FoodCategory,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | FoodCategory>({controller:this._controller,action:"Add"},foodCategory) as Observable<ResponseModel>
    return observable
  }
  async updateFoodCategory(foodCategory:FoodCategory,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | FoodCategory>({controller:this._controller,action:"Update"},foodCategory) as Observable<ResponseModel>
    return observable
  }
  async deleteFoodCategory(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllFoodCategory(){
    return this.get<ListResponseModel<FoodCategory>>({controller:this._controller,action:"GetAll"})
  }
  getAllImagesDetails(){
    return this.get<ListResponseModel<FoodCategory>>({controller:this._controller,action:"GetAllImages"})
  }
  getByFoodCategoryId(id:string){
    return this.get<SingleResponseModel<FoodCategory>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getImageByFoodCategoryId(id:string){
    return this.get<SingleResponseModel<FoodCategoryImageDetailsDto>>({controller:this._controller,action:"GetImagesByCategoryId",queryString:`id=${id}`})
  }
}
