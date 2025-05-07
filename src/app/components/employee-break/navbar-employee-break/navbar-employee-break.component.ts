import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-employee-break',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-employee-break.component.html',
  styleUrl: './navbar-employee-break.component.css'
})
export class NavbarEmployeeBreakComponent {
  empBreakRole:string="POST.Writing.AddEmployeeItem";
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
}
