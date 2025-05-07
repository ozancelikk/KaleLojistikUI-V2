import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-decrement',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-decrement.component.html',
  styleUrl: './navbar-decrement.component.css'
})
export class NavbarDecrementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addRole:string="POST.Writing.AddDecrementItem"
}
