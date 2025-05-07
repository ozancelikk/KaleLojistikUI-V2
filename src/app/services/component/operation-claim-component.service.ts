import { Injectable } from '@angular/core';
import { OperationClaimService } from '../common/operation-claim.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimComponentService {

  constructor(private operationClaimService:OperationClaimService,private toastrService:ToastrService) { }

  async getAllClaims(){
    const observable= this.operationClaimService.getAllClaims()
    return (await firstValueFrom(observable)).data 
  }

  async updateClaim(individualId: string, operationClaimId: string,callBackfunction?:()=>void){
    const formData = new FormData();
    formData.append("individualId",individualId)
    formData.append("operationClaimId",operationClaimId)
    const observable =await this.operationClaimService.updateClaim(formData)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      window.location.reload();
      callBackfunction&&callBackfunction()
    })
  }

}
