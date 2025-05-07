import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-employee-navbar',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,],
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.css'
})
export class EmployeeNavbarComponent {
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addEmployeesFromExcelEmployeeAuthorizationItem:string= "POST.Writing.AddEmployeesFromExcelEmployeeAuthorizationItem" 
  addEmployeeItem:string= "POST.Writing.AddEmployeeItem"
  getAllDepartmentItem:string= "GET.Reading.GetAllDepartmentItem"
  performSearch(event: any) {
    const searchTerm = event.target.value;

  }
  employeeAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
}
