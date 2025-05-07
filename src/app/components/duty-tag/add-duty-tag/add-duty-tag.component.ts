import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DutyTagComponentService } from '../../../services/component/duty-tag-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-duty-tag',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-duty-tag.component.html',
  styleUrl: './add-duty-tag.component.css'
})
export class AddDutyTagComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutyTagForm:FormGroup
  @Output() dutyTagEvent = new EventEmitter<any>()
  constructor(private dutyTagComponentService:DutyTagComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.dutyTagAddForm()
  }

  dutyTagAddForm(){
    this.dutyTagForm=this.formBuilder.group({
      id:[""],
      tagName:["",[Validators.required]]
    })
  }
  addDutyTag(){
    if(this.dutyTagForm.valid){
      let dutyTagModel=Object.assign({},this.dutyTagForm.value)
      if(dutyTagModel.tagName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.dutyTagComponentService.addDutyTag(dutyTagModel,()=>{
        debugger
        this.dutyTagEvent.emit(true)
        this.dutyTagForm.reset()
        this.dutyTagAddForm();
        $('#addDutyTagModal').modal('hide')
        $('#dutyTagModal').modal('toggle')
      })      
    }else{
      this.toastrService.info(this.lang.error,this.lang.anErrorOccurredDuringTheDeleteProcess)
    }
  }

}
