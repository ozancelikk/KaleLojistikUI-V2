import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-shift',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-shift.component.html',
  styleUrl: './navbar-shift.component.css'
})
export class NavbarShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  addRole:string="POST.Writing.AddShiftItem"
}
