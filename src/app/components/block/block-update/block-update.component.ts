import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { CommonModule } from '@angular/common';
import { Branch } from '../../../models/branch/branch';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-block-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './block-update.component.html',
  styleUrl: './block-update.component.css'
})
export class BlockUpdateComponent {
  protected blockUpdateForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  branchs:Branch[];

  @Output() blockEvent = new EventEmitter<any>()
  @Output() blockDetailEvent = new EventEmitter<any>()
  @Input() set blockDetail(value:any){
    if(!value) return
    this.updateBlockForm(value)
  }  
  constructor(private blockComponentService:BlockComponentService,private formBuilder:FormBuilder,
    private branchComponentService:BranchComponentService,private toastrService:ToastrService){  }

    ngOnInit() {
      this.getAllBranch();
    }

  updateBlockForm(value:any){
    this.blockUpdateForm=this.formBuilder.group({
      id: [value.id,Validators.required],
      blockName:[value.blockName,Validators.required],
      branchId:[value.branchId,Validators.required],
    })
  }

  updateBlock(){
    if(this.blockUpdateForm.valid){
      const model=Object.assign({},this.blockUpdateForm.value)
      if(model.blockName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.blockComponentService.updateBlock(model,()=>{
        this.blockEvent.emit(true)
        this.blockDetailEvent.emit(true)
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }

  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  } 
}
