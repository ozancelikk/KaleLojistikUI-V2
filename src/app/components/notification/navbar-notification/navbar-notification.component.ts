import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-notification',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-notification.component.html',
  styleUrl: './navbar-notification.component.css'
})
export class NavbarNotificationComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addRole:string="POST.Writing.AddNotificationItem"
}
