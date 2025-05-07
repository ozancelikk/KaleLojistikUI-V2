import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MailSenderConfigComponentService } from '../../../services/component/mail-sender-config-component.service';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-update-mail-sender-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-mail-sender-config.component.html',
  styleUrl: './update-mail-sender-config.component.css'
})
export class UpdateMailSenderConfigComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() mailSenderEmitter = new EventEmitter<any>();
  @Input() set mailSender(value: any) {
    if (!value) { return; }
    this.updateMailSenderConfigForm(value)
  }
  mailSenderForm: FormGroup;
  departments: Department[]

  constructor(private mailSenderConfigComponentService: MailSenderConfigComponentService, private formBuilder: FormBuilder, private departmentComponentService: DepartmentComponentService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllDepartments()
  }

  updateMailSenderConfigForm(value: any) {
    this.mailSenderForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      sendEmail: [value.sendEmail, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      departmentId: [value.departmentId, Validators.required],
      nameAndSurname: [value.nameAndSurname, Validators.required]
    })
  }
  updateMailSenderConfig() {
    if (this.mailSenderForm.valid) {
      let mailSenderModel = Object.assign({}, this.mailSenderForm.value)
      this.mailSenderConfigComponentService.updateMailSenderConfig(mailSenderModel, () => {
        this.mailSenderEmitter.emit(true)
        $('#updateMailSenderConfigModal').modal('hide')
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }


}
