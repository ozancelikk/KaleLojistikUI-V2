import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-bulk-add-employee-shift',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './bulk-add-employee-shift.component.html',
  styleUrl: './bulk-add-employee-shift.component.css'
})
export class BulkAddEmployeeShiftComponent {
lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  employeeShiftForm:FormGroup;
  shifts:Shift[];
  employees:Employee[]
  @Output() employeeShiftEvent=new EventEmitter<any>();
  constructor(private employeeShiftComponentService:EmployeeShiftComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private shiftComponentService:ShiftComponentService,private employeeComponentService:EmployeeComponentService) { }
  ngOnInit(){
    this.createEmployeeShiftForm();
    this.getAllShift();
    this.getAllemployee();
  }

  createEmployeeShiftForm(){
    this.employeeShiftForm=this.formBuilder.group({
      employeeId:["",Validators.required],
      shiftId:["",Validators.required],
      shiftStartDate:["",Validators.required],
      shiftEndDate:["",Validators.required],
      departmentId:["",]
  })}
  addEmployeeShift(){
    if(this.employeeShiftForm.valid){
      let employeeShiftModel=Object.assign({},this.employeeShiftForm.value)
      this.employeeShiftComponentService.bulkAddEmployeeShift(employeeShiftModel,()=>{
        this.employeeShiftEvent.emit(true);
        $('#bulkAddEmployeeShiftModal').modal('hide');
        this.createEmployeeShiftForm()
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }
  async getAllShift(){
    this.shifts=await this.shiftComponentService.getAllShift();
  }
  async getAllemployee(){
    this.employees=await this.employeeComponentService.getAllEmployee();
  }
}
