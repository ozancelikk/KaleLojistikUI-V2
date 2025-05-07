import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-navbar-planned-duty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-planned-duty.component.html',
  styleUrl: './navbar-planned-duty.component.css'
})
export class NavbarPlannedDutyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
}
