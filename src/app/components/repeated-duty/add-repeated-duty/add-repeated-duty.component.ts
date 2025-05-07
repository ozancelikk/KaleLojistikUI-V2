import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Duty } from '../../../models/duty/duty';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { RepeatedDutyComponentService } from '../../../services/component/repeated-duty-component.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-add-repeated-duty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-repeated-duty.component.html',
  styleUrl: './add-repeated-duty.component.css'
})
export class AddRepeatedDutyComponent {
  @Output() repeatedDutyEmit = new EventEmitter<any>();
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  repeatedDutyForm: FormGroup
  dutys: Duty[]
  stat: boolean = false

  constructor(private repeatedDutyComponentService: RepeatedDutyComponentService, private dutyComponentService: DutyComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createRepeatedDutyForm()
    this.getAllDuty()
  }

  //#region Add Method
  createRepeatedDutyForm() {
    this.repeatedDutyForm = this.formBuilder.group({
      dutyId: ["", Validators.required],
      reminderTime: ["", Validators.required],
      nextRunTime: [""],
      status: [true, Validators.required],
      startTime: ["",Validators.required],
      finishTime: ["",Validators.required]
    })
  }
  addRepeatedDuty() {
    this.stat = true
    var time = this.repeatedDutyForm.get("reminderTime").value
    this.repeatedDutyForm.get("reminderTime").setValue(time)
    if (this.repeatedDutyForm.valid) {
      var repeatedDutyModel = Object.assign({}, this.repeatedDutyForm.value)
      this.repeatedDutyComponentService.addRepeatedDuty(repeatedDutyModel, () => {
        this.createRepeatedDutyForm();
        this.repeatedDutyEmit.emit(true)
        this.stat = false
        $('#addRepeatedDuty').modal('hide');
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  //#endregion

  //#region Get Method
  async getAllDuty() {
    this.dutys = await this.dutyComponentService.getAllDistinct()
  }
  onRepeatDailyChange(event: any) {
    const isChecked = event.target.checked;
    const reminderTimeControl = this.repeatedDutyForm.get('reminderTime');

    if (isChecked) {
      // Günlük tekrar seçildiğinde 1440 dakikayı ekle
      reminderTimeControl?.setValue(1440); // 24 saat = 1440 dakika
      event.target.value = false;
    } else {
      // Eğer checkbox kaldırıldıysa, varsayılan değere döndür (dilersen başka işlem yapabilirsin)
      reminderTimeControl?.setValue(reminderTimeControl);
    }
  }
  //#endregion

}
