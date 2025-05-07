import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeShiftComponentService } from '../../../services/component/employee-shift-component.service';
import { ToastrService } from 'ngx-toastr';
import { ShiftComponentService } from '../../../services/component/shift-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Shift } from '../../../models/shiftSystem/shift';
import { Employee } from '../../../models/employee/employee';
declare var $:any;

@Component({
  selector: 'app-add-employee-shift',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-employee-shift.component.html',
  styleUrl: './add-employee-shift.component.css'
})
export class AddEmployeeShiftComponent {
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
      shiftDate:["",Validators.required],
      departmentId:["",]
  })}
  addEmployeeShift(){
    if(this.employeeShiftForm.valid){
      let employeeShiftModel=Object.assign({},this.employeeShiftForm.value)
      this.employeeShiftComponentService.addEmployeeShift(employeeShiftModel,()=>{
        this.employeeShiftEvent.emit(true);
        $('#addEmployeeShiftModal').modal('hide');
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