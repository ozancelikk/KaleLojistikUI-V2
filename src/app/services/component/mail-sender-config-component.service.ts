import { Injectable } from '@angular/core';
import { MailSenderConfigService } from '../common/mail-sender-config.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { MailSenderConfig } from '../../models/mailSenderConfig/mailSenderConfig';

@Injectable({
  providedIn: 'root'
})
export class MailSenderConfigComponentService {

  constructor(private mailSenderConfigService:MailSenderConfigService,private toastrService:ToastrService) { }
  async getAllMailSenderConfig(){
    const observable= this.mailSenderConfigService.getAllMailSenderConfig()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllMailSenderConfigDetails(){
    const observable= this.mailSenderConfigService.getAllMailSenderConfigDetails()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getByMailConfigId(id:string){
    const observable =this.mailSenderConfigService.getByMailConfigId(id)
    return (await firstValueFrom(observable)).data
  }
  async getByDepartmentId(id:string){
    const observable =this.mailSenderConfigService.getByDepartmentId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteMailSenderConfig(id:string,callBackfunction?:()=>void){
    const observable =await this.mailSenderConfigService.deleteMailSenderConfig(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addMailSenderConfig(mailSenderConfig:MailSenderConfig,callBackfunction?:()=>void){
    const observable =await this.mailSenderConfigService.addMailSenderConfig(mailSenderConfig)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
   
  }
  async updateMailSenderConfig(mailSenderConfig:MailSenderConfig,callBackfunction?:()=>void){
    const observable =await this.mailSenderConfigService.updateMailSenderConfig(mailSenderConfig)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
}
