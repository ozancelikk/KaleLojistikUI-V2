import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CompanyComponentService } from '../../../services/component/company-component.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  companyUpdateForm:FormGroup
  updateCompanyItem= "POST.Updating.UpdateCompanyItem"
  @Output() companyUpdateEvent= new EventEmitter<any>()
  @Input() set companyDetail(value:any){
    if(!value)return
    this.updateCompanyForm(value)
  }
  constructor(private companyComponentService:CompanyComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder){}
  updateCompanyForm(value:any){
    this.companyUpdateForm=this.formBuilder.group({
      id:[value.id],
      companyName:[value.companyName,Validators.required]
  })}
  updateCompany(){
    if (this.companyUpdateForm.valid) {
      var model=Object.assign({},this.companyUpdateForm.value)
      this.companyComponentService.updateCompany(model,()=>{
        this.companyUpdateEvent.emit(true)
        $('#updateCompanyModal').modal('hide')
        $("#companyModal").modal('show')
      })  
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation);
    }
  }

}
