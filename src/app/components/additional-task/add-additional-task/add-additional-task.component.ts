import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-add-additional-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './add-additional-task.component.html',
  styleUrl: './add-additional-task.component.css'
})
export class AddAdditionalTaskComponent {
  @Output() additionalTaskEvent = new EventEmitter<any>()
  protected additionalTaskAddForm: FormGroup
  faPlus=faPlus
  currentDate = new Date();
  dateNow:string
  departments:Department[]
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private additionalTaskComponentService: AdditionalTaskComponentService, private formBuilder: FormBuilder,private datePipe:DatePipe,private toastrService:ToastrService,private departmentComponentService:DepartmentComponentService) {
    this.dateNow = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    this.createNewAddAdditionalTaskForm()
  }
  ngOnInit(){
    this.getAllDepartments()
  }

  createNewAddAdditionalTaskForm() {
    this.additionalTaskAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      tasks: this.formBuilder.array([])
    })
  }

  addAdditionalTask() {
    const model = Object.assign({}, this.additionalTaskAddForm.value)
    if(model.name.trim() =='' || model.tasks.length == 0){
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.additionalTaskComponentService.addAdditionalTask(model, () => {
      this.additionalTaskEvent.emit(true)
      this.createNewAddAdditionalTaskForm()
    })
  }
  get tasksArray(): FormArray {
    return this.additionalTaskAddForm.get('tasks') as FormArray;
  }


  addTask() {
    this.tasksArray.push(this.newTask());
  }
  newTask(): FormGroup {
    return this.formBuilder.group({
      taskName: ["", Validators.required],
      taskDescription: ["", Validators.required],
      departmentId: ["", Validators.required],
    })
  }
  removeTask(index: number) {
    const tasksArray = this.tasksArray;
    if (tasksArray.length > 0) {
      tasksArray.removeAt(index);
    }
  }
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }

}
