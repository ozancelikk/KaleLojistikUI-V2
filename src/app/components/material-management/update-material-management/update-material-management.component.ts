import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MaterialManagementComponentService } from '../../../services/component/material-management-component.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-material-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule,],
  templateUrl: './update-material-management.component.html',
  styleUrl: './update-material-management.component.css'
})
export class UpdateMaterialManagementComponent {
  faRecycle = faRecycle
  updateRole:string="POST.Updating.UpdateMaterialManagementItem"
  @Output() materialEvent = new EventEmitter<any>()
  @Input() set materialDetail(value: any) {
    if (!value) return
    this.updateMaterialForm(value)
  }
  protected materialUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private materialManagementComponentService: MaterialManagementComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  updateMaterialForm(value: any) {
    this.materialUpdateForm = this.formBuilder.group({
      id: [value.id],
      materialName: [value.materialName],
      materialUsage: [value.materialUsage],
      securityAlert: [value.securityAlert]
    })
  }

  updateMaterial() {
    if (!this.materialUpdateForm.valid) {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
      return
    }
    let materialModel = Object.assign({}, this.materialUpdateForm.value)
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
    this.materialManagementComponentService.updateMaterialManagement(materialModel, () => {
      this.materialEvent.emit(true)
    })
  }
}
