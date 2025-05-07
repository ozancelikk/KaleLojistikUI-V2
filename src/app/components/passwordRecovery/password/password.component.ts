import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { UserAuthComponentService } from '../../../services/component/user/user-auth-component.service';
import { LanguageComponentService } from '../../../services/component/language-component.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));
  changePassword:FormGroup
  password:any
  verifyPassword:any
  key:string
  mail:string
  constructor(private formBuilder:FormBuilder,private authService:UserAuthComponentService,private toastr:ToastrService,private languageComponentService:LanguageComponentService){}
  ngOnInit(): void {
    this.getmailAndKey();
    this.changePasswordForm();
  }

  changePasswordForm(){
    this.changePassword=this.formBuilder.group({
      newPassword:["",Validators.required]
  })
  }
  

  async forgottenPassword() {
    if (this.changePassword.valid) {
      let model = Object.assign({}, this.changePassword.value);
      model["email"] = this.mail;
      model["privateKey"] = this.key;
      if (this.verifyPassword != this.password) {
        this.toastr.error(this.lang.passwordDontMatch, this.lang.error);
      }
      else{
      (await this.authService.changeForgottenPassword(model))
      }
    }
    else {
      this.toastr.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }

  getmailAndKey(){
  this.mail=localStorage.getItem("mail")
  this.key=localStorage.getItem("key")
  }
  changeLanguage(language:string){
    localStorage.setItem("lng",language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
}
