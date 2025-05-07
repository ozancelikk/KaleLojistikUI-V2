import { Injectable } from '@angular/core';
import { CompanyService } from '../common/company.service';
import { ToastrService } from 'ngx-toastr';
import { Company } from '../../models/company/compant';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyComponentService {

  constructor(private companyService:CompanyService,private toastrService:ToastrService) { }
  async addCompany(company:Company,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.companyService.addCompany(company)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateCompany(company:Company,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.companyService.updateCompany(company)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async deleteCompany(id:string,callBackfunction?:()=>void){
    const observable =await this.companyService.deleteCompany(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getAllCompany(){
    const observable= this.companyService.getAllCompany()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getById(id:string){
    const observable =this.companyService.getById(id)
    return (await firstValueFrom(observable)).data
  }
}
