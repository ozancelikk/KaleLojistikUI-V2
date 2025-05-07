import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkAccident } from '../../../models/workAccident/workAccident';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Employee } from '../../../models/employee/employee';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { WorkAccidentComponentService } from '../../../services/component/work-accident-component.service';

declare var $: any;

@Component({
  selector: 'app-update-work-accident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-work-accident.component.html',
  styleUrl: './update-work-accident.component.css'
})
export class UpdateWorkAccidentComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  workAccidentUpdateForm: any;
  workAccident: WorkAccident
  employeeies: Employee[];

  workAccidentAdminFormArray: FormArray;
  updateRole:string="POST.Updating.UpdateWorkAccidentItem"

  @Output() workAccidentEvent = new EventEmitter<any>()
  @Input() set workAccidentUpdate(value: any) {
    if (!value) return
    this.workAccidentUpdateForms(value)
  }

  constructor(
    private workAccidentComponentService: WorkAccidentComponentService,
    private employeeComponentService: EmployeeComponentService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.getAllEmployee();

  }
  updateWorkAccident() {
    if (this.workAccidentUpdateForm.valid) {
      let workAccidentModel = Object.assign({}, this.workAccidentUpdateForm.value)
      workAccidentModel.identificationNumber = workAccidentModel.identificationNumber.toString();
      workAccidentModel.phoneNumber = workAccidentModel.phoneNumber.toString();
      workAccidentModel.insuranceRegistrationNumber = workAccidentModel.insuranceRegistrationNumber.toString();
      workAccidentModel.numberOfEmployees= workAccidentModel.numberOfEmployees.toString();
      if(workAccidentModel.fatherName.trim() ==''||workAccidentModel.mission.trim() ==''||workAccidentModel.address.trim() ==''||workAccidentModel.description.trim() ==''|| workAccidentModel.lossOfLimbText||workAccidentModel.placeOfBirth.trim()==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.workAccidentComponentService.updateWorkAccident(workAccidentModel, () => {
        $('#updateWorkAccidentModal').modal('hide');
        this.workAccidentEvent.emit(true);
      })
    } else {
      this.toastrService.info(this.lang.anErrorOccurredDuringTheUpdateProcess)
    }
  }
  async getAllEmployee() {
    this.employeeies = (await this.employeeComponentService.getAllEmployee())
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
}
