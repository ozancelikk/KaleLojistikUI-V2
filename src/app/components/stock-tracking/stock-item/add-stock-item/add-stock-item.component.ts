import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { StockItemComponentService } from '../../../../services/component/stock-tracking/stock-item-component.service';
import { ToastrService } from 'ngx-toastr';
import { Room } from '../../../../models/room/room';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { Block } from '../../../../models/block/block';
import { Branch } from '../../../../models/branch/branch';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
import { EmployeeComponentService } from '../../../../services/component/employee-component.service';
import { Employee } from '../../../../models/employee/employee';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';
import { Product } from '../../../../models/product/product';
import { Department } from '../../../../models/department/department';
import { DepartmentComponentService } from '../../../../services/component/department-component.service';
declare var $: any;

@Component({
  selector: 'app-add-stock-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-stock-item.component.html',
  styleUrl: './add-stock-item.component.css'
})
export class AddStockItemComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  stockItemForm: FormGroup
  @Output() addStockItemEvent = new EventEmitter<any>();
  roomList: Room[] = []
  blocks: Block[];
  branchs: Branch[];
  hallways: Hallway[];
  rooms: Room[];
  floors: Floor[];
  employees: Employee[];
  products: Product[]
  room: Room
  departments:Department[]
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
    private productComponentService: ProductComponentService,
    private departmentComponentService:DepartmentComponentService
  ) { }
  ngOnInit() {
    this.getAllBranch()
    this.getAllEmployee()
    this.getAllProduct()
    this.createStockItemForm()
    this.getallDepartment()
  }

  //#region Add Methods
  createStockItemForm() {
    this.stockItemForm = this.formBuilder.group({
      productId: ["", Validators.required],
      quantity: ["", Validators.required],
      entryDate: ["", Validators.required],
      description: ["", Validators.required],
      employeeId: ["", Validators.required],
      departmentId: ["", Validators.required],
      roomId: [""]
    })
  }
  addStockItem() {
    this.stockItemForm.get("roomId").setValue(this.roomList);
    if (this.stockItemForm.valid) {
      var stockItemModel = Object.assign({}, this.stockItemForm.value)
      if (stockItemModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.stockItemComponentService.addStockItem(stockItemModel, () => {
        $('#addStockItemModal').modal('hide');
        this.addStockItemEvent.emit(true)
        this.createStockItemForm()
        this.roomList = []
        this.branchs = []
        this.getAllBranch()
        this.blocks = []
        this.floors = []
        this.hallways = []
        this.branchSelect.nativeElement.value = "";
        this.blockSelect.nativeElement.value = "";
        this.floorSelect.nativeElement.value = "";
        this.hallwaySelect.nativeElement.value = "";
        
        
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error);
    }
  }
  @ViewChild('branchSelect') branchSelect: ElementRef;
  @ViewChild('blockSelect') blockSelect: ElementRef;
  @ViewChild('floorSelect') floorSelect: ElementRef;
  @ViewChild('hallwaySelect') hallwaySelect: ElementRef;
  //#endregion

  //#region room add
  async addRoom() {
    var emp = this.stockItemForm.get("roomId").value
    await this.getbyRoomId(emp)
    this.roomList.push(this.room)
    this.stockItemForm.get("roomId").setValue(null)
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
  async getallDepartment(){
    this.departments = await this.departmentComponentService.getAllDepartment()
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
