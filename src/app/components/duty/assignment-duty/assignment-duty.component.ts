import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { ToastrService } from 'ngx-toastr';
import { Duty } from '../../../models/duty/duty';
import { Employee } from '../../../models/employee/employee';
import { DutyDetail } from '../../../models/duty/dutyDetail';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';
import { AssignmentDuty } from '../../../models/duty/assignmentDuty';

@Component({
  selector: 'app-assignment-duty',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './assignment-duty.component.html',
  styleUrl: './assignment-duty.component.css'
})
export class AssignmentDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutys:Duty[];
  employees:Employee[];
  dutyArray:Duty[]=[];
  selectedDutyId: string ;
  branchs:Branch[];
  empId:string
  employeeId:string
  assignmentDuty:AssignmentDuty
  dutyAddForm:FormGroup
  branchId:string

  constructor(private dutyComponentService:DutyComponentService,private employeeComponentService:EmployeeComponentService,private toastrService:ToastrService,private branchComponentService:BranchComponentService,private formBuilder:FormBuilder) { }
  ngOnInit(): void {  
    this.getBranch();
    this.createNewDutyForm();
  } 
  createNewDutyForm() { 
    this.dutyAddForm = this.formBuilder.group({
      duty: ["",Validators.required], 
      employeeId: ["",Validators.required],
    });
  } 
  async addDuty(){
    if (this.selectedDutyId) {
      var duty=await this.dutyComponentService.getByDuty(this.selectedDutyId)
      this.dutyArray.push(duty)
      this.dutys = this.dutys.filter(duty => duty.id!==this.selectedDutyId);
      this.selectedDutyId=null
      
    }  
  }
  removeDuty(index: number) {
    const dutyArray = this.dutyArray;
    if (dutyArray.length > 0) {
      const removedDuty = dutyArray[index];
      dutyArray.splice(index,1);
      this.dutys.push(removedDuty);
    }
  }
  async onChangeBranch(event:any){
    this.employees= await this.employeeComponentService.getAllShiftEmployee(event.target.value) 
    this.branchId=event.target.value
    this.getDuty()
  }
  async getDuty(){
    this.dutys = await this.dutyComponentService.getDutyDetailsForDateByBranchId(this.branchId);
    this.dutys = this.dutys.filter(duty => !duty.employeeId || duty.employeeId.length === 0);
  }
  async onChangeEmployee(event:any){
    this.employeeId=event.target.value 
  }
  async getBranch(){
    this.empId=localStorage.getItem("employeeId")
    if (this.empId!=null) {
      var emp = await this.employeeComponentService.getByEmployeeId(this.empId)
      this.employees= await this.employeeComponentService.getAllShiftEmployee(emp.branchId)
    }
    this.branchs= await this.branchComponentService.getAllBranch()
  }
  addAssignment(){
    this.dutyAddForm.get("employeeId").setValue(this.employeeId)
    this.dutyAddForm.get("duty").setValue(this.dutyArray)
    if (!this.dutyAddForm.valid) {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    var model=Object.assign({}, this.dutyAddForm.value) 
    this.dutyComponentService.assignmentDuty(model,()=>{
      this.dutyArray=[]
      this.assignmentDuty=null  
      this.getDuty();
      this.dutys=[];
    })  
  }
}
