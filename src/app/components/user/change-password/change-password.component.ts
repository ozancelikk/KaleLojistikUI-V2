import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { UserComponentService } from '../../../services/component/user/user-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  protected changePasswordForm: FormGroup
  email:string
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() changePasswordEvent = new EventEmitter<any>()
  @Input() set changePasswordDetail(value: any) {
    if (!value) {return}
    this.userChangePasswordForm(value)
    
  }
  constructor(private userComponentService: UserComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) {
  }

  userChangePasswordForm(value:any) {
    this.changePasswordForm = this.formBuilder.group({
      email: [value.email],
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
    })
  }

  changePassword() {
    const model = Object.assign({}, this.changePasswordForm.value)
    this.userComponentService.changePassword(model, () => {
      this.changePasswordForm.reset()
    })
  }
}
