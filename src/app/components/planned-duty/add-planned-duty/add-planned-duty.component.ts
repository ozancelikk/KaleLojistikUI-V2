import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { PlannedDutyComponentService } from '../../../services/component/planned-duty-component.service';
import { PlannedDuty } from '../../../models/plannedDuty/plannedDuty'; 
import { AdditionalTask } from '../../../models/additionalTask/additionalTask';
import { Branch } from '../../../models/branch/branch';
import { Department } from '../../../models/department/department';
import { DutyTag } from '../../../models/dutyTag/dutyTag';
import { Employee } from '../../../models/employee/employee';
import { EmployeeDto } from '../../../models/employee/employeeDto';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';
import { Room } from '../../../models/room/room';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { DutyTagComponentService } from '../../../services/component/duty-tag-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { Block } from '../../../models/block/block';

@Component({
  selector: 'app-add-planned-duty',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-planned-duty.component.html',
  styleUrl: './add-planned-duty.component.css'
})
export class AddPlannedDutyComponent {
  blocks: Block[];
    branchs: Branch[];
    duty: PlannedDuty;
    block: Block
    hallways: Hallway[];
    rooms: Room[];
    floors: Floor[];
    employees: Employee[];
    branchId: string
    employeeId: string
    additionalTasks:AdditionalTask[]
    dutyTag:DutyTag[]
    departments:Department[]
    employeelList:EmployeeDto[]=[]
    employee:EmployeeDto
    emp:any
    dutyDelete:string;
  
    @Output() dutyAddEvent = new EventEmitter<any>()
    
    protected dutyAddForm: FormGroup
    lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
    constructor(
      private plannedDutyComponentService: PlannedDutyComponentService, 
      private formBuilder: FormBuilder,
      private blockComponentService: BlockComponentService,
      private branchComponentService: BranchComponentService,
      private roomComponentService: RoomComponentService,
      private hallwayComponentService: HallwayComponentService,
      private floorComponentService: FloorComponentService,
      private employeeComponentService: EmployeeComponentService,
      private additionalTaskComponentService: AdditionalTaskComponentService,
      private dutyTagComponentService:DutyTagComponentService,
      private departmentComponentService:DepartmentComponentService,
      private toastrService:ToastrService
      ) {
      this.createNewDutyForm()
    }
    ngOnInit(){
      this.getAllBranch()
      this.getAllEmployee()
      this.getAllAdditionalTask()
      this.getAllDutyTag()
      this.getAllDepartment()
      this.dutyDelete=this.lang.deletedTask
    }
  
    createNewDutyForm() {
      const currentDate = Date.now.toString();
      this.dutyAddForm = this.formBuilder.group({
        roomId: [""],
        hallwayId: ["", Validators.required],
        floorId: ["", Validators.required],
        branchId: ["", Validators.required],
        blockId: ["", Validators.required],
        employeeId: [""],
        dutyStartDate: ["Henüz Başlamadı"],
        dutyEndDate: ["Henüz Bitmedi"],
        createdDate: ["",Validators.required],
        status: [true],
        dutyTitle: ["", Validators.required],
        dutyTagId: ["", Validators.required],
        taskId: [""],
        task:this.formBuilder.array([]),
        createdUserId: [localStorage.getItem("userId")],
        startTime: [""],
        endTime: [""],
      });
    }
    //#region  Task
    get tasksArray(): FormArray {
      return this.dutyAddForm.get('task') as FormArray;
    }
  
    addTask() {
      this.tasksArray.push(this.newTask());
    }
    async addEmployee(){
      var emp=this.dutyAddForm.get("employeeId").value
      await this.getbyEmployeeId(emp)
      this.employeelList.push(this.employee)
      this.dutyAddForm.get("employeeId").setValue(null)
    }
    async getbyEmployeeId(id:string){
      this.employee=await this.employeeComponentService.getByEmployeeId(id)
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
    removeEmployee(index: number) {
      const employeeArray = this.employeelList;
      if (employeeArray.length > 0) {
        employeeArray.splice(index,1);
      }
    }
  
  //#endregion
  
  
    addPlannedDuty() {
      this.dutyAddForm.get("employeeId").setValue(this.employeelList)
      if (this.dutyAddForm.valid) {
        const model = Object.assign({}, this.dutyAddForm.value)
        if(model.dutyTitle.trim() ==''){
          this.toastrService.error(this.lang.pleaseFillİnformation)
          return
        }
        this.plannedDutyComponentService.addPlannedDuty(model, () => {
          this.dutyAddEvent.emit(true)
          this.createNewDutyForm()
          this.employeelList=[]
        }) 
      }else{
        this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
      }
    }
    async onBranchChange(event: any) {
      const branchId = event.target.value;
      this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
      this.employees=(await this.employeeComponentService.getAllShiftEmployee(branchId))
      this.floors = [];
    }
    async onBlockChange(event: any) {
      const blockId = event.target.value
      this.floors = (await this.floorComponentService.getAllByBlockId(blockId))
      this.hallways = [];
    }
  
    async onFloorChange(event: any) {
      const hallwayId = event.target.value
      this.hallways = (await this.hallwayComponentService.getAllByFloorId(hallwayId))
    }
  
    async onHallwayChange(event: any) {
      const roomId = event.target.value
      this.rooms = (await this.roomComponentService.getAllByHallwayId(roomId))
    }
    
    async getAllBranch() {
      this.branchs = (await this.branchComponentService.getAllBranch())
    }
    async getAllEmployee() {
      this.employees = (await this.employeeComponentService.getAllEmployee())
    }
    async getAllAdditionalTask() {
      this.additionalTasks = (await this.additionalTaskComponentService.getAllAdditionalTask())
    }
    async getAllDutyTag() {
      this.dutyTag = (await this.dutyTagComponentService.getAllDutyTag())
    }
    async getAllDepartment() {
      this.departments = (await this.departmentComponentService.getAllDepartment())
    }

}
