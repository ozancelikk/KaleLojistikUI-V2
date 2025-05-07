import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { ProductComponentService } from '../../../../services/component/stock-tracking/product-component.service';
import { SupplierComponentService } from '../../../../services/component/stock-tracking/supplier-component.service';
import { DepartmentComponentService } from '../../../../services/component/department-component.service';
import { CategoryComponentService } from '../../../../services/component/stock-tracking/category-component.service';
import { Supplier } from '../../../../models/supplier/supplier';
import { Department } from '../../../../models/department/department';
import { Category } from '../../../../models/category/category';
import { ToastrService } from 'ngx-toastr';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { Room } from '../../../../models/room/room';
import { Block } from '../../../../models/block/block';
import { Branch } from '../../../../models/branch/branch';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';
declare var $: any

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() productEvent = new EventEmitter<any>();
  productForm: FormGroup;
  suppliers: Supplier[];
  departments: Department[];
  categories: Category[];
  rooms: Room[];
  hallways: Hallway[];
  blocks: Block[];
  floors: Floor[];
  branchs: Branch[];
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
    this.createProductForm();
    this.getSuppliers();
    this.getDepartments();
    this.getCategories();
    this.getAllBranch();
  }
  //#region add Method
  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      threshold: [Validators.required, Validators.min(0)],
      price: [Validators.required, Validators.min(0)],
      stockQuantity: [Validators.required, Validators.min(0)],
      categoryId: ["", Validators.required],
      departmentId: ["", Validators.required],
      supplierId: ["", Validators.required],
      warehouseLocation: ["", Validators.required],
      disposable: ["", Validators.required]
    });
  }
  addProduct() {
    if (this.productForm.valid) {
      var productModel = Object.assign({}, this.productForm.value)
      if (productModel.name.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.productComponentService.addProduct(productModel, () => {
        this.createProductForm(); 
        $('#addProductModal').modal('hide');
        this.productEvent.emit();
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
