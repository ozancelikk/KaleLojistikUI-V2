import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-department-navbar',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './department-navbar.component.html',
  styleUrl: './department-navbar.component.css'
})
export class DepartmentNavbarComponent {
  departmentAddRole:string="POST.Writing.AddDepartmentItem"
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));

}
