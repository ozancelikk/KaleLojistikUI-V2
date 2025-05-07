import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-stock-item',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-stock-item.component.html',
  styleUrl: './navbar-stock-item.component.css'
})
export class NavbarStockItemComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  addRole:string="POST.Writing.AddStockItemItem"
  pdfRole:string="GET.Reading.DateByStockReportbyEmployeeStockItemItem"
}
