import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-material-management',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-material-management.component.html',
  styleUrl: './navbar-material-management.component.css'
})
export class NavbarMaterialManagementComponent {
  addRole:string="POST.Writing.AddMaterialManagmentItem"
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
}
