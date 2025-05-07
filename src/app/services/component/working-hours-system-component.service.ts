import { Injectable } from '@angular/core';
import { WorkingHoursSystemService } from '../common/working-hours-system.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { WorkingHoursSystem } from '../../models/workingHoursSystem/workingHoursSystem';
import { EmployeeService } from '../common/employee.service';

@Injectable({
  providedIn: 'root'
})
export class WorkingHoursSystemComponentService {

  constructor(private workingHoursSystemService:WorkingHoursSystemService,private toastrService:ToastrService,private employeeService:EmployeeService) { }
  async deleteWorkingHoursSystem(id: string, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemService.deleteWorkingHoursSystem(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async updateWorkingHoursSystem(workingHoursSystem: WorkingHoursSystem, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemService.updateWorkingHoursSystem(workingHoursSystem)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async addWorkingHoursSystem(workingHoursSystem: WorkingHoursSystem, callBackfunction?: () => void) {
    const observable = await this.workingHoursSystemService.addWorkingHoursSystem(workingHoursSystem)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
  async getAllDetails() {
    const observable = this.workingHoursSystemService.getAllDetails()
    return (await firstValueFrom(observable)).data
  }
  async getAllWorkingHoursSystem() {
    const observable = this.workingHoursSystemService.getAllWorkingHoursSystem()
    return (await firstValueFrom(observable)).data
  }
  async getById(id: string) {
    const observable = this.workingHoursSystemService.getById(id)
    return (await firstValueFrom(observable)).data
  }
  async getbyEmpId(id:string){
    const observable=this.employeeService.getByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  async getEmployeeWorkinghoursPdf(id:string,callBackfunction?:()=>void){
    var data=(await this.getbyEmpId(id)).name
    const observable= this.workingHoursSystemService.getEmployeeWorkinghoursPdf(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = data+".pdf";
      link.href = downloadURL;
      link.click();
      callBackfunction && callBackfunction()
    })
  }
}
