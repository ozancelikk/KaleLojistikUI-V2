import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-technical-error',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-technical-error.component.html',
  styleUrl: './navbar-technical-error.component.css'
})
export class NavbarTechnicalErrorComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addRole:string="POST.Writing.AddTechnicalErrorItem"
}
