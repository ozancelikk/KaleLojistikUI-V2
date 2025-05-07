import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { CommonModule } from '@angular/common';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';
import { ToastrService } from 'ngx-toastr';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';


@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  @Output() employeeEvent = new EventEmitter<any>()
  @Input() set employeeDetail(value: any) {
    if (!value) return
    this.updateEmployeeForm(value)
    this.getAllDepartments()
    this.getAllBranchs()
    this.stat=value.educationalStatus
  }
  branchs:Branch[];
  departments: Department[];
  protected employeeUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  updateEmployeeItem:string= "POST.Updating.UpdateEmployeeItem"
  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  stat:string;
  educationalStatuss = [this.lang.primarySchool, this.lang.secondarySchool, this.lang.highSchool, this.lang.associateDegree, this.lang.degree, this.lang.graduate, this.lang.doctorsDegree]
  constructor(private employeeComponentService: EmployeeComponentService, private formBuilder: FormBuilder, private departmentComponentService: DepartmentComponentService, private toastrService: ToastrService,private branchComponentService:BranchComponentService) { }

  updateEmployeeForm(value: any) {
    this.employeeUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      name: [value.name, Validators.required],
      surname: [value.surname, Validators.required],
      email: [value.email, Validators.required],
      age: [value.age, Validators.required],
      phoneNumber: [value.phoneNumber, Validators.required],
      title: [value.title, Validators.required],
      departmentId: [value.departmentId, Validators.required],
      status: [value.status, Validators.required],
      dateOfStart: [value.dateOfStart],
      branchId: [value.branchId, Validators.required],
      bloodGroup: [value.bloodGroup,Validators.required],
      birthDay: [value.birthDay,Validators.required],
      educationalStatus: [value.educationalStatus,Validators.required],
      lowerSize: [value.lowerSize,Validators.required],
      upperSize: [value.upperSize,Validators.required],
      shoeSize: [value.shoeSize,Validators.required],
      emergencyContactName: [value.emergencyContactName,Validators.required],
      emergencyContactNumber: [value.emergencyContactNumber,Validators.required],
      emergencyContactRelationship: [value.emergencyContactRelationship,Validators.required],
      dateOfFinish: [value.dateOfFinish]
    })
  }

  updateEmployee() {
    if (this.employeeUpdateForm.valid) {
      const model = Object.assign({}, this.employeeUpdateForm.value)
      if (model.email.trim() == '' || model.name.trim() == '' || model.surname.trim() == '' || model.title.trim() == '' ) {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      model.phoneNumber = model.phoneNumber.toString()
      model.emergencyContactNumber = model.emergencyContactNumber.toString()
      model.shoeSize = model.shoeSize.toString()
      this.employeeComponentService.updateEmployee(model, () => {
        this.employeeEvent.emit(true)
        this.departments = []
        this.branchs=[]
        this.employeeUpdateForm.value.reset()
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }

  }
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }
  async getAllBranchs(){
    this.branchs=await this.branchComponentService.getAllBranch()
  }
}
