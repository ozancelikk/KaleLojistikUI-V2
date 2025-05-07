import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { ToastrService } from 'ngx-toastr';
import { Duty } from '../../../models/duty/duty';
import { RepeatedDutyComponentService } from '../../../services/component/repeated-duty-component.service';
import { log } from 'node:console';
declare var $: any;

@Component({
  selector: 'app-add-batch-repeated-duty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-batch-repeated-duty.component.html',
  styleUrl: './add-batch-repeated-duty.component.css'
})
export class AddBatchRepeatedDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  duties: Duty[]
  createNewRepeatedDutyForm: FormGroup;
  stat: boolean = false
  dutyList:string[] = []
  dutyL:Duty[]=[];
  @Output() repeatedDutyAddEmit = new EventEmitter<any>();
  constructor(private dutyComponentService: DutyComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder,private repeatedDutyComponentService:RepeatedDutyComponentService) 
    { 
      this.getDuty()
      this.createForm()
    }
  async getDuty() {
    this.duties = await this.dutyComponentService.getAllDistinct()
  }
  createForm() {
    this.createNewRepeatedDutyForm = this.formBuilder.group({
      dutyId: [""],
      reminderTime: ["", Validators.required],
      nextRunTime: [""],
      status: [true, Validators.required],
      startTime: ["", Validators.required],
      finishTime: ["", Validators.required]
    })
  }
  addRepeatedDuty() {
    this.stat = true
    var time = this.createNewRepeatedDutyForm.get("reminderTime").value
    this.createNewRepeatedDutyForm.get("reminderTime").setValue(time)
    this.createNewRepeatedDutyForm.get("dutyId").setValue(this.dutyList)
    if (this.createNewRepeatedDutyForm.valid) {
      var repeatedDutyModel = Object.assign({}, this.createNewRepeatedDutyForm.value)
      this.repeatedDutyComponentService.repeatedDutyBatchAdd(repeatedDutyModel, () => {
        this.createForm();
        this.repeatedDutyAddEmit.emit(true)
        this.stat = false
        this.dutyL=[];
        this.dutyList=[];
        $('#addBatchRepeatedDutyModal').modal('hide');
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async addDuty() {
    var duty = this.createNewRepeatedDutyForm.get("dutyId").value
    this.dutyList.push(duty)    
    var data= await this.dutyComponentService.getByDuty(duty)
    this.dutyL.push(data)    
    this.createNewRepeatedDutyForm.get("dutyId").setValue(null)
  }
  removeDuty(index: number) {
    const dutyArray = this.dutyList;
    if (dutyArray.length > 0) {
      dutyArray.splice(index, 1);
    }
  } 
  onRepeatDailyChange(event: any) {
    const isChecked = event.target.checked;
    const reminderTimeControl = this.createNewRepeatedDutyForm.get('reminderTime');

    if (isChecked) {
      // Günlük tekrar seçildiğinde 1440 dakikayı ekle
      reminderTimeControl?.setValue(1440); // 24 saat = 1440 dakika
      event.target.value = false;
    } else {
      // Eğer checkbox kaldırıldıysa, varsayılan değere döndür (dilersen başka işlem yapabilirsin)
      reminderTimeControl?.setValue(reminderTimeControl);
    }
  }


}
