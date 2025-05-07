import { Injectable } from '@angular/core';
import { RoleEndpointService } from '../common/role-endpoint.service';
import { first, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleEndpointComponentService {

  constructor(private roleEndpointService:RoleEndpointService,private toastrService:ToastrService) { }

  async getAllDetails(callBackfunction?:(data)=>void){
    try {
        var observable = this.roleEndpointService.getAllDetails();
        const data = (await firstValueFrom(observable)).data;
        if (callBackfunction) {
          callBackfunction(data);
        }
        return data;
    } catch (error) {
        return this.toastrService.error(error.error)
    }
}

  async getSelectedRoles(id:string[],callBackfunction?:()=>void){
    const observable =await this.roleEndpointService.getSelectedRoles(id)  
   return observable;
  }
}
