import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee/employee';
import { DynamicReportComponentService } from '../../../services/component/dynamic-report-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-add-dynamic-report-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-dynamic-report-employee.component.html',
  styleUrl: './add-dynamic-report-employee.component.css'
})
export class AddDynamicReportEmployeeComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  @Output () dynamicReportEmployeeEmit=new EventEmitter<any>()
  dynamicReportEmployeeForm:FormGroup
  employees:Employee[]
  empId:string
  userId:string
  list:string[]=[]
  id:string

  constructor(private dynamciReportComponentService:DynamicReportComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder,private employeeComponnentService:EmployeeComponentService) {}

  ngOnInit(){
    this.createDnamicReportEmployeeForm()
    this.getEmployee()
    this.getList()
    this.userId=localStorage.getItem("userId")
    this.empId=localStorage.getItem("employeeId")
  }

  createDnamicReportEmployeeForm(){
    this.dynamicReportEmployeeForm=this.formBuilder.group({
      reportFilterDate:["",Validators.required],
      reportFilterEndDate:["",Validators.required],
      reportName:["",Validators.required],
      personId:[""],
      titleName:["",Validators.required],
      entityType:["",Validators.required],
      reportCreatedDate:[""],
      reportPath:[""],
    })
  }
  async getEmployee(){
    this.employees=await this.employeeComponnentService.getAllEmployee()
  }
  changeEmployee(event:any){
    this.id=event.target.value
  }
    

  addDynamicReportEmployee(){
    if(this.dynamicReportEmployeeForm.valid){
      let model=Object.assign({},this.dynamicReportEmployeeForm.value)
      if(model.reportName.trim() ==''||model.titleName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      if (!this.userId) {
        model.personId=this.empId
      }
      model.personId=this.userId
      this.dynamciReportComponentService.dynamicReportEmployeeAdd(model,this.id,()=>{
        this.dynamicReportEmployeeEmit.emit(true)
        this.createDnamicReportEmployeeForm()
      })
    }
  }
  getList(){
    this.list.push("Branch","Block","Floor","Hallway","Room")
  }
}
