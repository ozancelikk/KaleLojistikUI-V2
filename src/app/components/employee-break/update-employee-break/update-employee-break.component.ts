import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeBreakComponentService } from '../../../services/component/employee-break-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';

declare var $:any;

@Component({
  selector: 'app-update-employee-break',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './update-employee-break.component.html',
  styleUrl: './update-employee-break.component.css'
})
export class UpdateEmployeeBreakComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  protected employeeBreakUpdateForm: FormGroup
  employees: Employee[];
  updateEmpBreakRole:string="POST.Updating.UpdateEmployeeItem";
  constructor(private employeeBreakComponentService:EmployeeBreakComponentService,private employeeComponentService:EmployeeComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  @Output() employeeBreakEmit=new EventEmitter<any>();
  @Input() set employeeBreakDetail(value: any) {
    if (!value) return
    this.updateEmployeeBreakForm(value)
    this.getEmployees()
  }

  updateEmployeeBreakForm(value:any){
    this.employeeBreakUpdateForm=this.formBuilder.group({
      id:[value.id],
      employeeId:[value.employeeId,Validators.required],
      breakDescription:[value.breakDescription,Validators.required],
      breakTime:[value.breakTime,Validators.required],
      breakDate:[value.breakDate,Validators.required],
      userId:[value.userId],
      status:[value.status]
    })
  }
  updateEmployeeBreak(){
    if(this.employeeBreakUpdateForm.valid){
      let model=Object.assign({},this.employeeBreakUpdateForm.value)
      this.employeeBreakComponentService.updateEmployeeBreak(model,()=>{
        this.employeeBreakEmit.emit(true);
        $('#employeeBreakUpdateModal').modal('hide');
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getEmployees(){
    this.employees=await this.employeeComponentService.getAllEmployee()
  }

}
