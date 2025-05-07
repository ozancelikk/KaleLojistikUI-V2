import { Injectable } from '@angular/core';
import { ShiftService } from '../common/shift.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { Shift } from '../../models/shiftSystem/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftComponentService {

  constructor(private shiftService:ShiftService,private toastrService:ToastrService) { }
  
  async deleteShift(id: string, callBackfunction?: () => void) {
    const observable = await this.shiftService.deleteShift(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async updateShift(shift: Shift, callBackfunction?: () => void) {
    const observable = await this.shiftService.updateShift(shift)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addShift(shift: Shift, callBackfunction?: () => void) {
    const observable = await this.shiftService.addShift(shift)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async getAllShift() {
    const observable = this.shiftService.getAllShift()
    return (await firstValueFrom(observable)).data
  }
  async getById(id: string) {
    const observable = this.shiftService.getById(id)
    return (await firstValueFrom(observable)).data
  }
}
