import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-navbar-additional-task',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './navbar-additional-task.component.html',
  styleUrl: './navbar-additional-task.component.css'
})
export class NavbarAdditionalTaskComponent {
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addRole="POST.Writing.AddAdditionalTaskItem";
  constructor() { }
  
  userAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
}
