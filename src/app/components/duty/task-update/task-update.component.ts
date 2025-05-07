import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../models/task';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Duty } from '../../../models/duty/duty';
import { ToastrService } from 'ngx-toastr';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';


@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css'
})
export class TaskUpdateComponent {
  dutyTasked:Task[]
  taskAdd:FormGroup
  dutyUpdateForm:FormGroup
  tasks:any
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  duty:Duty
  dutyDelete:string;
  departments:Department[]
  department:Department
  updateDutyItem:string= "POST.Updating.UpdateDutyItem"
  @Output() taskUpdate = new EventEmitter<boolean>();
  @Input()  set dutyTask(value:any){
    if(!value){return;} 
    this.updateDutyForm(value);
    this.dutyTasked=value.task;
    this.duty=value;
    this.getDutyTask()
    this.taskAddForms()
  }
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private dutyComponentService:DutyComponentService,private departmentComponentService:DepartmentComponentService){}
  ngOnInit(){
    this.getAllDepartments()
    this.dutyDelete=this.lang.deletedTask
  }

  updateDutyForm(value: any) {
    this.dutyUpdateForm = this.formBuilder.group({
      id: [value.id],
      roomId: [value.roomId, Validators.required],
      hallwayId: [value.hallwayId, Validators.required],
      floorId: [value.floorId, Validators.required],
      branchId: [value.branchId, Validators.required],
      blockId: [value.blockId, Validators.required],
      employeeId: [value.employeeId],
      dutyStartDate: [value.dutyStartDate],
      dutyEndDate: [value.dutyEndDate],
      createdDate: [value.createdDate],
      status: [value.status],
      dutyTitle: [value.dutyTitle, Validators.required],
      dutyTagId: [value.dutyTagId, Validators.required],
      taskId: [value.taskId],
      task:[value.task],
      createdUserId: [value.createdUserId],
    })
  }

  taskAddForms() {
    this.taskAdd = this.formBuilder.group({
      task: this.formBuilder.array([])
    })
  }
  get dutyTasksGroup() {
    return this.taskAdd.get("task") as FormArray
  }
  getDutyTask() {
    this.tasks = this.dutyUpdateForm.value
  }
  addTaskDuty() {
    this.dutyTasksGroup.push(this.formBuilder.group({
      taskName: ["", Validators.required],
      taskDescription: ["", Validators.required],
      departmentId: ["", Validators.required],
      status: [true]
    }))
  }
  addTask() {
    if (this.taskAdd.valid) {
      let dutyModel = Object.assign({}, this.dutyUpdateForm.value);
      let updatedDutyTasks = [...dutyModel.task];
      for (let i = 0; i < this.dutyTasksGroup.value.length; i++) {
        updatedDutyTasks.push(this.dutyTasksGroup.value[i]);
      }
      dutyModel.task = updatedDutyTasks;
      this.dutyComponentService.updateDuty(dutyModel, () => {
        this.taskUpdate.emit(true)
        this.dutyTasksGroup.clear()
      })
    } else {
      this.toastrService.error(this.lang.anErrorOccurredDuringTheUpdateProcess);
    }
  }
  removeTask(index: number) {
    this.dutyTasksGroup.removeAt(index)
  }

  deleteTask(index: number) {
    let dutyModel = Object.assign({}, this.dutyUpdateForm.value);
    let updatedDutyTasks = [...dutyModel.task];
    updatedDutyTasks.splice(index, 1);
    dutyModel.task = updatedDutyTasks;
    this.dutyComponentService.updateDuty(dutyModel, () => {
      this.taskUpdate.emit(true)
    })
  }
  async getAllDepartments() { 
    this.departments = await this.departmentComponentService.getAllDepartment()
  }
  async getDepartmentById(id: string) {
    this.department = await this.departmentComponentService.getByDepartmentId(id)
  }
}
