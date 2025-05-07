import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { WorkAccident } from '../../../models/workAccident/workAccident';
import { WorkAccidentAdmin } from '../../../models/workAccident/workAccidentAdmin';
import { WorkAccidentComponentService } from '../../../services/component/work-accident-component.service';

declare var $: any;

@Component({
  selector: 'app-update-witness',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './update-witness.component.html',
  styleUrl: './update-witness.component.css'
})
export class UpdateWitnessComponent {
  updateRole:string="POST.Updating.UpdateWorkAccidentItem"
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  workAccidentUpdateForm: any;
  workAccident: WorkAccident
  workAccidentAdminFormArray: FormArray;

  @Output() workAccidentEvent = new EventEmitter<any>()
  @Input() set workAccidentUpdate(value: any) {
    if (!value) return
    this.workAccidentUpdateForms(value)
    this.initializeForm(value);
  }

  constructor(
    private workAccidentComponentService: WorkAccidentComponentService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }
  updateWorkAccident() {
    if (this.workAccidentUpdateForm.valid) {
      let workAccidentModel = Object.assign({}, this.workAccidentUpdateForm.value)
      this.workAccidentComponentService.updateWorkAccident(workAccidentModel, () => {
        $('#workAccidentModal').modal('hide');
        this.workAccidentEvent.emit(true);
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  workAccidentUpdateForms(value: any) {
    this.workAccidentUpdateForm = this.formBuilder.group({
      id: [value.id],
      employeeId: [value.employeeId, Validators.required],
      fatherName: [value.fatherName, Validators.required],
      birthDay: [value.birthDay, Validators.required],
      placeOfBirth: [value.placeOfBirth, Validators.required],
      mission: [value.mission, Validators.required],
      dateOfStart: [value.dateOfStart, Validators.required],
      accidentDate: [value.accidentDate, Validators.required],
      numberOfEmployees: [value.numberOfEmployees, Validators.required],
      workingStartDate: [value.workingStartDate, Validators.required],
      address: [value.address, Validators.required],
      phoneNumber: [value.phoneNumber, Validators.required],
      insuranceRegistrationNumber: [value.insuranceRegistrationNumber, Validators.required],
      identificationNumber: [value.identificationNumber, Validators.required],
      lossOfLimb: [value.lossOfLimb, Validators.required],
      description: [value.description, Validators.required],
      workAccidentAdmin: [value.workAccidentAdmin]
    });
  }

  initializeForm(value: any) {
    this.workAccidentUpdateForm = this.formBuilder.group({
      id: [value.id],
      employeeId: [value.employeeId, Validators.required],
      fatherName: [value.fatherName, Validators.required],
      birthDay: [value.birthDay, Validators.required],
      placeOfBirth: [value.placeOfBirth, Validators.required],
      mission: [value.mission, Validators.required],
      dateOfStart: [value.dateOfStart, Validators.required],
      accidentDate: [value.accidentDate, Validators.required],
      numberOfEmployees: [value.numberOfEmployees, Validators.required],
      workingStartDate: [value.workingStartDate, Validators.required],
      address: [value.address, Validators.required],
      phoneNumber: [value.phoneNumber, Validators.required],
      insuranceRegistrationNumber: [value.insuranceRegistrationNumber, Validators.required],
      identificationNumber: [value.identificationNumber, Validators.required],
      lossOfLimb: [value.lossOfLimb, Validators.required],
      description: [value.description, Validators.required],
      workAccidentAdmin: this.formBuilder.array([])
    });

    this.workAccidentAdminFormArray = this.workAccidentUpdateForm.get('workAccidentAdmin') as FormArray;
    value.workAccidentAdmin.forEach(admin => this.addWorkAccidentAdmin(admin));
  }

  addWorkAccidentAdmin(admin: WorkAccidentAdmin) {
    const adminGroup = this.formBuilder.group({
      name: [admin.name, Validators.required],
      surname: [admin.surname, Validators.required],
      phoneNumber: [admin.phoneNumber, Validators.required],
      mission: [admin.mission, Validators.required],
      address: [admin.address, Validators.required]
    });
    this.workAccidentAdminFormArray.push(adminGroup);
  }

}
