import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { EmployeeComponentService } from '../../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';
import { StockItemComponentService } from '../../../../services/component/stock-tracking/stock-item-component.service';
import { Block } from '../../../../models/block/block';
import { Branch } from '../../../../models/branch/branch';
import { Employee } from '../../../../models/employee/employee';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
import { Product } from '../../../../models/product/product';
import { Room } from '../../../../models/room/room';

declare var $: any

@Component({
  selector: 'app-update-stock-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-stock-item.component.html',
  styleUrl: './update-stock-item.component.css'
})
export class UpdateStockItemComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  updateRole:string="POST.Updating.UpdateStockItemItem"
  updateStockForm: FormGroup
  roomList: Room[] = []
  blocks: Block[];
  branchs: Branch[];
  hallways: Hallway[];
  rooms: Room[];
  floors: Floor[];
  employees: Employee[];
  products: Product[]
  room: Room
  @Output() updateStockItemEvent = new EventEmitter<any>();
  @Input() set stockItem(value: any) {
    if (!value) { return }
    this.roomList = value.roomId
    this.updateStockItemForm(value);
  }
  constructor(
    private stockItemComponentService: StockItemComponentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private blockComponentService: BlockComponentService,
    private branchComponentService: BranchComponentService,
    private roomComponentService: RoomComponentService,
    private hallwayComponentService: HallwayComponentService,
    private floorComponentService: FloorComponentService,
    private employeeComponentService: EmployeeComponentService,
    private productComponentService: ProductComponentService
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
  updateStockItemForm(value: any) {
    this.updateStockForm = this.formBuilder.group({
      id: [value.id],
      productId: [value.productId, Validators.required],
      quantity: [value.quantity, Validators.required],
      entryDate: [value.entryDate, Validators.required],
      description: [value.description, Validators.required],
      employeeId: [value.employeeId, Validators.required],
      roomId: [value.roomId, Validators.required]
    })
  }
  updateStockItem() {
    this.updateStockForm.get("roomId").setValue(this.roomList)
    if (this.updateStockForm.valid) {
      var stockItemModel = Object.assign({}, this.updateStockForm.value)
      if (stockItemModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.stockItemComponentService.updateStockItem(stockItemModel, () => {
        $('#updateStockItemModal').modal('hide')
        this.updateStockItemEvent.emit()
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  //#region room add
  async addRoom() {
    var emp = this.updateStockForm.get("roomId").value
    await this.getbyRoomId(emp)
    this.roomList.push(this.room)
    this.updateStockForm.get("roomId").setValue(null)
  }
  removeRoom(index: number) {
    const roomArray = this.roomList;
    if (roomArray.length > 0) {
      roomArray.splice(index, 1);
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
  async getbyRoomId(id: string) {
    this.room = await this.roomComponentService.getByRoomId(id)
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
