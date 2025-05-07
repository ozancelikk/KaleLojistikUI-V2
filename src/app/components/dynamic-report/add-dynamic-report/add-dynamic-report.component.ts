import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DynamicReportComponentService } from '../../../services/component/dynamic-report-component.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationComponentService } from '../../../services/component/notification-component.service';
import { PersonDetail } from '../../../models/personDetail';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee'
declare var $:any

@Component({
  selector: 'app-add-dynamic-report',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-dynamic-report.component.html',
  styleUrl: './add-dynamic-report.component.css'
})
export class AddDynamicReportComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  @Output() dynamicReportEmit=new EventEmitter<any>()
  report:boolean=false
  dynamicReportForm:FormGroup
  employees:Employee[]
  list:string[]=[]
  userId:string
  empId:string
  constructor(private dynamicReportComponentService:DynamicReportComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private employeeComponentService:EmployeeComponentService) {}
  ngOnInit(){
    this.createNewDynamicReportForm()
    this.getList()
    this.userId=localStorage.getItem("userId")
    this.empId=localStorage.getItem("employeeId")
  }
  
  //#region Add Methods
  createNewDynamicReportForm(){
    this.dynamicReportForm=this.formBuilder.group({
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
  addDynamicReport(){
    this.report=true
    if(this.dynamicReportForm.valid){
      let model=Object.assign({},this.dynamicReportForm.value)
      if(model.reportName.trim() ==''||model.titleName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      if (!this.userId) {
        model.personId=this.empId
      }
      model.personId=this.userId
      this.dynamicReportComponentService.addDynamicReport(model,()=>{
        this.dynamicReportEmit.emit(true)
        this.report=false
        this.createNewDynamicReportForm()
        $("#addDynamicReportModal").modal("hide")
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }
  //#endregion

  //#region  Get Methods
  getList(){
    this.list.push("Branch","Block","Floor","Employee","Hallway","Room")
  }
  //#endregion

}
