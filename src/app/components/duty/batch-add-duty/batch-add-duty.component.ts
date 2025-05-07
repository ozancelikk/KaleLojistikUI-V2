import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { DutyTagComponentService } from '../../../services/component/duty-tag-component.service';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { ToastrService } from 'ngx-toastr';
import { Block } from '../../../models/block/block';
import { Branch } from '../../../models/branch/branch';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';
import { Room } from '../../../models/room/room';
import { AdditionalTask } from '../../../models/additionalTask/additionalTask';
import { DutyTag } from '../../../models/dutyTag/dutyTag';
import { Employee } from '../../../models/employee/employee';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';
import { EmployeeDto } from '../../../models/employee/employeeDto';

@Component({
  selector: 'app-batch-add-duty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './batch-add-duty.component.html',
  styleUrl: './batch-add-duty.component.css'
})
export class BatchAddDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() dutyAddEvent = new EventEmitter<any>()
  constructor(private dutyComponentService: DutyComponentService, private employeeComponentService: EmployeeComponentService, private branchComponentService: BranchComponentService, private blockComponentService: BlockComponentService, private floorComponentService: FloorComponentService, private hallwayComponentService: HallwayComponentService, private roomComponentService: RoomComponentService, private dutyTagComponentService: DutyTagComponentService, private additionalTaskComponentService: AdditionalTaskComponentService, private toastrService: ToastrService, private departmentComponentService: DepartmentComponentService, private formBuilder: FormBuilder) { }
  dutyAddForm: FormGroup
  blocks: Block[]
  branchs: Branch[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  employees: Employee[]
  dutyTags: DutyTag[]
  departments: Department[]
  additionalTasks: AdditionalTask[]
  employeelList: EmployeeDto[] = []
  employee: EmployeeDto
  roomList: Room[] = []
  roomListId: string[] = []
  dutyDelete: string
  ngOnInit(){
    this.getAllBranchs();
    this.getAllEmployees();
    this.getAllAdditionalTasks();
    this.getAllDutyTags();
    this.getAllDepartment();
    this.createNewDutyForm();
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
      dutyStartDate: [this.lang.notStartedYet],
      dutyEndDate: [this.lang.notFinishedYet],
      createdDate: [currentDate],
      status: [true],
      dutyTitle: ["", Validators.required],
      dutyTagId: ["", Validators.required],
      taskId: [""],
      task: this.formBuilder.array([]),
      createdUserId: [localStorage.getItem("userId")],
      startTime: [""],
      endTime: [""],
    })
  }
  get tasksArray(): FormArray {
    return this.dutyAddForm.get('task') as FormArray;
  }

  addTask() {
    this.tasksArray.push(this.newTask());
  }
  async addEmployee() {
    var emp = this.dutyAddForm.get("employeeId").value
    await this.getbyEmployeeId(emp)
    this.employeelList.push(this.employee)
    this.dutyAddForm.get("employeeId").setValue(null)
  }
  async addRoom() {
    var rooms = this.dutyAddForm.get("roomId").value
    this.roomListId.push(rooms)
    var dat=await this.roomComponentService.getByRoomId(rooms)
    this.roomList.push(dat)
    console.log(this.roomList);
    
    this.dutyAddForm.get("roomId").setValue(null)
  }
  async getbyEmployeeId(id: string) {
    this.employee = await this.employeeComponentService.getByEmployeeId(id)
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
      employeeArray.splice(index, 1);
    }
  }
  removeRoom(index: number) {
    const roomArray = this.roomList;
    if (roomArray.length > 0) {
      roomArray.splice(index, 1);
    }
  }
  adduty() {
    var emp=this.dutyAddForm.get("employeeId").setValue(this.employeelList)
    this.dutyAddForm.get("roomId").setValue(this.roomListId)
    if (this.dutyAddForm.valid) {
      var a = document.getElementById("bell")
      a.classList.add("bells")
      const model = Object.assign({}, this.dutyAddForm.value)
      if(model.dutyTitle.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.dutyComponentService.dutyAddBatch(model, () => {
        this.dutyAddEvent.emit(true)
        this.createNewDutyForm()
        this.employeelList=[]
      }) 
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }

  async getAllBranchs() {
    this.branchs = await this.branchComponentService.getAllBranch()
  }
  async getAllEmployees() {
    this.employees = await this.employeeComponentService.getAllEmployee()
  }
  async getAllAdditionalTasks() {
    this.additionalTasks = await this.additionalTaskComponentService.getAllAdditionalTask()
  }
  async getAllDutyTags() {
    this.dutyTags = await this.dutyTagComponentService.getAllDutyTag()
  }
  async getAllDepartment() {
    this.departments = await this.departmentComponentService.getAllDepartment()
  }
  async onBranchChange(event: any) {
    const branchId = event.target.value;
    this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
    this.employees = (await this.employeeComponentService.getAllShiftEmployee(branchId))
    this.floors = [];
  }
  async onBlockChange(event: any) {
    const blockId = event.target.value;
    this.floors = (await this.floorComponentService.getAllByBlockId(blockId))
    this.hallways = [];
  }
  async onFloorChange(event: any) {
    const floorId = event.target.value;
    this.hallways = (await this.hallwayComponentService.getAllByFloorId(floorId))
    this.rooms = [];
  }
  async onHallwayChange(event: any) {
    const hallwayId = event.target.value;
    this.rooms = (await this.roomComponentService.getAllByHallwayId(hallwayId))
  }


}
