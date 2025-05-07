import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkAccidentComponentService } from '../../../services/component/work-accident-component.service';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
declare var $: any;

@Component({
  selector: 'app-add-work-accident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './add-work-accident.component.html',
  styleUrl: './add-work-accident.component.css'
})
export class AddWorkAccidentComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  workAccidentAddForm: FormGroup;
  employees:Employee[]
  faPlus=faPlus
  @Output() workAccidentEvent = new EventEmitter<any>()
  constructor(private workAccidentComponentservice: WorkAccidentComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder,private employeeComponentService:EmployeeComponentService) {
    this.createWorkAccidentAddForm();
    this.getAllEmployee();
   }

  //#region Add Method

  workAccidentAdd() {
    if (this.workAccidentAddForm.valid) {
      if (this.tasksArray.length < 4) {
        this.toastrService.info("Minimum 4 işlemci eklemelisiniz."); // Minimum gereksinimi karşılayamıyorsa uyarı ver
        return; // İşlemi sonlandır
      }
      let workAccidentModel = Object.assign({}, this.workAccidentAddForm.value);
      workAccidentModel.workAccidentAdmin.forEach(element => {
        element.phoneNumber = element.phoneNumber.toString();
      });
      workAccidentModel.identificationNumber = workAccidentModel.identificationNumber.toString();
      workAccidentModel.phoneNumber = workAccidentModel.phoneNumber.toString();
      workAccidentModel.insuranceRegistrationNumber = workAccidentModel.insuranceRegistrationNumber.toString();
      workAccidentModel.numberOfEmployees= workAccidentModel.numberOfEmployees.toString();
      if(workAccidentModel.fatherName.trim() ==''||workAccidentModel.mission.trim() ==''||workAccidentModel.address.trim() ==''||workAccidentModel.description.trim() ==''|| workAccidentModel.lossOfLimbText||workAccidentModel.placeOfBirth.trim()==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.workAccidentComponentservice.addWorkAccident(workAccidentModel,()=>{
        $('#addWorkAccidentModal').modal('hide');
        this.workAccidentEvent.emit(true);
        this.createWorkAccidentAddForm();
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error);
    }
  }

  createWorkAccidentAddForm() {
    this.workAccidentAddForm = this.formBuilder.group({
      employeeId: ["", Validators.required],
      insuranceRegistrationNumber: ["", Validators.required],
      identificationNumber: ["", Validators.required],
      fatherName: ["", Validators.required],
      birthDay: ["", Validators.required],
      placeOfBirth: ["", Validators.required],
      mission: ["", Validators.required],
      dateOfStart: ["", Validators.required],
      accidentDate: ["", Validators.required],
      numberOfEmployees: ["", Validators.required],
      workingStartDate: ["", Validators.required],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      lossOfLimb: [false],
      lossOfLimbText: [""],
      description: ["", Validators.required],
      workAccidentAdmin: this.formBuilder.array([])
    });
  }

  get tasksArray(): FormArray {
    return this.workAccidentAddForm.get('workAccidentAdmin') as FormArray;
  }

  addTask() {
    if (this.tasksArray.length < 4) {
      const role = this.getRoleByIndex(this.tasksArray.length);
      this.tasksArray.push(this.newTask());
    }
  }
  newTask(): FormGroup {
    return this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      mission: ["", Validators.required],
      address: ["", Validators.required]
    })
  }

  getRoleByIndex(index: number): string {
    return (index + 1) +' ' ;
  }
  
  getRoleDescriptionByIndex(index: number): string {
    switch (index) {
      case 0:
        return this.lang.officer;
      case 1:
        return this.lang.accident;
      case 2:
        return this.lang.witness;
      case 3:
        return this.lang.witness;
      default:
        return ""; 
    }
  }


  removeTask(index: number) {
    const tasksArray = this.tasksArray;
    if (tasksArray.length > 0) {
      tasksArray.removeAt(index);
    }
  }
  //#endregion

  //#region Get Method
  async getAllEmployee(successCallBack?:()=>void) {
    this.employees = (await this.employeeComponentService.getAllEmployee())
    if(successCallBack){
      successCallBack();       
    } 
  }
  //#endregion

}
