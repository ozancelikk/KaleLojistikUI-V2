import { Component, Input } from '@angular/core';
import { EmployeeDetailsDto } from '../../../models/employee/employeeDetailsDto';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-employee-duty-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-duty-detail.component.html',
  styleUrl: './employee-duty-detail.component.css'
})
export class EmployeeDutyDetailComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  employeeDetail: EmployeeDetailsDto[];
  departments:Department[]
  @Input() set employeeDutyDetail(value: any) {
    if (value == null) {return;}
    this.employeeDetail = value.employeeName;
  }
  constructor(private departmentComponentService:DepartmentComponentService) { }
  ngOnInit() {
    this.getAllDepartment();
  }

  async getAllDepartment(){
    this.departments=(await this.departmentComponentService.getAllDepartment())
  }
  getDepartmentName(departmentId: string) {
    const department = this.departments.find(dep => dep.id === departmentId);
    return department ? department.departmentName : this.lang.noDataFound;
}
}
