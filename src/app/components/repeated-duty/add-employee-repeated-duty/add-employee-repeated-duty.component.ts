import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RepeatedDutyComponentService } from '../../../services/component/repeated-duty-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';  
import { RepeatedDuty } from '../../../models/duty/repeatedDuty';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { Duty } from '../../../models/duty/duty';
import { EmployeeDetailsDto } from '../../../models/employee/employeeDetailsDto';

@Component({
  selector: 'app-add-employee-repeated-duty',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-employee-repeated-duty.component.html',
  styleUrl: './add-employee-repeated-duty.component.css'
})
export class AddEmployeeRepeatedDutyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  id:string
  empId:string
  employees:EmployeeDetailsDto[]
  repeatedDuty:RepeatedDuty
  duty:Duty
  constructor(private repeatedDutyComponentService:RepeatedDutyComponentService,private employeeComponentService:EmployeeComponentService ,private dutyComponentService:DutyComponentService) { }
  @Output() repeatedDutyAddEmit = new EventEmitter<any>();
  @Input() set repeatedDetails(value:any){
  if(!value) return
  this.getEmployees();
  this.repeatedDuty=value
  this.id=this.repeatedDuty.id
  this.getDuty(this.repeatedDuty.dutyId)
  }
  async addEmployeeToRepeatedDuty(){
    await this.repeatedDutyComponentService.addEmployeeToRepeatedDuty(this.id,this.empId); 
    this.repeatedDutyAddEmit.emit()
  }
  async getEmployees(){
    this.employees=await this.employeeComponentService.getAllEmployeeWithImage()
    console.log(this.employees);
    
  }
  onChangeEmp(event){
    this.empId=event.target.value
  }
  async getDuty(id:string){
    this.duty=await this.dutyComponentService.getByDuty(id)
  }

}
