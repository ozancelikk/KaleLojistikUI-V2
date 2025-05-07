import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { ShiftComponentService } from '../../../services/component/shift-component.service';
import { Shift } from '../../../models/shiftSystem/shift';
import { EmployeeShiftComponentService } from '../../../services/component/employee-shift-component.service';

declare var $:any;

@Component({
  selector: 'app-employee-shift-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './employee-shift-add.component.html',
  styleUrl: './employee-shift-add.component.css'
})
export class EmployeeShiftAddComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  shifts:Shift[]
  empName:string
  addEmployeeShiftItem:string= "POST.Writing.AddEmployeeShiftItem"
  @Output() employeeShiftAddEvent=new EventEmitter<any>();
  @Input() set employeeShiftDetail(value:any){
    if(!value)return
    this.employeeShiftForm(value)
    this.getAllShift()
    this.empName=value.name+" "+value.surname
  }
  employeeShiftAddForm:FormGroup
  constructor(private employeeShiftComponentService:EmployeeShiftComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder, private shiftComponentService:ShiftComponentService) { }

  employeeShiftForm(value:any){
    this.employeeShiftAddForm=this.formBuilder.group({
      employeeId:[value.id],
      shiftId:["",Validators.required],
      shiftDate:[],
      departmentId:[value.departmentId]
    })
  }
  async getAllShift(){
    this.shifts=await this.shiftComponentService.getAllShift()
  }
  shiftAdd(){
    if(this.employeeShiftAddForm.valid){
      let model=Object.assign({},this.employeeShiftAddForm.value)
      this.employeeShiftComponentService.addEmployeeShift(model,()=>{
        this.employeeShiftAddEvent.emit(true)
        $('#employeeShiftAddModal').modal('hide')
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }

}
