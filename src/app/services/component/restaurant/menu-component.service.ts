import { Injectable } from '@angular/core';
import { MenuService } from '../../common/restaurant/menu.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Menu } from '../../../models/restaurant/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuComponentService {

  constructor(private menuService:MenuService,private toastrService:ToastrService) { }

  async deleteMenu(id:string,callBackfunction?:()=>void){
    const observable =await this.menuService.deleteMenu(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addMenu(menu:Menu,callBackfunction?:()=>void){
    const observable =await this.menuService.addMenu(menu)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateMenu(menu:Menu,callBackfunction?:()=>void){
    const observable =await this.menuService.updateMenu(menu)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllMenu(){
    const observable= this.menuService.getAllMenu()
    return (await firstValueFrom(observable)).data
  }
  async getAllImagesDetails(){
    const observable =this.menuService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getByMenuId(id:string){
    const observable =this.menuService.getByMenuId(id)
    return (await (firstValueFrom(observable))).data
  }
  async getImagesByMenuId(id:string){
    const observable =this.menuService.getImagesByMenuId(id)
    return (await (firstValueFrom(observable))).data
  }
}
