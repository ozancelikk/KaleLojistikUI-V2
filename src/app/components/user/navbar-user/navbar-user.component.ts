import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { AddUserComponent } from '../add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeEndpointRoleComponentService } from '../../../services/component/employee-endpoint-role-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [AddUserComponent,CommonModule,FontAwesomeModule],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.css'
})
export class NavbarUserComponent {
  @Output() navbarEvent = new EventEmitter<any>()
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private employeeEndpointRole:EmployeeEndpointRoleComponentService,private toastrService:ToastrService) { }

  performSearch(event: any) {
    const searchTerm = event.target.value;
    // Add your search logic here based on the entered searchTerm

  }
  userAddedEvent(event:any){
    this.navbarEvent.emit(true)
  }
  async addAllRoles(){
    await this.employeeEndpointRole.addAllRoles(()=>{
      this.toastrService.success(this.lang.successful)
    })
  }
}
