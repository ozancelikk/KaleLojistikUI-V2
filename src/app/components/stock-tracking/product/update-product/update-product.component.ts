import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { Category } from '../../../../models/category/category';
import { Department } from '../../../../models/department/department';
import { Supplier } from '../../../../models/supplier/supplier';
import { ToastrService } from 'ngx-toastr';
import { DepartmentComponentService } from '../../../../services/component/department-component.service';
import { CategoryComponentService } from '../../../../services/component/stock-tracking/category-component.service';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';
import { SupplierComponentService } from '../../../../services/component/stock-tracking/supplier-component.service';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { Block } from '../../../../models/block/block';
import { Branch } from '../../../../models/branch/branch';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
import { Room } from '../../../../models/room/room';

declare var $: any
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  updateRole:string="POST.Updating.UpdateProductItem"
  @Output() productEvent = new EventEmitter<any>();
  @Input() set productDetail(value: any) {
    if (!value) { return; }
    this.productUpdateForms(value);
    this.getbyRoomId(value.warehouseLocation)
  }
  productUpdateForm: FormGroup;
  suppliers: Supplier[];
  departments: Department[];
  categories: Category[];
  rooms: Room[];
  hallways: Hallway[];
  blocks: Block[];
  floors: Floor[];
  branchs: Branch[];
  roomName: string
  constructor(
    private productComponentService: ProductComponentService,
    private supplierComponentService: SupplierComponentService,
    private departmentComponentService: DepartmentComponentService,
    private categoryComponentService: CategoryComponentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private branchComponentService: BranchComponentService,
    private blockComponentService: BlockComponentService,
    private floorComponentService: FloorComponentService,
    private hallwayComponentService: HallwayComponentService,
    private roomComponentService: RoomComponentService
  ) { }
  ngOnInit() {
    this.getSuppliers();
    this.getDepartments();
    this.getCategories();
    this.getAllBranch();
  }
  //#region Update Method
  productUpdateForms(value: any) {
    this.productUpdateForm = this.formBuilder.group({
      id: [value.id],
      name: [value.name, Validators.required],
      threshold: [value.threshold, Validators.required],
      price: [value.price, Validators.required],
      stockQuantity: [value.stockQuantity, Validators.required],
      categoryId: [value.categoryId, Validators.required],
      departmentId: [value.departmentId, Validators.required],
      supplierId: [value.supplierId, Validators.required],
      warehouseLocation: [value.warehouseLocation, Validators.required],
      disposable: [value.disposable, Validators.required]
    });
  }
  updateProduct() {
    if (this.productUpdateForm.valid) {
      var productModel = Object.assign({}, this.productUpdateForm.value);
      if (productModel.name.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.productComponentService.updateProduct(productModel, () => {
        $('#updateProductModal').modal('hide');
        this.productEvent.emit();
      });
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error);
    }
  }
  //#endregion

  //#region GetMethods
  async getSuppliers() {
    this.suppliers = await this.supplierComponentService.getAllSupplier();
  }
  async getDepartments() {
    this.departments = await this.departmentComponentService.getAllDepartment();
  }
  async getCategories() {
    this.categories = await this.categoryComponentService.getAllCategory();
  }
  async getAllBranch() {
    this.branchs = (await this.branchComponentService.getAllBranch())
  }
  async getbyRoomId(id: string) {
    this.roomName = (await this.roomComponentService.getByRoomId(id)).roomName
  }
  //#endregion

  //#region OnChange Methods
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
  async onHallwayChange(event: any) {
    const hallwayId = event.target.value
    this.rooms = (await this.roomComponentService.getAllByHallwayId(hallwayId))
  }
  async onFloorChange(event: any) {
    const floorId = event.target.value
    this.hallways = (await this.hallwayComponentService.getAllByFloorId(floorId))
  }
  //#endregion

}
