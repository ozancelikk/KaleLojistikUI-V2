import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from '../../../models/room/room';
import { Hallway } from '../../../models/hallway/hallway';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeDto } from '../../../models/employee/employeeDto';

@Component({
  selector: 'app-detail-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-employee.component.html',
  styleUrl: './detail-employee.component.css'
})
export class DetailEmployeeComponent {
  employee:EmployeeDto
  rooms:Room[];
  hallways:Hallway[]
  employeeRoomCount:any
  employeeHallwayCount:any
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Input() set employeeDetail(value:any){
    if (!value) return
    this.employee=value

  }
  constructor(private roomComponentService:RoomComponentService,private hallwayComponentService:HallwayComponentService){}


}
