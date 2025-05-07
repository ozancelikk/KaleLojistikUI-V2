import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ShiftComponentService } from '../../../services/component/shift-component.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-update-shift',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './update-shift.component.html',
  styleUrl: './update-shift.component.css'
})
export class UpdateShiftComponent {
  updateRole:string="POST.Updating.UpdateShiftItem"
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  updateShiftForm: FormGroup;
  constructor(private shiftComponentService:ShiftComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }
  @Output() shiftUpdateEmitter = new EventEmitter<any>();
  @Input() set shiftData(value:any){
    if(!value) return
   this.shiftForm(value)
  }
  shiftForm(value:any){
    this.updateShiftForm = this.formBuilder.group({
      id:[value.id],
      name: [value.name,Validators.required],
      startTime: [value.startTime,Validators.required],
      endTime: [value.endTime,Validators.required],
    });
  }
  updateShift(){
    if(this.updateShiftForm.valid){
      const model=Object.assign({},this.updateShiftForm.value);
      model.startTime=model.startTime.toString()
      model.endTime=model.endTime.toString()
      if (model.name.trim() == '' || model.startTime.trim() == '' || model.endTime.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.shiftComponentService.updateShift(model,()=>{
        this.shiftUpdateEmitter.emit(true)
        $('#updateShiftModal').modal('hide');
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }
}
