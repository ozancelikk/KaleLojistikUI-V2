import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-navbar-dynamic-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-dynamic-report.component.html',
  styleUrl: './navbar-dynamic-report.component.css'
})
export class NavbarDynamicReportComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
}
