import { Injectable } from '@angular/core';
import { NotificationService } from '../common/notification.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Notifications } from '../../models/notification/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationComponentService {

  constructor(private notificationService:NotificationService,private toastrService:ToastrService) { }

  async deleteNotification(id: string, callBackfunction?: () => void) {
    const observable = await this.notificationService.deleteNotification(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async updateNotification(notification: Notifications, callBackfunction?: () => void) {
    const observable = await this.notificationService.updateNotification(notification)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addNotification(notification: Notifications, callBackfunction?: () => void) {
    const observable = await this.notificationService.addNotification(notification)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }

  async getByNotificationId(id: string) {
    const observable = this.notificationService.getByNotificationId(id)
    return (await firstValueFrom(observable)).data
  }
  async getMailByPersonId(id: string) {
    const observable = this.notificationService.getMailByPersonId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllNotificationDetails() {
    const observable = this.notificationService.getAllNotificationDetails()
    return (await firstValueFrom(observable)).data
  }
  async getAllPerson() {
    const observable = this.notificationService.getAllPerson()
    return (await firstValueFrom(observable)).data
  }
}
