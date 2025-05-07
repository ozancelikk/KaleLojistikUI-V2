import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { CommonModule } from '@angular/common';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Branch } from '../../../models/branch/branch';
import { BranchComponentService } from '../../../services/component/branch-component.service';


@Component({
  selector: 'app-block-add',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ToastrComponentlessModule],
  templateUrl: './block-add.component.html',
  styleUrl: './block-add.component.css'
})
export class BlockAddComponent {
  @Output() blockEvent = new EventEmitter<any>()
  @Output() blockDetailEvent = new EventEmitter<any>()
  protected blockAddForm:FormGroup

  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  branchs:Branch[];

  constructor(private blockComponentService:BlockComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private branchComponentService:BranchComponentService){
    this.createNewBlockForm()
  }

  ngOnInit(): void {
    this.getAllBranch();
  }

  createNewBlockForm(){
    this.blockAddForm=this.formBuilder.group({
      blockName:["",Validators.required],
      branchId:["",Validators.required],
    })
  }
  addBlock(){
    if (this.blockAddForm.valid) {
      const model = Object.assign({}, this.blockAddForm.value);
      if(model.blockName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.blockComponentService.addBlock(model, () => {
        this.blockEvent.emit(true);
        this.blockDetailEvent.emit(true)
        this.createNewBlockForm();
      });
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error);
    }
  }
  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  } 
}
