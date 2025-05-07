import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Floor } from '../../../models/floor/floor';
import { Branch } from '../../../models/branch/branch';
import { Block } from '../../../models/block/block';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { Hallway } from '../../../models/hallway/hallway';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent {
  updateRole:string="POST.Updating.UpdateRoomItem"
  @Output() roomEvent = new EventEmitter<any>()
  @Input() set roomDetail(value: any) {
    if (!value) return
    this.updateRoomForm(value)
  }
  protected roomUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  floors: Floor[];
  branchs: Branch[];
  blocks: Block[];
  hallways: Hallway[];

  constructor(private roomComponentService: RoomComponentService, private formBuilder: FormBuilder,
    private floorComponentService: FloorComponentService,
    private blockComponentService: BlockComponentService,
    private branchComponentService: BranchComponentService,
    private hallwayComponentService: HallwayComponentService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllBranch();
    this.getAllBlock();
    this.getAllFloor();
    this.getAllHallway();

  }

  updateRoomForm(value: any) {
    this.roomUpdateForm = this.formBuilder.group({
      id: [value.id],
      roomName: [value.roomName, Validators.required],
      roomDescription: [value.roomDescription, Validators.required],
      roomNumber: [value.roomNumber, Validators.required],
      floorId: [value.floorId, Validators.required],
      blockId: [value.blockId, Validators.required],
      hallwayId: [value.hallwayId, Validators.required],
      branchId: [value.branchId, Validators.required],
      qrCodeAdress: [value.qrCodeAdress],
      status: [value.status, Validators.required],
    })
  }

  updateRoom() {
    if (this.roomUpdateForm.valid) {
      const model = Object.assign({}, this.roomUpdateForm.value)
      if(model.roomName.trim() ==''){
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      } 
      this.roomComponentService.updateRoom(model, () => {
        this.roomEvent.emit(true)
        $('#updateModal').modal('hide')
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  async getAllBlock(successCallBack?: () => void) {
    this.blocks = (await this.blockComponentService.getAllBlock())

    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  }

  async getAllFloor(successCallBack?: () => void) {
    this.floors = (await this.floorComponentService.getAllFloor())
    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllHallway(successCallBack?: () => void) {
    this.hallways = (await this.hallwayComponentService.getAllHallway())
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
}
