import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Employee } from '../../../models/employee/employee';
import { Shift } from '../../../models/shiftSystem/shift';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { EmployeeShiftComponentService } from '../../../services/component/employee-shift-component.service';
import { ShiftComponentService } from '../../../services/component/shift-component.service';
import { CommonModule } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-update-employee-shift',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './update-employee-shift.component.html',
  styleUrl: './update-employee-shift.component.css'
})
export class UpdateEmployeeShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  employeeShiftUpdateForm:FormGroup;
  shifts:Shift[];
  employees:Employee[]
  empShiftRole:string="POST.Updating.UpdateEmployeeShiftItem"
  @Output() employeeShiftUpdateEvent=new EventEmitter<any>();
  @Input() set employeeShiftDetail(value:any){
    if(!value)return
    this.getAllEmployees()
    this.getShifts()
    this.employeeShiftForm(value)
  }
  constructor(private employeeShiftComponentService:EmployeeShiftComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private shiftComponentService:ShiftComponentService,private employeeComponentService:EmployeeComponentService) { }

  employeeShiftForm(value:any){
    this.employeeShiftUpdateForm=this.formBuilder.group({
      id:[value.id],
      employeeId:[value.employeeId,Validators.required],
      shiftId:[value.shiftId,Validators.required],
      shiftDate:[value.shiftDate,Validators.required],
      departmentId:[value.departmentId]
    })
  }
  async getShifts(){
    this.shifts=await this.shiftComponentService.getAllShift()
  }
  async getAllEmployees(){
    this.employees=await this.employeeComponentService.getAllEmployee()
  }
  updateEmployeeShift(){
    if(this.employeeShiftUpdateForm.valid){
      var model=Object.assign({},this.employeeShiftUpdateForm.value)
      this.employeeShiftComponentService.updateEmployeeShift(model,()=>{
        this.employeeShiftUpdateEvent.emit(true)
        $('#updateEmployeeShiftModal').modal('hide')
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }

}
