import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../../models/listResponseModel';
import { ResponseModel } from '../../../models/responseModel';
import { Menu } from '../../../models/restaurant/menu';
import { SingleResponseModel } from '../../../models/singleResponseModel';
import { TtdHttpClientService } from '../../ttdHttpClient/ttd-http-client.service';
import { MenuImageDetailsDto } from '../../../models/restaurant/menuImageDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class MenuService  extends TtdHttpClientService{

  private _controller="Menu";

  async addMenu(menu:Menu,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Menu>({controller:this._controller,action:"Add"},menu) as Observable<ResponseModel>
    return observable
  }
  async updateMenu(menu:Menu,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.post<ResponseModel | Menu>({controller:this._controller,action:"Update"},menu) as Observable<ResponseModel>
    return observable
  }
  async deleteMenu(id:string,succesCallback?:(response:ResponseModel)=>void,errorCallback?:(error:HttpErrorResponse)=>void){
    const observable=this.get<ResponseModel>({controller:this._controller,action:"Delete",queryString:`id=${id}`}) 
    return observable
  }
  getAllMenu(){
    return this.get<ListResponseModel<Menu>>({controller:this._controller,action:"GetAll"})
  }
  getAllDetails(){
    return this.get<ListResponseModel<MenuImageDetailsDto>>({controller:this._controller,action:"GetAllDetails"})
  }
  getByMenuId(id:string){
    return this.get<SingleResponseModel<Menu>>({controller:this._controller,action:"GetById",queryString:`id=${id}`})
  }
  getImagesByMenuId(id:string){
    return this.get<SingleResponseModel<MenuImageDetailsDto>>({controller:this._controller,action:"GetImagesByMenuId",queryString:`id=${id}`})
  }
}
