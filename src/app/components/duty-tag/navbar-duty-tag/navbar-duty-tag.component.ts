import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-duty-tag',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-duty-tag.component.html',
  styleUrl: './navbar-duty-tag.component.css'
})
export class NavbarDutyTagComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addDutyTagItem:string= "POST.Writing.AddDutyTagItem"
}
