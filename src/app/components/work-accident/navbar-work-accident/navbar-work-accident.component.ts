import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-work-accident',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-work-accident.component.html',
  styleUrl: './navbar-work-accident.component.css'
})
export class NavbarWorkAccidentComponent {
  addRole:string="POST.Writing.AddWorkAccidentItem"
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  workAccidentAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
}
