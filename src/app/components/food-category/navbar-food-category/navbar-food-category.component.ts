import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-food-category',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-food-category.component.html',
  styleUrl: './navbar-food-category.component.css'
})
export class NavbarFoodCategoryComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  @Output() navbarEvent = new EventEmitter<any>()
  addFoodCategoryRole:string="POST.Writing.AddFoodCategoryItem"
}
