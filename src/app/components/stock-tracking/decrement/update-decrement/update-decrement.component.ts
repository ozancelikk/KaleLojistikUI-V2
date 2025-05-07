import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Block } from '../../../../models/block/block';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { Branch } from '../../../../models/branch/branch';
import { Employee } from '../../../../models/employee/employee';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
import { Product } from '../../../../models/product/product';
import { Room } from '../../../../models/room/room';
import { ToastrService } from 'ngx-toastr';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { EmployeeComponentService } from '../../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { DecrementComponentService } from '../../../../services/component/stock-tracking/decrement-component.service';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';

declare var $: any;

@Component({
  selector: 'app-update-decrement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-decrement.component.html',
  styleUrl: './update-decrement.component.css'
})
export class UpdateDecrementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  branchs: Branch[]
  blocks: Block[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  employees: Employee[]
  products: Product[]
  updateRole:string="POST.Updating.UpdateDecrementItem"
  decrementUpdateForm: FormGroup
  @Output() decrementEmit = new EventEmitter<any>();
  @Input() set decrementDetails(value: any) {
    if (!value) { return }
    this.decrementUpdateForms(value)
  }
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private blockComponentService: BlockComponentService,
    private branchComponentService: BranchComponentService,
    private roomComponentService: RoomComponentService,
    private hallwayComponentService: HallwayComponentService,
    private floorComponentService: FloorComponentService,
    private employeeComponentService: EmployeeComponentService,
    private productComponentService: ProductComponentService,
    private decrementComponentService: DecrementComponentService
  ) { }
  ngOnInit() {
    this.getAllBlock()
    this.getAllBranch()
    this.getAllEmployee()
    this.getAllFloor()
    this.getAllHallway()
    this.getAllRoom()
    this.getAllProduct()
  }
  //#region updateMethod

  decrementUpdateForms(value: any) {
    this.decrementUpdateForm = this.formBuilder.group({
      id: [value.id],
      productId: [value.productId, Validators.required],
      quantity: [value.quantity, Validators.required],
      decremantQuantity: [value.decremantQuantity, Validators.required],
      date: [value.date, Validators.required],
      employeeId: [value.employeeId, Validators.required],
      description: [value.description, Validators.required],
      areaId: [value.areaId, Validators.required]
    })
  }
  decrementUpdate() {
    if (this.decrementUpdateForm.valid) {
      var decrementModel = Object.assign({}, this.decrementUpdateForm.value)
      if (decrementModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.decrementComponentService.updateDecrement(decrementModel, () => {
        this.decrementEmit.emit(true)
        $('#updateDecrementModal').modal('hide')
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  //#endregion

  //#region GetMethods
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
  async getAllEmployee() {
    this.employees = (await this.employeeComponentService.getAllEmployee())
  }
  async getAllProduct() {
    this.products = await this.productComponentService.getAllProduct()
  }
  //#endregion

  //#region  OnChangeMethods
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

  async onHallwayChange(event: any) {
    const roomId = event.target.value
    this.rooms = []
    this.rooms = (await this.roomComponentService.getAllByHallwayId(roomId))
  }
  //#endregion

}
