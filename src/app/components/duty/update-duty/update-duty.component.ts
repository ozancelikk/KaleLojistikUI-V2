import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { Block } from '../../../models/block/block';
import { Branch } from '../../../models/branch/branch';
import { Duty } from '../../../models/duty/duty';
import { Employee } from '../../../models/employee/employee';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';
import { Room } from '../../../models/room/room';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { DutyTagComponentService } from '../../../services/component/duty-tag-component.service';
import { Department } from '../../../models/department/department';
import { DutyTag } from '../../../models/dutyTag/dutyTag';
import { EmployeeDto } from '../../../models/employee/employeeDto';
import { AdditionalTaskComponentService } from '../../../services/component/additional-task-component.service';
import { AdditionalTask } from '../../../models/additionalTask/additionalTask';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-duty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-duty.component.html',
  styleUrl: './update-duty.component.css'
})
export class UpdateDutyComponent {
  blocks: Block[];
  branchs: Branch[];
  duty: Duty;
  block: Block
  hallways: Hallway[];
  rooms: Room[];
  floors: Floor[];
  employees: Employee[];
  departments:Department[]
  dutyTags:DutyTag[]
  employeelList:EmployeeDto[]=[]
  employee:EmployeeDto
  emp:any
  additionalTasks: AdditionalTask[]
  updateDutyItem:string= "POST.Updating.UpdateDutyItem"

  @Output() dutyEvent = new EventEmitter<any>()
  @Input() set dutyDetail(value: any) {
    if (!value) return
    this.updateDutyForm(value)
    this.employeelList=value.employeeId
    this.getAllShiftEmployee(value.branchId)
  }
  protected dutyUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private dutyComponentService: DutyComponentService, private formBuilder: FormBuilder,
    private blockComponentService: BlockComponentService,
    private branchComponentService: BranchComponentService,
    private roomComponentService: RoomComponentService,
    private hallwayComponentService: HallwayComponentService,
    private floorComponentService: FloorComponentService,
    private employeeComponentService: EmployeeComponentService,
    private departmentComponentService:DepartmentComponentService,
    private dutyTagComponentService:DutyTagComponentService,
    private additionalTaskComponentService: AdditionalTaskComponentService,
    private toastrService: ToastrService) 
   { }

  ngOnInit() {
    this.getAllBlock()
    this.getAllBranch()
    this.getAllFloor()
    this.getAllHallway()
    this.getAllRoom()
    this.getAllDepartment()
    this.getAllDutyTag()
    this.getAllAdditionalTask()
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
      startTime: [value.startTime],
      endTime: [value.endTime],
    })
  }
  async addEmployee(){
    var emp=this.dutyUpdateForm.get("employeeId").value
    await this.getbyEmployeeId(emp)
    this.employeelList.push(this.employee)
    this.dutyUpdateForm.get("employeeId").setValue(null)
  }
  removeEmployee(index:number){
    const employeeArray = this.employeelList;
    if (employeeArray.length > 0) {
      employeeArray.splice(index,1);
    }
  }

  updateDuty() {
    if (!this.dutyUpdateForm.valid) {
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.dutyUpdateForm.get("employeeId").setValue(this.employeelList)
    const model = Object.assign({}, this.dutyUpdateForm.value)
    if(model.dutyTitle.trim() ==''){
      this.toastrService.error(this.lang.pleaseFillİnformation)
      return
    }
    this.dutyComponentService.updateDuty(model, () => {
      this.dutyEvent.emit(true)
    })
  }
  async getbyEmployeeId(id: string) {
    this.employee = (await this.employeeComponentService.getByEmployeeId(id))
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
  async getAllRoom() {
    this.rooms = (await this.roomComponentService.getAllRoom()).data
  }
  async getAllBlock() {
    this.blocks = (await this.blockComponentService.getAllBlock())
  }
  async getAllHallway() {
    this.hallways = (await this.hallwayComponentService.getAllHallway())
  }
  async getAllFloor() {
    this.floors = (await this.floorComponentService.getAllFloor())
  }
  async getAllShiftEmployee(id:string) {
    this.employees = (await this.employeeComponentService.getAllShiftEmployee(id))
  }
  async getAllDepartment(){
    this.departments = (await this.departmentComponentService.getAllDepartment())
  }
  async getAllDutyTag(){
    this.dutyTags = (await this.dutyTagComponentService.getAllDutyTag())
  }
  async getAllAdditionalTask() {
    this.additionalTasks = (await this.additionalTaskComponentService.getAllDetails())
  }
}
