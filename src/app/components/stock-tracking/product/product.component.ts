import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NavbarProductComponent } from './navbar-product/navbar-product.component';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Product } from '../../../models/product/product';
import { ProductComponentService } from '../../../services/component/stock-tracking/product-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { changeDataTableHeight } from '../../../../assets/js/main';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { CategoryComponent } from '../category/category.component';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddProductComponent,UpdateProductComponent,NavbarProductComponent,CategoryComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  products:Product[];
  product:Product;
  productDeleteId:boolean;

  constructor(private productComponentService:ProductComponentService,private dialog:MatDialog) {}

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.categoryName, unSortIcon: true, },
    { field: 'threshold', headerName: this.lang.threshold, unSortIcon: true, },
    { field: 'price', headerName: this.lang.price, unSortIcon: true, },
    { field: 'stockQuantity', headerName: this.lang.stockQuantity, unSortIcon: true, },
    { field: 'categoryId', headerName: this.lang.categoryName, unSortIcon: true, },
    { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true, },
    { field: 'supplierId', headerName: this.lang.supplierName, unSortIcon: true, },
    { field: 'warehouseLocation', headerName: this.lang.warehouseLocation, unSortIcon: true, },
    { field: 'disposable', headerName: this.lang.disposable, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.yes : this.lang.no; } },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateProductModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getProductById(event.data.id)
      }
    },
    {
      field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
        return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteProductId(event.data.id),
    },
  ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    floatingFilter: true,
    minWidth: 130,
  };
  public rowBuffer = 0;
  public rowModelType: 'clientSide' | 'infinite' | 'viewport' | 'serverSide' =
    'infinite';
  public cacheBlockSize = 300;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 1;
  public infiniteInitialRowCount = 1000;
  public maxBlocksInCache = 10;
  public noRowsTemplate: any
  public rowData!: any[];
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.getAllProducts()
  }
  //#endregion

  //#region Get Methods

  async getAllProducts(){
    this.rowData=await this.productComponentService.getAllProductDetails();
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getProductById(id:string){
    this.product=await this.productComponentService.getByProductId(id);
  }
  //#endregion

  //#region Delete Methods
  onDeleteProductId(id: string) {
    this.productDeleteId = true;
    this.deleteProduct(id)
  }
  deleteProduct(id: string) {
    if (this.productDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.productComponentService.deleteProduct(id, () => { this.getAllProducts() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(ProductDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

}
//#region delete Component
@Component({
  selector: 'product-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class ProductDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteProductItem"
  constructor(public dialogRef: MatDialogRef<ProductDeleteTemplate>) {
  }
}
//#endregion
