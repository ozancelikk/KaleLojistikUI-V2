import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-duty',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-duty.component.html',
  styleUrl: './navbar-duty.component.css'
})
export class NavbarDutyComponent {
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addDutyRole: string = "POST.Writing.AddDutyItem";
  addDutyTagItem:string= "GET.Reading.GetAllDutyTagItem" 
  getByRoomIdAndFilterDateReportPdfDutyItem:string= "GET.Reading.GetByRoomIdAndFilterDateReportPdfDutyItem"

  userAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
}
