import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DutyDetail } from '../../../models/duty/dutyDetail';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RouterLink } from '@angular/router';
import { Employee } from '../../../models/employee/employee';
import { EmployeeDto } from '../../../models/employee/employeeDto';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-navbar-duty-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar-duty-detail.component.html',
  styleUrl: './navbar-duty-detail.component.css'
})
export class NavbarDutyDetailComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutyDetail:DutyDetail
  employees:EmployeeDto[]
  tasks:Task[]
  @Input() set cleaningDutyDetail(value: any) {
    if (!value) return
    this.dutyDetail=value
    this.employees=value.employeeName
    this.tasks=value.task
  }
}
