import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-employee-shift',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-employee-shift.component.html',
  styleUrl: './navbar-employee-shift.component.css'
})
export class NavbarEmployeeShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  empShiftRole:string="POST.Writing.AddEmployeeShiftItem"
}
