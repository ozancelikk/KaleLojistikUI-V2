import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { SupplierComponentService } from '../../../../services/component/stock-tracking/supplier-component.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any

@Component({
  selector: 'app-update-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './update-supplier.component.html',
  styleUrl: './update-supplier.component.css'
})
export class UpdateSupplierComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  updateSupplierForm: FormGroup
  updateRoler:string="POST.Updating.UpdateSupplierItem"
  @Output() supplierEvent = new EventEmitter<any>();
  @Input() set supplierDetails(value: any) {
    if (!value) { return }
    this.updateSupplierForms(value)
  }
  constructor(private supplierComponentService: SupplierComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder) { }

  updateSupplierForms(value: any) {
    this.updateSupplierForm = this.formBuilder.group({
      id: [value.id],
      name: [value.name, Validators.required],
      contactInfo: [value.contactInfo, Validators.required],
      address: [value.address, Validators.required]
    })
  }
  updateSupplier() {
    if (this.updateSupplierForm.valid) {
      let supplierModel = Object.assign({}, this.updateSupplierForm.value)
      if (supplierModel.name.trim() == '' || supplierModel.address.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      supplierModel.contactInfo = supplierModel.contactInfo.toString();
      this.supplierComponentService.updateSupplier(supplierModel, () => {
        $('#updateSupplierModal').modal('hide')
        this.supplierEvent.emit();
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
}
