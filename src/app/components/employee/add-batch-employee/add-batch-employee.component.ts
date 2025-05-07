import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeAuthComponentService } from '../../../services/component/employee-auth-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-batch-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-batch-employee.component.html',
  styleUrl: './add-batch-employee.component.css'
})
export class AddBatchEmployeeComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  @Output() employeeEvent = new EventEmitter<any>()
  constructor(private employeeAuthComponentService:EmployeeAuthComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }


  downloadDefaultEmployeeFile() {
    this.employeeAuthComponentService.downloadDefaultEmployeeFile();
  }
  selectedFile: File | null = null;
    onFileSelecteds(event: any) {
      const files = event.target.files;
      if (files.length > 0) {
        this.selectedFile = files[0];
      }
    }

  onSubmit() {
    if (this.selectedFile) {
      this.employeeAuthComponentService.uploadExcel(this.selectedFile,()=>{
        this.employeeEvent.emit(true);
      })
    }
    else {
      this.toastrService.error(this.lang.noDataFound)
    }
  }
  addEmployeesFromExcel() {
    this.employeeAuthComponentService.addEmployeesFromExcel(() => this.employeeEvent.emit(true));
  }

}
