import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-supplier',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-supplier.component.html',
  styleUrl: './navbar-supplier.component.css'
})
export class NavbarSupplierComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  addRole:string="POST.Writing.AddSupplierItem"
}
