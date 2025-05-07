import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { TechnicalError } from '../../../models/technicalError/technicalError';
import { TranslateComponentService } from '../../../services/component/translate-component.service';
import { FormsModule } from '@angular/forms';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';
import { EmployeeDto } from '../../../models/employee/employeeDto';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { DepartmentComponentService } from '../../../services/component/department-component.service';

@Component({
  selector: 'app-technical-error-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './technical-error-detail.component.html',
  styleUrl: './technical-error-detail.component.css'
})
export class TechnicalErrorDetailComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  technicalError:TechnicalError
  data:string
  language:string[]=[]
  employee:EmployeeDto
  employeeName:string
  depName:string
  roomName:string
  @Input() set errorDetail(value:any){
    if (!value) {return}
    this.technicalError=value
    this.getEmployee(this.technicalError.employeeId)
    this.getRoom(this.technicalError.roomId)
  }
  constructor(private employeeComponentService:EmployeeComponentService,private roomComponentService:RoomComponentService,private departmentComponentService:DepartmentComponentService) {}

  async getEmployee(id:string){
    this.employee =(await this.employeeComponentService.getByEmployeeId(id))
    this.employeeName=this.employee?.name+" "+this.employee?.surname
  }
  async getRoom(id:string){
    this.roomName =(await this.roomComponentService.getByRoomId(id)).roomName
  }
  async getDepartment(id:string){
    var dep= await this.departmentComponentService.getByDepartmentId(id)
    this.depName=dep.departmentName
  }

}
