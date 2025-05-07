import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { DocumentFileComponentService } from '../../../services/component/document-file-component.service';
import { FormGroup } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DocumentFile } from '../../../models/documentfile/documentFile';
import { Department } from '../../../models/department/department';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-document-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-document-file.component.html',
  styleUrl: './add-document-file.component.css'
})
export class AddDocumentFileComponent {
  @Output() documentEvent = new EventEmitter<any>()
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  files:File;
  id:string
  documentName:string;
  documentDescription:string;
  departments:Department[]
  @ViewChild('departmentId') departmentId: ElementRef;

  constructor(private documentFileComponentService:DocumentFileComponentService,private departmentComponentService:DepartmentComponentService,private toastrService:ToastrService){ 
    this.getDepartments()
   }
  onSubmit() {
    this.id = localStorage.getItem("userId");
    this.documentName = (document.getElementById('documentName') as HTMLInputElement).value;
    let model2 = {
      id:'',
      personId:this.id,
      documentPath:this.selectedFile,
      documentName:this.documentName,
      departmentId:this.departmentId.nativeElement.value,
    }  
    if(model2.documentName.trim() ==''){
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    model2.documentName = model2.documentName.trim()
    this.documentFileComponentService.uploadFile(model2, () => {
      this.documentEvent.emit(true)
      this.departmentId.nativeElement.value = ''; 
      this.documentName = ''; 
      this.selectedFile = null; 
    })

  }
  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  async getDepartments(){
    this.departments = await this.departmentComponentService.getAllDepartment()
  }
}
