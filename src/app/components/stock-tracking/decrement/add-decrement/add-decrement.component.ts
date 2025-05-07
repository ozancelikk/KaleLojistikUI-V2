import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { Branch } from '../../../../models/branch/branch';
import { Block } from '../../../../models/block/block';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
import { Room } from '../../../../models/room/room';
import { ToastrService } from 'ngx-toastr';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { EmployeeComponentService } from '../../../../services/component/employee-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';
import { Employee } from '../../../../models/employee/employee';
import { Product } from '../../../../models/product/product';
import { DecrementComponentService } from '../../../../services/component/stock-tracking/decrement-component.service';
declare var $: any;

@Component({
  selector: 'app-add-decrement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-decrement.component.html',
  styleUrl: './add-decrement.component.css'
})
export class AddDecrementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() decrementEmit = new EventEmitter<any>();
  branchs: Branch[]
  blocks: Block[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  employees: Employee[]
  products: Product[]
  decrementAddForm: FormGroup

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
    this.getAllBranch()
    this.getAllEmployee()
    this.getAllProduct()
    this.createDecrementAddForm()
  }

  //#region Add Methods
  createDecrementAddForm() {
    this.decrementAddForm = this.formBuilder.group({
      productId: ["", Validators.required],
      decremantQuantity: ["", Validators.required],
      date: ["", Validators.required],
      employeeId: ["", Validators.required],
      description: ["", Validators.required],
      areaId: ["", Validators.required]
    })
  }
  addDecrement() {
    if (this.decrementAddForm.valid) {
      var decrementModel = Object.assign({}, this.decrementAddForm.value)
      if (decrementModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      decrementModel.description = decrementModel.description.trim()
      this.decrementComponentService.addDecrement(decrementModel, () => {
        this.decrementEmit.emit(true)
        this.createDecrementAddForm()
        $('#addDecrementModal').modal('hide')
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
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  @ViewChild('branchSelect') branchSelect: ElementRef;
  @ViewChild('blockSelect') blockSelect: ElementRef;
  @ViewChild('floorSelect') floorSelect: ElementRef;
  @ViewChild('hallwaySelect') hallwaySelect: ElementRef;

  //#endregion

  //#region GetMethods
  async getAllBranch() {
    this.branchs = (await this.branchComponentService.getAllBranch())
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
