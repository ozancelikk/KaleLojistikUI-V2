import { Injectable } from '@angular/core';
import { EmployeePayrollService } from '../common/employee-payroll.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { EmployeePayroll } from '../../models/employeePayroll/employeePayroll';
import { UploadEmployeePayroll } from '../../models/employeePayroll/uploadEmployePayroll';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayrollComponentService {

  constructor(private employeePayrollservice:EmployeePayrollService,private toastrService:ToastrService) { }
  async getAllEmployeePayroll() {
    const observable = this.employeePayrollservice.getAllEmployeePayroll()
    return (await firstValueFrom(observable)).data
  }
  async getAllEmployeePayrollDetails() {
    const observable = this.employeePayrollservice.getAllEmployeePayrollDetails()
    return (await firstValueFrom(observable)).data
  }
  async GetAllDetailsByEmployeeId(id:string) {
    const observable = this.employeePayrollservice.GetAllDetailsByEmployeeId(id)
    return (await firstValueFrom(observable)).data
  }
  async getById(id:string) {
    const observable = this.employeePayrollservice.getById(id)
    return (await firstValueFrom(observable)).data
  }

  async downloadEmployeePayroll(documentId: string,documentName:string,callBackfunction?:()=>void) {
    const blob = await firstValueFrom(this.employeePayrollservice.downloadEmployeePayroll(documentId));
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = `${documentName}.pdf`;
    anchor.href = url;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
  async deleteEmployeePayroll(id: string, callBackfunction?: () => void) {
    const observable = await this.employeePayrollservice.deleteEmployeePayroll(id)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    }).catch(error => {
      this.toastrService.error(error.error)
    })
  }
  async uploadFile(employeePayroll:UploadEmployeePayroll,callBackfunction?: () => void) {
    const formData = new FormData();
    formData.append('employeeId', employeePayroll.employeeId);
    formData.append('documentName', employeePayroll.documentName);
    formData.append('description', employeePayroll.description);
    formData.append('date', "2021-10-10");
    formData.append('File', employeePayroll.documentPath, employeePayroll.documentPath.name);
    const observable = await this.employeePayrollservice.uploadFile(formData)
    const promiseData = firstValueFrom(observable)
    promiseData.then(response => {
      this.toastrService.success(response.message)
      callBackfunction && callBackfunction()
    })
  }
}
