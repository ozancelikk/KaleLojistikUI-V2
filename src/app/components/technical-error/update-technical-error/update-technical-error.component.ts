import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import TechnicalErrorComponentService from '../../../services/component/technical-error-component.service';
import { Block } from '../../../models/block/block';
import { Branch } from '../../../models/branch/branch';
import { Employee } from '../../../models/employee/employee';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';
import { Room } from '../../../models/room/room';

import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-update-technical-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-technical-error.component.html',
  styleUrl: './update-technical-error.component.css'
})
export class UpdateTechnicalErrorComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  technicalErrorupdateForm: FormGroup;
  branchs: Branch[]
  blocks: Block[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  employees: Employee[]
  departments:Department[];
  updateRole:string="POST.Updating.TechnicalErrorUpdateTechnicalErrorItem"
  @Output() technicalErrorEvent = new EventEmitter<any>();
  @Input() set technicalError(value: any) {
    if (!value) { return; }
    this.technicalErrorForms(value)
    this.getBranchs();
    this.getRooms();
    this.getDepartments();
    this.getEmployees();
  }
  constructor(
    private technicalErrorComponentService: TechnicalErrorComponentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private employeeComponentService: EmployeeComponentService,
    private branchComponentService: BranchComponentService,
    private roomComponentService: RoomComponentService,
    private blockComponentService: BlockComponentService,
    private hallwayComponentService: HallwayComponentService,
    private floorComponentService: FloorComponentService,
    private departmentComponentService: DepartmentComponentService
  ) { }
  //#region update method
  technicalErrorForms(value: any) {
    this.technicalErrorupdateForm = this.formBuilder.group({
      id: [value.id],
      errorTitle: [value.errorTitle, Validators.required],
      errorDescription: [value.errorDescription, Validators.required],
      roomId: [value.roomId, Validators.required],
      employeeId: [value.employeeId],
      status: [value.status],
      createdDate: [value.createdDate],
      complecetedDate: [value.complecetedDate],
      departmentId: [value.departmentId, Validators.required],
      qrCodeAddress: [""],
      description:[""]
    })
  }
  updateTechnicalError() {
    if (this.technicalErrorupdateForm.valid) {
      var model = Object.assign({}, this.technicalErrorupdateForm.value)
      if (model.errorTitle.trim() == '' || model.errorDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.technicalErrorComponentService.updateTechnicalError(model, () => {
        this.technicalErrorEvent.emit()
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  //#endregion

  //#region Get Methods
  async getEmployees(){
    this.employees = await this.employeeComponentService.getAllEmployee()
  }
  async getBranchs() {
    this.branchs = await this.branchComponentService.getAllBranch()
  }

  async getRooms() {
    this.rooms = (await this.roomComponentService.getAllRoom()).data
  }
  async getDepartments() {
    this.departments = (await this.departmentComponentService.getAllDepartment())
  }

  //#endregion

  //#region  OnChangeMethods
  async onBranchChange(event: any) {
    const branchId = event.target.value;
    this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
    this.employees=(await this.employeeComponentService.getAllShiftEmployee(branchId))
  }
  async onBlockChange(event: any) {
    const blockId = event.target.value
    this.floors = (await this.floorComponentService.getAllByBlockId(blockId))
  }

  async onFloorChange(event: any) {
    const hallwayId = event.target.value
    this.hallways = (await this.hallwayComponentService.getAllByFloorId(hallwayId))
  }

  async onHallwayChange(event: any) {
    const roomId = event.target.value
    this.rooms = (await this.roomComponentService.getAllByHallwayId(roomId))
  }
  //#endregion

}
