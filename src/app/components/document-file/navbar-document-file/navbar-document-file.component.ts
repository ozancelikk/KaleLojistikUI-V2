import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-document-file',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-document-file.component.html',
  styleUrl: './navbar-document-file.component.css'
})
export class NavbarDocumentFileComponent {
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addDocumnetFileRole: string = "POST.Writing.DocumentFileAddDocumentFileUploadItem";

  documentFileAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
}
