import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { PermanentNotification } from '../../models/permanentNotification/permanentNotification';
import { PermanentNotificationService } from '../common/permanent-notification.service';

@Injectable({
  providedIn: 'root'
})
export class PermanentNotificationComponentService {

  constructor(private permanentNotificationService:PermanentNotificationService,private toastrService:ToastrService) { }

  async getAllPermanentNotification(){
    const observable= this.permanentNotificationService.getAllPermanentNotification()
    return  (await firstValueFrom(observable)).data
  }
  async getByPermanentNotificationId(id:string){
    const observable =this.permanentNotificationService.getByPermanentNotification(id)
    return (await firstValueFrom(observable)).data
  }
  async sendNotification(id: string, callBackfunction?: () => void) {
    const observable = await this.permanentNotificationService.sendNotification(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
}
