import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Duty } from '../../../models/duty/duty';
import { RepeatedDutyComponentService } from '../../../services/component/repeated-duty-component.service';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-repeated-duty',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './update-repeated-duty.component.html',
  styleUrl: './update-repeated-duty.component.css'
})
export class UpdateRepeatedDutyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  updateForm:FormGroup
  updateRole:string="POST.Updating.UpdateRepeatedDutyItem"
  dutys:Duty[]
  @Output() repeatedDutyEmit = new EventEmitter<any>();
  @Input() set repeatedDutyDetails(value:any){
    if(!value){return}
    this.updateRepeatedDutyForm(value)
  }
  ngOnInit(){
    this.getAllDuty();
  }

  constructor(private repeatedDutyComponentService:RepeatedDutyComponentService,private dutyComponentService:DutyComponentService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  //#region Update Method
  updateRepeatedDutyForm(value:any){
    this.updateForm=this.formBuilder.group({
      id:[value.id],
      dutyId:[value.dutyId,Validators.required],
      reminderTime:[value.reminderTime,Validators.required],
      nextRunTime:[value.nextRunTime],
      status:[value.status,Validators.required],
      startTime:[value.startTime,Validators.required],
      finishTime:[value.finishTime,Validators.required]
    })
  }
  updateRepeatedDuty(){
    if (this.updateForm.valid) {
      var repeatedDutyModel=Object.assign({},this.updateForm.value)
      this.repeatedDutyComponentService.updateRepeatedDuty(repeatedDutyModel,()=>{
        this.repeatedDutyEmit.emit(true)
      })
    }else{
      this.toastrService.error(this.lang.pleaseFillİnformation,this.lang.error)
    }
  }
  //#endregion

  //#region  GetMethod
  async getAllDuty(){
    this.dutys=await this.dutyComponentService.getAllDuty()
  }
  //#endregion


}
