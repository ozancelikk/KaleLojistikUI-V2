import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DissolutionComponentService } from '../../../services/component/dissolution-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';
declare var $:any

@Component({
  selector: 'app-add-dissolution',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-dissolution.component.html',
  styleUrl: './add-dissolution.component.css'
})
export class AddDissolutionComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() dissolutionEvent = new EventEmitter<any>()
  dissolutionForm: FormGroup
  employees:Employee[]
  constructor(
    private dissolutionComponentService:DissolutionComponentService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private employeeComponentService:EmployeeComponentService
    ) { }

  ngOnInit(): void {
    this.createDissolutionForm()
    this.getEmployees()
  }
  createDissolutionForm(){
    this.dissolutionForm=this.formBuilder.group({
      productName:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required],
      startDeggre:['',Validators.required],
      finishDeggre:['',Validators.required],
      personName:['',Validators.required],
      batchNumber:['',Validators.required],
      description:['',Validators.required]
    })
  }
  addDissolution(){
    if(this.dissolutionForm.valid){
      let model =Object.assign({},this.dissolutionForm.value)
      model.startDeggre=model.startDeggre.toString()
      model.finishDeggre=model.finishDeggre.toString()
      if(model.productName.trim() ==''||model.description.trim() ==''||model.batchNumber.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.dissolutionComponentService.addDissolution(model,()=>{
        this.dissolutionEvent.emit(true)
        this.createDissolutionForm()
        $('#addDissolutionModal').modal('hide')
      })
    }
    else{
      this.toastrService.info(this.lang.pleaseFillİnformation)
    }
  }

  async getEmployees(){
    this.employees=await this.employeeComponentService.getAllEmployee()
  }

}
