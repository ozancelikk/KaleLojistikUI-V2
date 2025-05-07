import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MaterialManagementComponentService } from '../../../services/component/material-management-component.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-material-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-material-management.component.html',
  styleUrl: './add-material-management.component.css'
})
export class AddMaterialManagementComponent {
  @Output() materialEvent = new EventEmitter<any>()
  protected materialAddForm: FormGroup
  faRecycle = faRecycle
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private materialManagementComponentService: MaterialManagementComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) {
    this.createNewMaterialForm()
  }

  createNewMaterialForm() {
    this.materialAddForm = this.formBuilder.group({
      materialName: ["", Validators.required],
      materialUsage: ["", Validators.required],
      securityAlert: ["", Validators.required]
    });
  }

  addMaterialManagement() {
    if (!this.materialAddForm.valid) {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
      return
    }
    let materialModel = Object.assign({}, this.materialAddForm.value)
    if (materialModel.materialName.trim() == '' || materialModel.materialUsage.trim() == '' || materialModel.securityAlert.trim() == '') {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    if (materialModel.materialUsage && materialModel.materialUsage.includes(",")) {
      var y = materialModel.materialUsage.split(",");
      materialModel.materialUsage = y
    }
    else if (!Array.isArray(materialModel.materialUsage)) {
      materialModel.materialUsage = [materialModel.materialUsage];
      if (materialModel.materialUsage.includes(",")) {
        materialModel.materialUsage = materialModel.materialUsage.split(",");
      }
    }

    if (materialModel.securityAlert && materialModel.securityAlert.includes(",")) {
      var y = materialModel.securityAlert.split(",");
      materialModel.securityAlert = y
    }
    else if (!Array.isArray(materialModel.securityAlert)) {
      materialModel.securityAlert = [materialModel.securityAlert];
      if (materialModel.securityAlert.includes(",")) {
        materialModel.securityAlert = materialModel.securityAlert.split(",");
      }
    }

    this.materialManagementComponentService.addMaterialManagement(materialModel, () => {
      this.materialEvent.emit(true)
      this.createNewMaterialForm()
    })
  }

}
