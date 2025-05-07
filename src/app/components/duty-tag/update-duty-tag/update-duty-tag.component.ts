import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyTagComponentService } from '../../../services/component/duty-tag-component.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-update-duty-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './update-duty-tag.component.html',
  styleUrl: './update-duty-tag.component.css'
})
export class UpdateDutyTagComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutyTagUpdateForm: FormGroup
  updateDutyTagItem:string= "POST.Updating.UpdateDutyTagItem"
  @Output() dutyTagUpdateEvent = new EventEmitter<any>()
  @Input() set dutyTagDetail(value: any) {
    if (!value) { return }
    this.updateDutyTagForm(value)
  }
  constructor(private dutyTagComponentService: DutyTagComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }
  updateDutyTagForm(value: any) {
    this.dutyTagUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      tagName: [value.tagName, Validators.required]
    })
  }
  updateDutyTag() {
    if (!this.dutyTagUpdateForm.valid) {
      this.toastrService.error(this.lang.error)
      return
    }
    const model = Object.assign({}, this.dutyTagUpdateForm.value)
    if (model.tagName.trim() == '') {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.dutyTagComponentService.updateDutyTag(model, () => {
      this.dutyTagUpdateEvent.emit(true)
      $('#updateDutyTagModal').modal('hide')
      $('#dutyTagModal').modal('toggle')
    })
  }

}
