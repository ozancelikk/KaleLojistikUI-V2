import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeBreakComponentService } from '../../../services/component/employee-break-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';
declare var $:any;

@Component({
  selector: 'app-add-employee-break',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './add-employee-break.component.html',
  styleUrl: './add-employee-break.component.css'
})
export class AddEmployeeBreakComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  @Output() employeeBreakEmit=new EventEmitter<any>();
  employeeBreakAddForm:FormGroup
  employees:Employee[];

  constructor(private employeeBreakComponentService:EmployeeBreakComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private employeeComponentService:EmployeeComponentService){}

  ngOnInit(){
    this.createEmployeeBreakAddForm();
    this.getEmployees();
  }

  createEmployeeBreakAddForm(){
    this.employeeBreakAddForm=this.formBuilder.group({
      employeeId:["",Validators.required],
      breakDescription:["",Validators.required],
      breakTime:["",Validators.required],
      breakDate:["",Validators.required],
      userId:[""],
      status:[true]
    })
  }
  addEmployeeBreak(){
    if(this.employeeBreakAddForm.valid){
      let model=Object.assign({},this.employeeBreakAddForm.value)
      model.userId=localStorage.getItem("userId")
      console.log(model);
      
      if (model.breakDescription.trim() == '') {
        this.toastrService.info(this.lang.pleaseFillİnformation)
        return
      }
      this.employeeBreakComponentService.addEmployeeBreak(model,()=>{
        this.employeeBreakEmit.emit(true);
        $('#employeeBreakAddModal').modal('hide');
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getEmployees(){
    this.employees=await this.employeeComponentService.getAllEmployee();
  }

}
