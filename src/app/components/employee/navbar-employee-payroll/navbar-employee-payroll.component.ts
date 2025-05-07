import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-employee-payroll',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-employee-payroll.component.html',
  styleUrl: './navbar-employee-payroll.component.css'
})
export class NavbarEmployeePayrollComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  employeePayrollGetAllEmployeePayrollItem:string= "GET.Reading.EmployeePayrollGetAllEmployeePayrollItem"
}
