import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CompanyComponentService } from '../../../services/component/company-component.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  companyForm:FormGroup
  @Output() companyEvent= new EventEmitter<any>()
  constructor(private companyComponentService:CompanyComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder){}
  ngOnInit(){
    this.createCompanyform()
  }

  createCompanyform(){
    this.companyForm=this.formBuilder.group({
      companyName:['',Validators.required],
  })}

  addCompany(){
    if (this.companyForm.valid) {
      var model=Object.assign({},this.companyForm.value)
      this.companyComponentService.addCompany(model,()=>{
        this.companyEvent.emit(true)
        $('#addCompanyModal').modal('hide')
        $("#companyModal").modal('show')
        this.createCompanyform();
      })  
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation);
    }
  }


}
