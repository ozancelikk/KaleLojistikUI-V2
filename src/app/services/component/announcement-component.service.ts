import { Injectable } from '@angular/core';
import { AnnouncementService } from '../common/announcement.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Announcement } from '../../models/announcement/announcement';

@Injectable()
export class AnnouncementComponentService {

  constructor(private announcementService:AnnouncementService,private toastrService:ToastrService) { }

  async getById(id: string) {
    const observable = this.announcementService.getById(id)
    return (await firstValueFrom(observable)).data
  }
  async getByAnnouncementId(id: string) {
    const observable = this.announcementService.getByAnnouncementId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllByUserId(id: string) {
    const observable = this.announcementService.getAllByUserId(id)
    return (await firstValueFrom(observable)).data
  }
  async getAllAnnouncement() {
    const observable = this.announcementService.getAllAnnouncement()
    return (await firstValueFrom(observable)).data
  }
  async getAllAnnouncementDetails() {
    const observable = this.announcementService.getAllAnnouncementDetails()
    return (await firstValueFrom(observable)).data
  }
  async getDutyDetailsForDate() {
    const observable = this.announcementService.getAnnoucementDetailsForDate()
    return (await firstValueFrom(observable)).data
  }
  async deleteAnnouncement(id: string, callBackfunction?: () => void) {
    const observable = await this.announcementService.deleteAnnouncement(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async updateAnnouncement(announcement: Announcement, callBackfunction?: () => void) {
    const observable = await this.announcementService.updateAnnouncement(announcement)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addAnnouncement(announcement: Announcement, callBackfunction?: () => void) {
    const observable = await this.announcementService.addAnnouncement(announcement)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
}
