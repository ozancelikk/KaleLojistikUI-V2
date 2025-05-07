import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-lost-property',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-lost-property.component.html',
  styleUrl: './navbar-lost-property.component.css'
})
export class NavbarLostPropertyComponent {
  addRole:string="POST.Writing.AddLostPropertyItem"
  @Output() navbarEvent = new EventEmitter<boolean>();
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
}
