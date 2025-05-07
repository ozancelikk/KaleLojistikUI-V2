import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { ToastrService } from 'ngx-toastr';
import { AdditionalTask } from '../../../models/additionalTask/additionalTask';


@Component({
  selector: 'app-update-additional',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FontAwesomeModule,],
  templateUrl: './update-additional.component.html',
  styleUrl: './update-additional.component.css'
})
export class UpdateAdditionalComponent {

  additionalTask:AdditionalTask;
  updateRole="POST.Updating.UpdateAdditionalTaskItem"
  @Output() additionalUpdateEvent = new EventEmitter<any>()
  @Input() set additionalDetail(value:any){
    if(!value) return
    this.additionalTask=value
    this.updateAdditionalTaskForm(value);
  }
 

  protected additionalTaskUpdateForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private additionalTaskComponentService:AdditionalTaskComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService){  }

  updateAdditionalTaskForm(value:any){

    this.additionalTaskUpdateForm=this.formBuilder.group({
      id: [value.id,Validators.required],
      name:[value.name,Validators.required],
      tasks:[value.tasks]
    })
  }
  updateAdditionalTask(){
    if (this.additionalTaskUpdateForm.valid) {
      const model=Object.assign({},this.additionalTaskUpdateForm.value)
      if(model.name.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.additionalTaskComponentService.updateAdditionalTask(model,()=>{
        this.additionalUpdateEvent.emit(true)
    })  
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
    
  }
}
