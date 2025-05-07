import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeImageComponentService } from '../../../services/component/employee-image-component.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeImageDto } from '../../../models/employee/employeeImageDto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-image',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './employee-image.component.html',
  styleUrl: './employee-image.component.css'
})
export class EmployeeImageComponent {
  imageId: string
  employeeImage:any
  file: File
  employeeDetails:any
  employeeImageDto: EmployeeImageDto
  updateEmployeeImageItem:string= "POST.Updating.UpdateEmployeeImageItem"
  @Output() imageEvent = new EventEmitter<any>()
  @Input() set employeeImageDetail(value: any) {
    if (!value) return
   
    
    this.getImagesByEmployeeId(value.id)
    this.employeeImage=value   
  }
  @Input() set employeeDetail(value: any) {
    if (!value) return
    this.addEmployeeImageForm(value)
    this.employeeDetails=value
  }
  protected employeeImageUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private employeeImageComponentService: EmployeeImageComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) { }

  getImagePath(value:any): string {
    if (value) {
      let url: string = window["env"]["employeeImage"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }

  addEmployeeImageForm(value: any) {
    this.employeeImageUpdateForm = this.formBuilder.group({
      employeeId: [value.id],
    })
  }
  get employeeId() {
    return this.employeeImageUpdateForm.get("employeeId")
  }

  updateImage() {
    if (!this.file || !['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(this.file.type)) {
      this.toastrService.error(this.lang.error);
      return; 
    }
    if (this.imageId) {
      let updateModel = {
        id: this.imageId,
        employeeId: this.employeeId.value,
        image: this.file
      };
      this.employeeImageComponentService.updateImage(updateModel, () => {
        this.imageEvent.emit(true);
        this.toastrService.success(this.lang.updateSuccessful,this.lang.successful)
      });
    } else {
      let addModel = {
        employeeId: this.employeeId.value,
        image: this.file
      };
      this.employeeImageComponentService.addImage(addModel, () => {
        this.imageEvent.emit(true);
        this.toastrService.success(this.lang.addingSuccessful,this.lang.successful)
      });
    }
  }
  
  onChange(event: any) {
    this.file = event.target?.files[0];
  }
  async getImagesByEmployeeId(id: string) {
    this.employeeImageDto = (await this.employeeImageComponentService.getImagesByEmployeeId(id))
    this.employeeImageDto ? this.imageId = this.employeeImageDto.id: this.imageId=null
  }
}
