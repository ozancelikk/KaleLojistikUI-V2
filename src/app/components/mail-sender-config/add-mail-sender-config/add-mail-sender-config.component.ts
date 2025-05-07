import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MailSenderConfigComponentService } from '../../../services/component/mail-sender-config-component.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-add-mail-sender-config',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-mail-sender-config.component.html',
  styleUrl: './add-mail-sender-config.component.css'
})
export class AddMailSenderConfigComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() mailSenderEmitter = new EventEmitter<any>();
  mailSenderForm: FormGroup;
  departments: Department[]

  constructor(private mailSenderConfigComponentService: MailSenderConfigComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder, private departmentComponentService: DepartmentComponentService) { }

  ngOnInit() {
    this.createMailSenderForm()
    this.getAllDepartments()
  }

  createMailSenderForm() {
    this.mailSenderForm = this.formBuilder.group({
      sendEmail: ["", Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      departmentId: ["", Validators.required],
      nameAndSurname: ["", Validators.required]
    })
  }

  addMailSenderConfig() {
    if (this.mailSenderForm.valid) {
      let mailSenderModel = Object.assign({}, this.mailSenderForm.value)
      this.mailSenderConfigComponentService.addMailSenderConfig(mailSenderModel, () => {
        this.mailSenderEmitter.emit(mailSenderModel)
    })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }

}
