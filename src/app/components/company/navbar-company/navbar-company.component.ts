import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-company',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-company.component.html',
  styleUrl: './navbar-company.component.css'
})
export class NavbarCompanyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  addCompanyRole="POST.Writing.AddCompanyItem";
}
