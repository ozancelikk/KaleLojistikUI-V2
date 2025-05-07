import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { EmployeeAuthComponentService } from '../../services/component/employee-auth-component.service';
import { LanguageComponentService } from '../../services/component/language-component.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent {
  loginForm: FormGroup;
  isLoginPage = true;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(private employeeAuthComponentService: EmployeeAuthComponentService, private formBuilder: FormBuilder, private languageComponentService: LanguageComponentService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.isLoginPage = true;
    this.createLoginForm();
    this.startLanguage();
  }



  startLanguage() {
    var languControl = localStorage.getItem("lng")
    if (languControl == null) {
      this.changeLanguage("tr");
    }
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let model = Object.assign({}, this.loginForm.value);
      model.phoneNumber = model.phoneNumber.toString();
      this.employeeAuthComponentService.login(model, () => {
        this.router.navigate(["/duty"])
      })
    }
  }
  changeLanguage(language: string) {
    localStorage.setItem("lng", language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }

}
