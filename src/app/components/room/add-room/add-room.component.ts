import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { Floor } from '../../../models/floor/floor';
import { Branch } from '../../../models/branch/branch';
import { Block } from '../../../models/block/block';
import { Employee } from '../../../models/employee/employee';
import { Hallway } from '../../../models/hallway/hallway';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
declare var $: any;

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  @Output() roomEvent = new EventEmitter<any>()
  @Output() roomGraficEvent = new EventEmitter<any>()
  protected roomAddForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  //Model
  floors: Floor[];
  branchs: Branch[];
  blocks: Block[];
  employeeies: Employee[];
  hallways: Hallway[];
  dataLoaded = false;

  constructor(
    private roomComponentService: RoomComponentService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private floorComponentService: FloorComponentService,
    private branchComponentService: BranchComponentService,
    private blockComponentService: BlockComponentService,
    private hallwayComponentService: HallwayComponentService
  ) {
  }

  ngOnInit(): void {
    this.createNewRoomForm()
    this.getAllBranch();
  }
  //#region AddRoom

  createNewRoomForm() {
    this.roomAddForm = this.formBuilder.group({
      branchId: ["", Validators.required],
      blockId: ["", Validators.required],
      floorId: ["", Validators.required],
      hallwayId: ["", Validators.required],
      qrCodeAdress: [""],
      roomName: ["", Validators.required],
      roomDescription: ["", Validators.required],
      roomNumber: ["", Validators.required],
      status: ["", Validators.required],
    })
  }

  addRoom() {
    if (this.roomAddForm.valid) {
      const model = Object.assign({}, this.roomAddForm.value)
      if(model.roomName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      } 
      this.roomComponentService.addRoom(model, () => {
        this.roomEvent.emit(true)
        this.roomGraficEvent.emit(true)
        this.createNewRoomForm()
        $('#roomAddModal').modal('hide');
      })
    }else{
      this.toastrService.info(this.lang.pleaseFillİnformation,this.lang.error)
    }

  }

  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  }

  async onBranchChange(event: any) {
    const branchId = event.target.value;
    this.blocks = (await this.blockComponentService.getAllByBranchId(branchId))
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

  //#endregion



}
