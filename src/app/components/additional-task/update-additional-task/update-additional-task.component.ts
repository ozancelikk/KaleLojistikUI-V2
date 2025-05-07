import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { Task } from '../../../models/task';
import { ToastrService } from 'ngx-toastr';
import { AdditionalTask } from '../../../models/additionalTask/additionalTask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AdditionalRoomTask } from '../../../models/additionalTask/additionalRoomTask';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-update-additional-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './update-additional-task.component.html',
  styleUrl: './update-additional-task.component.css'
})
export class UpdateAdditionalTaskComponent {
  @ViewChild('taskNameInput') taskNameInput: ElementRef;
  @ViewChild('taskDescriptionInput') taskDescriptionInput: ElementRef;
  @ViewChild('departmentInput') departmentInput: ElementRef;
 
  taskForm: FormGroup;
  @ViewChild('updateTaskAdd') updateTaskAdd: any;
  additionalTask:AdditionalTask
  task:AdditionalRoomTask[]
  departments:Department[]
  @Output() additionalTaskUpdateEvent = new EventEmitter<any>()
  @Input() set additionalTaskDetail(value:any){
    if(!value) return
    this.additionalTask=value
    this.updateAdditionalTaskForm(value);
    this.getAllDepartments();
  
  }
 
  protected additionalTaskUpdateForm:FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private additionalTaskComponentService:AdditionalTaskComponentService,private formBuilder:FormBuilder,private toastrService:ToastrService,private departmentComponentService:DepartmentComponentService){ 
    this.initializeForm();

   }

   private initializeForm() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    this.taskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      departmentId: ["", Validators.required],
      status: [false, Validators.required]
    });
    return this.taskForm
  }

get tasks(){
  return this.additionalTaskUpdateForm.get("tasks") as FormArray;
}

  updateAdditionalTaskForm(value:any){

    this.additionalTaskUpdateForm=this.formBuilder.group({
      id: [value.id,Validators.required],
      name:[value.name,Validators.required],
      tasks:this.addTaskFormArray(value.tasks)
    })
  }
  
  updateAdditionalTask(){
    const model=Object.assign({},this.additionalTaskUpdateForm.value)
    model.name = model.name.trim();
    this.additionalTaskComponentService.updateAdditionalTask(model,()=>{
      this.additionalTaskUpdateEvent.emit(true)
    })
  }
  updateRoomTask() {
    if (this.additionalTaskUpdateForm.valid) {
      let additionalTaskModel = Object.assign({}, this.additionalTaskUpdateForm.value);
      if(additionalTaskModel.name.trim() ==''  || additionalTaskModel.tasks.length == 0){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.additionalTaskComponentService.updateAdditionalTask(additionalTaskModel)
    }
  }

  updateTask(index: number) {
    this.task = this.additionalTask.tasks;
    if (index >= 0) {
      const updatedTasks = [...this.task];
      updatedTasks[index].status = false;
      const formValues = this.additionalTaskUpdateForm.get('tasks') as FormArray;
      updatedTasks[index].taskName = this.taskNameInput.nativeElement.value;
      updatedTasks[index].taskDescription = this.taskDescriptionInput.nativeElement.value;
      updatedTasks[index].departmentId = this.departmentInput.nativeElement.value;
      const taskModel = {
        ...this.additionalTaskUpdateForm.value,
        tasks: updatedTasks,
      };
      this.additionalTaskComponentService.updateAdditionalTask(taskModel);
      setTimeout(() => {
        window.location.reload();
      }, 500); 
    } else {
      this.toastrService.error(this.lang.anErrorOccurredDuringTheUpdateProcess);
    }
  }


  addTaskFormArray(task: any[]) {
    const formArray = new FormArray([])
    task.forEach(f => {
      formArray.push(this.formBuilder.group({
        taskName: [f.taskName, Validators.required],
        taskDescription: [f.taskDescription, Validators.required],
        departmentId: [f.departmentId, Validators.required],
      }))
    })
    return formArray
  }
  
  deleteTask(index: number) {
    this.task = this.additionalTask.tasks;
    if (index >= 0 && index < this.task.length) {
      const updatedTasks = [...this.task];
      updatedTasks.splice(index, 1);
  
      const taskModel = {
        ...this.additionalTaskUpdateForm.value,
        tasks: updatedTasks,
      };
      
      this.additionalTaskComponentService.updateAdditionalTask(taskModel);
      setTimeout(() => {
        window.location.reload();
      }, 500); 
      
    } else {
      this.toastrService.error(this.lang.anErrorOccurredDuringTheDeleteProcess);
    }
  }
  addTask() {
    if (this.taskForm.valid) {

      this.task = this.additionalTask.tasks;
    const newTask = this.taskForm.value;
    
    const updatedTasks = [...this.task];
    updatedTasks.push(newTask);

    const taskModel = {
      ...this.additionalTaskUpdateForm.value,
      tasks: updatedTasks,
    };
      this.additionalTaskComponentService.updateAdditionalTask(taskModel);
 
    }
  }
  
  async getAllDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment();
  }
}
