import { Injectable } from '@angular/core';
import { WorkAccidentService } from '../common/work-accident.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { WorkAccident } from '../../models/workAccident/workAccident';

@Injectable({
  providedIn: 'root'
})
export class WorkAccidentComponentService {

  constructor(private workAccidentService:WorkAccidentService,private toastrService:ToastrService) { }

  async deleteWorkAccident(id: string, callBackfunction?: () => void) {
    const observable = await this.workAccidentService.deleteWorkAccident(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async updateWorkAccident(workAccident: WorkAccident, callBackfunction?: () => void) {
    const observable = await this.workAccidentService.updateWorkAccident(workAccident)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addWorkAccident(workAccident: WorkAccident, callBackfunction?: () => void) {
    const observable = await this.workAccidentService.addWorkAccident(workAccident)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async getAllDetails() {
    const observable = this.workAccidentService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getAllWorkAccident() {
    const observable = this.workAccidentService.getAllWorkAccident()
    return (await firstValueFrom(observable)).data
  }
  async getByDetails(id: string) {
    const observable = this.workAccidentService.getByDetails(id)
    return (await firstValueFrom(observable)).data
  }
  async getById(id: string) {
    const observable = this.workAccidentService.getById(id)
    return (await firstValueFrom(observable)).data
  }

  async downloadWorkAccident(id: string, date: string) {
    const blob = await firstValueFrom(this.workAccidentService.downloadWorkAccidentReport(id, date));
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = `work-accident_${date}.pdf`;
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
  
}
