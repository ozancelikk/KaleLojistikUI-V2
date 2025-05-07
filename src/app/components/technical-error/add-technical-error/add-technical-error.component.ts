import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import TechnicalErrorComponentService from '../../../services/component/technical-error-component.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { Branch } from '../../../models/branch/branch';
import { Block } from '../../../models/block/block';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';
import { Room } from '../../../models/room/room';
import { Employee } from '../../../models/employee/employee';
import { DepartmentComponentService } from '../../../services/component/department-component.service';
import { Department } from '../../../models/department/department';

@Component({
  selector: 'app-add-technical-error',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-technical-error.component.html',
  styleUrl: './add-technical-error.component.css'
})
export class AddTechnicalErrorComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  technicalErrorAddForm: FormGroup;
  branchs: Branch[]
  blocks: Block[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  employees: Employee[]
  departments:Department[]
  @Output() technicalErrorEvent = new EventEmitter<any>();
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

  ngOnInit(): void {
    this.createTechnicalErrorAddForm();
    this.getBranchs();
    this.getAllEmployee();
    this.getAllDepartment();
  }
  //#region  add method
  createTechnicalErrorAddForm() {
    this.technicalErrorAddForm = this.formBuilder.group({
      errorTitle: ["", Validators.required],
      errorDescription: ["", Validators.required],
      roomId: ["", Validators.required],
      departmentId: ["", Validators.required],
      employeeId: [""],
      complecetedDate: [this.lang.notFinishedYet],
      description:[""]
    })
  }
  addTechnicalError() {
    if (this.technicalErrorAddForm.valid) {
      var model = Object.assign({}, this.technicalErrorAddForm.value)
      if (model.errorTitle.trim() == '' || model.errorDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      if (model.employeeId == '') {
        model.employeeId = null
      }
      this.technicalErrorComponentService.addTechnicalError(model, () => {
        this.createTechnicalErrorAddForm();
        this.technicalErrorEvent.emit(true);
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  //#endregion

  //#region Get Methods
  async getBranchs() {
    this.branchs = await this.branchComponentService.getAllBranch()
  }

  async getAllEmployee() {
    this.employees = (await this.employeeComponentService.getAllEmployee())
  }
  async getAllDepartment() {
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
