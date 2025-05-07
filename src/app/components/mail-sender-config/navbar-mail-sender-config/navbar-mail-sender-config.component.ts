import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-navbar-mail-sender-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-mail-sender-config.component.html',
  styleUrl: './navbar-mail-sender-config.component.css'
})
export class NavbarMailSenderConfigComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))

}
