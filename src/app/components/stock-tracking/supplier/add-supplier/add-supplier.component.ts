import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierComponentService } from '../../../../services/component/stock-tracking/supplier-component.service';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
declare var $: any

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() supplierEvent = new EventEmitter<any>();
  supplierAddForm: FormGroup
  constructor(private supplierComponentService: SupplierComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createSupplierAddForm()
  }
  createSupplierAddForm() {
    this.supplierAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      contactInfo: ["", Validators.required],
      address: ["", Validators.required]
    })
  }
  addSupplier() {
    if (this.supplierAddForm.valid) {
      let supplierModel = Object.assign({}, this.supplierAddForm.value)
      supplierModel.contactInfo = supplierModel.contactInfo.toString();
      if (supplierModel.name.trim() == '' || supplierModel.address.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.supplierComponentService.addSupplier(supplierModel, () => {
        this.createSupplierAddForm();
        $('#addSupplierModal').modal('hide')
        this.supplierEvent.emit();
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }

}
