import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
declare var $:any;

@Component({
  selector: 'app-department-add',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './department-add.component.html',
  styleUrl: './department-add.component.css'
})
export class DepartmentAddComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  departmentAddForm:FormGroup
  @Output() departmentAddEvent = new EventEmitter<any>()
  constructor(private departmentComponentService:DepartmentComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createDepartmentForm()
  }
  createDepartmentForm(){
    this.departmentAddForm=this.formBuilder.group({
      id:[""],
      departmentName:['',Validators.required]
    })
  }
  addDepartment(){
    if (!this.departmentAddForm.valid) {
      this.toastrService.error(this.lang.error)
      return
    }
    const model = Object.assign({}, this.departmentAddForm.value)
    if(model.departmentName.trim() ==''){
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.departmentComponentService.addDepartment(model,()=>{
      this.departmentAddEvent.emit(true)
      this.createDepartmentForm()
      $('#addDepartmentModal').modal('hide')
      $('#departmentModal').modal('toggle')
    })
  }
}
