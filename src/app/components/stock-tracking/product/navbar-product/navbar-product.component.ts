import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-product',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-product.component.html',
  styleUrl: './navbar-product.component.css'
})
export class NavbarProductComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  addRole:string="POST.Writing.AddProductItem"
  categoryRole:string="GET.Reading.GetAllCategoryItem"
}
