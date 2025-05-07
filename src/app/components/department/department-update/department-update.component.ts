import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DepartmentComponentService } from '../../../services/component/department-component.service';

declare var $: any;

@Component({
  selector: 'app-department-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './department-update.component.html',
  styleUrl: './department-update.component.css'
})
export class DepartmentUpdateComponent {
  updateDepartmentRole:string="POST.Updating.UpdateDepartmentItem"
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  departmentUpdateForm: FormGroup
  @Output() departmentUpdateEvent = new EventEmitter<any>()
  @Input() set departmentDetail(value: any) {
    if (!value) return
    this.updateDepartmentForm(value)
  }
  constructor(private departmentComponentService: DepartmentComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }
  updateDepartmentForm(value: any) {
    this.departmentUpdateForm = this.formBuilder.group({
      id: [value.id,],
      departmentName: [value.departmentName, Validators.required]
    })
  }
  updateDepartment() {
    if (!this.departmentUpdateForm.valid) {
      this.toastrService.error(this.lang.error)
      return
    }
    const model = Object.assign({}, this.departmentUpdateForm.value)
    if (model.departmentName.trim() == '') {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.departmentComponentService.updateDepartment(model, () => {
      this.departmentUpdateEvent.emit(true)
      $('#updateDepartmentModal').modal('hide')
      $('#departmentModal').modal('toggle')
    })
  }
}
