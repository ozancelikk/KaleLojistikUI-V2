import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Employee } from '../../../models/employee/employee';
import { DissolutionComponentService } from '../../../services/component/dissolution-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';

declare var $: any

@Component({
  selector: 'app-update-dissolution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-dissolution.component.html',
  styleUrl: './update-dissolution.component.css'
})
export class UpdateDissolutionComponent {
  updateDissolutionRole: string = "POST.Updating.DissolutionUpdateDissolutionItem"
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() dissolutionEvent = new EventEmitter<any>()
  @Input() set dissolutionDetail(value: any) {
    if (!value) { return }
    this.updateDissolutionForm(value)
  }
  dissolutionForm: FormGroup
  employees: Employee[]
  constructor(private dissolutionComponentService: DissolutionComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService, private employeeComponentService: EmployeeComponentService) { }
  ngOnInit() {
    this.getEmployees();
  }

  updateDissolutionForm(value: any) {
    this.dissolutionForm = this.formBuilder.group({
      id: [value.id],
      productName: [value.productName, Validators.required],
      startDate: [value.startDate, Validators.required],
      endDate: [value.endDate, Validators.required],
      startDeggre: [value.startDeggre, Validators.required],
      finishDeggre: [value.finishDeggre, Validators.required],
      personName: [value.personName, Validators.required],
      batchNumber: [value.batchNumber, Validators.required],
      description: [value.description, Validators.required]
    })
  }
  updateDissolution() {
    if (this.dissolutionForm.valid) {
      let model = Object.assign({}, this.dissolutionForm.value)
      model.startDeggre = model.startDeggre.toString()
      model.finishDeggre = model.finishDeggre.toString()
      if (model.productName.trim() == '' || model.description.trim() == '' || model.batchNumber.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.dissolutionComponentService.updateDissolution(model, () => {
        $('#updateDissolutionModal').modal('hide')
        this.dissolutionEvent.emit(true)
      })
    }
    else {
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }
  async getEmployees() {
    this.employees = await this.employeeComponentService.getAllEmployee()
  }
}
