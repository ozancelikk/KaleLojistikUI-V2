import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css'
})
export class NavbarMenuComponent {
  addRole:string="POST.Writing.AddMenuItem"
  lang:ILanguage=Languages.lngs.get(localStorage.getItem('lng'))
  @Output() navbarEvent = new EventEmitter<any>()

}
