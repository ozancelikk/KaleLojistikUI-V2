import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeDetailsDto } from '../../models/employee/employeeDetailsDto';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { EmployeeComponentService } from '../../services/component/employee-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeImageComponentService } from '../../services/component/employee-image-component.service';


@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, ],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent {
  showLoading: boolean = false;
  employeeUpdateForm: any;
  employeeLoad = false;
  employeeId: any;
  imageId: string
  employee: EmployeeDetailsDto;
  verifyPassword: string;
  password: string;
  mailAddress: string
  file: File
  employeeChangePasswordForm: FormGroup
  isEmployeeLoad: boolean = false
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  updateEmpRole:string="POST.Updating.UpdateEmployeeItem"
  updateImgaRole:string="POST.Updating.UpdateEmployeeImageItem"
  constructor(
    private employeeComponentService:EmployeeComponentService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private employeeImageComponentService: EmployeeImageComponentService,
    private cdr:ChangeDetectorRef
    ) { }
    ngOnInit(): void {
      this.changePasswordForm();
      this.getEmployeeId();
    }
  
    getEmployeeId(){
      this.employeeId=localStorage.getItem("employeeId")
      this.getByEmployee(this.employeeId);
    }
    
    changePasswordForm() {
      this.employeeChangePasswordForm = this.formBuilder.group({
        oldPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
      })
    }
    changePassword() {
      let model = Object.assign({}, this.employeeChangePasswordForm.value);
      model["email"] = this.mailAddress;
      if (this.employeeChangePasswordForm.valid) {
        if (this.verifyPassword != this.password) {
          this.toastrService.error(this.lang.passwordDontMatch, this.lang.error);
        }
        else {
          this.employeeComponentService.changePassword(model, () => {
            this.toastrService.success(this.lang.passwordChangeSucceed , this.lang.successful);
          });
        }
      }
      else {
        this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error);
      }
    }
  
    async getByEmployee(id:string) {
      this.employee = (await this.employeeComponentService.getImagesByEmployeeId(id))
      this.mailAddress = this.employee.email
      this.isEmployeeLoad = true
      this.getImage(this.employeeId)
      this.employeeUpdateForms();
    }
    getImagePath(employeeDetail: EmployeeDetailsDto): string {
      let url: string = employeeDetail.imagePath != null ?  window["env"]["employeeImage"]
        + employeeDetail.imagePath : "assets/img/noimage.jpg";
      return url;
    }
    onChange(event:any) {
      this.file = event.target?.files[0];
    }
    updateImage() {
      this.showLoading = true;
      this.cdr.detectChanges();
      let model = {
          employeeId: this.employeeId,
          imagePath: this.file,
          id: this.imageId,
      }
      if (this.imageId == null) {
          let model2 = {
              employeeId: this.employeeId,
              imagePath: this.file,
          }
          this.employeeImageComponentService.addImage(model2)
              .finally(() => this.showLoading = false); // Yükleme tamamlandığında göstergesini kapat
      } else {
          this.employeeImageComponentService.updateImage(model)
              .finally(() => this.showLoading = false); // Yükleme tamamlandığında göstergesini kapat
      }
  }
  
    async getImage(id: string) {
      var employeeImage = (await this.employeeImageComponentService.getImagesByEmployeeId(id))
      this.imageId = employeeImage.id
    }
    employeeUpdateForms() {
      this.employeeUpdateForm = this.formBuilder.group({
        id: [this.employee.id],
        name: [this.employee.name],
        surname: [this.employee.surname],
        email: [this.employee.email,Validators.required],
        title: [this.employee.title],
        status: [this.employee.status],
        departmentId: [this.employee.departmentId],
        dateOfStart: [this.employee.dateOfStart],
        phoneNumber: [this.employee.phoneNumber,Validators.required],
      });
    }
  
    updateEmployee() {
      if (this.employeeUpdateForm.valid) {
        let employeeModel = Object.assign({}, this.employeeUpdateForm.value);
        if(employeeModel.email.trim() ==''){
          this.toastrService.error(this.lang.pleaseFillİnformation)
          return
        }
        this.employeeComponentService.updateEmployee(employeeModel)
      } else {
        this.toastrService.error(this.lang.anErrorOccurredDuringTheUpdateProcess);
      }
    }
}
