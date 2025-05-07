import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { EmployeeAuthComponentService } from '../../../services/component/employee-auth-component.service';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';
import { ToastrService } from 'ngx-toastr';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  @Output() employeeEvent = new EventEmitter<any>()
  protected employeeAddForm: FormGroup
  branchs:Branch[];
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  departments: Department[];
  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  educationalStatuss = [this.lang.primarySchool, this.lang.secondarySchool, this.lang.highSchool, this.lang.associateDegree, this.lang.degree, this.lang.graduate, this.lang.doctorsDegree]
  constructor(private employeeAuthComponentService: EmployeeAuthComponentService, private formBuilder: FormBuilder, private departmentComponentService: DepartmentComponentService, private toastrService: ToastrService,private branchComponentService:BranchComponentService) {
    this.getAllDepartments();
    this.getAllBranchs()
    this.createNewEmployeeForm()
  }

  createNewEmployeeForm() {
    this.employeeAddForm = this.formBuilder.group({
      email: ["", Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
      password: ["", Validators.required],
      name: ["", Validators.required],
      surname: ["", Validators.required],
      age: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      title: ["", Validators.required],
      status: [true, Validators.required],
      departmentId: ["", Validators.required],
      dateOfStart: [""],
      branchId: ["",Validators.required],
      bloodGroup: ["",Validators.required],
      birthDay: ["",Validators.required],
      educationalStatus: ["",Validators.required],
      lowerSize: ["",Validators.required],
      upperSize: ["",Validators.required],
      shoeSize: ["",Validators.required],
      emergencyContactName: ["",Validators.required],
      emergencyContactNumber: ["",Validators.required],
      emergencyContactRelationship: ["",Validators.required],
      dateOfFinish: [""]
    })
  }

  addEmployee() {
    if (this.employeeAddForm.valid) {
      const model = Object.assign({}, this.employeeAddForm.value)
      if (model.email.trim() == '' || model.name.trim() == '' || model.surname.trim() == '' || model.title.trim() == '' ) {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      model.phoneNumber = model.phoneNumber.toString()
      model.emergencyContactNumber = model.emergencyContactNumber.toString()
      model.shoeSize = model.shoeSize.toString()
      this.employeeAuthComponentService.addEmployee(model, () => {
        this.employeeEvent.emit(true)
        this.createNewEmployeeForm();
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }
  async getAllBranchs(){
    this.branchs=await this.branchComponentService.getAllBranch()
  }
}
