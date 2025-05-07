import { Injectable } from '@angular/core';
import { WorkingHoursSystemQrCodeService } from '../common/working-hours-system-qr-code.service';
import { ToastrService } from 'ngx-toastr';
import { WorkingHoursSystemQrCode } from '../../models/workingHoursSystemQrCode/workingHoursSystemQrCode';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursSystemQrCodeComponentService {

  constructor(private workingHoursSystemQrCodeService:WorkingHoursSystemQrCodeService,private toastrService:ToastrService) { }
  async deleteWorkingHoursSystemQrCode(id: string, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemQrCodeService.deleteWorkingHoursSystemQrCode(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async updateWorkingHoursSystemQrCode(workingHoursSystemQrCode: WorkingHoursSystemQrCode, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemQrCodeService.updateWorkingHoursSystemQrCode(workingHoursSystemQrCode)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addWorkingHoursSystemQrCode(workingHoursSystemQrCode: WorkingHoursSystemQrCode, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemQrCodeService.addWorkingHoursSystemQrCode(workingHoursSystemQrCode)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  } 
  async getAllWorkingHoursSystemQrCode() {
    const observable = this.workingHoursSystemQrCodeService.getAllWorkingHoursSystemQrCode()
    return (await firstValueFrom(observable)).data
  }
  async getById(id: string) {
    const observable = this.workingHoursSystemQrCodeService.getById(id)
    return (await firstValueFrom(observable)).data
  }
}
