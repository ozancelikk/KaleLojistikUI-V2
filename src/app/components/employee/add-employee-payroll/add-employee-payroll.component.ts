import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { EmployeePayrollComponentService } from '../../../services/component/employee-payroll-component.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-add-employee-payroll',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-employee-payroll.component.html',
  styleUrl: './add-employee-payroll.component.css'
})
export class AddEmployeePayrollComponent {
  @Output() documentEvent = new EventEmitter<any>()
  @Input() set empIdValue(value:string){
    if(value == null)return
    this.id = value
  }
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  files:File;
  id:string
  documentName:string;
  documentDescription:string;
  constructor(private documentFileComponentService:EmployeePayrollComponentService,private toastrService:ToastrService){ }
  onSubmit() {
    this.documentName = (document.getElementById('documentName') as HTMLInputElement).value;
    this.documentDescription = (document.getElementById('documentDescription') as HTMLInputElement).value;
    
    let model2 = {
      employeeId:this.id,
      documentPath:this.selectedFile,
      documentName:this.documentName,
      description:this.documentDescription,
    }  
    if(model2.documentName.trim() ==''){
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    model2.documentName = model2.documentName.trim()
    this.documentFileComponentService.uploadFile(model2, () => {
      this.documentEvent.emit(true)
      this.documentName = ''; 
      this.selectedFile = null; 
      this.documentDescription = '';
      $('#addPayrollModal').modal('hide')
      $('#employeePayrollModal').modal('toggle')
    })

  }
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
