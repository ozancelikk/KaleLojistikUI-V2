import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';


@Component({
  selector: 'app-navbar-dissolution',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-dissolution.component.html',
  styleUrl: './navbar-dissolution.component.css'
})
export class NavbarDissolutionComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  addDissolutionRole: string = "POST.Writing.DissolutionAddDissolutionItem"
}
