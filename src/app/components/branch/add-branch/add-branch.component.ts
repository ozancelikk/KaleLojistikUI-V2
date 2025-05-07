import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyComponentService } from '../../../services/component/company-component.service';
import { Company } from '../../../models/company/compant';

@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent {
  companies:Company[]
  @Output() branchEvent = new EventEmitter<any>()
  @Output() branchCountEvent = new EventEmitter<any>()
  protected branchAddForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private branchComponentService:BranchComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private companyComponentService:CompanyComponentService){
    this.createNewBranchForm()
    this.getAllCompanies()
  }

  createNewBranchForm(){
    this.branchAddForm=this.formBuilder.group({
      branchName:["",Validators.required],
      companyId:["",Validators.required]
    })
  }

  addBranch(){
    if (this.branchAddForm.valid) {
      const model=Object.assign({},this.branchAddForm.value)
      if(model.branchName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.branchComponentService.addBranch(model,()=>{
        this.branchEvent.emit(true)
        this.branchCountEvent.emit(true);
        this.createNewBranchForm()
      })
    }else{
      this.toastrService.error(this.lang.pleaseFillİnformation,this.lang.error)
    }
    
  }
  async getAllCompanies(){
    this.companies=await this.companyComponentService.getAllCompany()
  }

}
