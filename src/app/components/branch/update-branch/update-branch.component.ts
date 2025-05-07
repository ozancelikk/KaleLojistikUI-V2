import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CompanyComponentService } from '../../../services/component/company-component.service';
import { Company } from '../../../models/company/compant';


@Component({
  selector: 'app-update-branch',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './update-branch.component.html',
  styleUrl: './update-branch.component.css'
})
export class UpdateBranchComponent {
  companies:Company[] 
  updateBranchItem:string= "POST.Updating.UpdateBranchItem"
  @Output() branchEvent = new EventEmitter<any>()
  @Input() set branchDetail(value:any){
    if(!value) return
    this.updateBranchForm(value)
    this.getAllCompanies()
  }
  protected branchUpdateForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private branchComponentService:BranchComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private companyComponentService:CompanyComponentService){  }

  updateBranchForm(value:any){
    this.branchUpdateForm=this.formBuilder.group({
      id: [value.id,Validators.required],
      branchName:[value.branchName,Validators.required],
      companyId:[value.companyId,Validators.required]
    })
  }

  updateBranch(){
    if (this.branchUpdateForm.valid) {
      const model=Object.assign({},this.branchUpdateForm.value)
      if(model.branchName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.branchComponentService.updateBranch(model,()=>{
        this.branchEvent.emit(true)
    })  
    }else{
      this.toastrService.error(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }
  async getAllCompanies(){
    this.companies=await this.companyComponentService.getAllCompany()
  }
}
