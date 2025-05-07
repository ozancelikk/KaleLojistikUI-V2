import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  @Output() changePasswordEvent = new EventEmitter<any>()
  @Input() set employeeDetail(value: any) {
    if (!value) return
    this.updateEmployeeForm(value)
  }
  protected changePasswordForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private employeeComponentService: EmployeeComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  updateEmployeeForm(value: any) {
    this.changePasswordForm = this.formBuilder.group({
      email: [value.email, Validators.required],
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  changePassword() {
    const model = Object.assign({}, this.changePasswordForm.value)
    this.employeeComponentService.changePassword(model, () => {
      this.changePasswordEvent.emit(true)
    })
  }
}
