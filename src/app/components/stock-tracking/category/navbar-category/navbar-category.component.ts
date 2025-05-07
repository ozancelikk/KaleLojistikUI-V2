import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-category',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-category.component.html',
  styleUrl: './navbar-category.component.css'
})
export class NavbarCategoryComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  addRole:string="POST.Writing.AddCategoryItem"
}
