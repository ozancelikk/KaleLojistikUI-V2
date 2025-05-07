import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShiftComponentService } from '../../../services/component/shift-component.service';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
declare var $: any;

@Component({
  selector: 'app-add-shift',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-shift.component.html',
  styleUrl: './add-shift.component.css'
})
export class AddShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  shiftAddForm: FormGroup;
  @Output() shiftEmitter = new EventEmitter<any>;
  constructor(private shiftComponentService:ShiftComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService) {
    this.shiftForm()
   }

  shiftForm(){
    this.shiftAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      startTime: ["",Validators.required],
      endTime: ["",Validators.required],
    });
  }

  shiftAdd(){
    if(this.shiftAddForm.valid){
      const model=Object.assign({},this.shiftAddForm.value);
      model.startTime=model.startTime.toString()
      model.endTime=model.endTime.toString()
      if (model.name.trim() == '' || model.startTime.trim() == '' || model.endTime.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.shiftComponentService.addShift(model,()=>{
        this.shiftForm()
        this.shiftEmitter.emit(true)
        $('#addShiftModal').modal('hide');
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }
}
