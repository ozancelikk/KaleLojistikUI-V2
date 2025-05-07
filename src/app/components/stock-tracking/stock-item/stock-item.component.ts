import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { StockItem } from '../../../models/stockItem/stockItem';
import { StockItemComponentService } from '../../../services/component/stock-tracking/stock-item-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AddStockItemComponent } from './add-stock-item/add-stock-item.component';
import { UpdateStockItemComponent } from './update-stock-item/update-stock-item.component';
import { NavbarStockItemComponent } from './navbar-stock-item/navbar-stock-item.component';
import { AgGridModule } from 'ag-grid-angular';
import { changeDataTableHeight } from '../../../../assets/js/main';
import { RoomStockItemComponent } from './room-stock-item/room-stock-item.component';
import { ReportStockItemComponent } from "./report-stock-item/report-stock-item.component";


@Component({
  selector: 'app-stock-item',
  standalone: true,
  imports: [CommonModule, AddStockItemComponent, UpdateStockItemComponent, NavbarStockItemComponent, AgGridModule, RoomStockItemComponent, ReportStockItemComponent],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css'
})
export class StockItemComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  stockItem:StockItem
  stockItemDeleteId:boolean=false

  constructor(private stockItemComponentService:StockItemComponentService,private dialog:MatDialog) {}

    //#region Ag-Grid

    protected gridOptions: GridOptions = {
      pagination: true,
      paginationPageSize: 50,
    };
  
    public columnDefs: (ColDef | ColGroupDef)[] = [
      { field: 'productId', headerName: this.lang.productName, unSortIcon: true, },
      { field: 'quantity', headerName: this.lang.quantity, unSortIcon: true, },
      { field: 'entryDate', headerName: this.lang.entryDate, unSortIcon: true, },
      { field: 'description', headerName: this.lang.description, unSortIcon: true, },
      { field: 'employeeId', headerName: this.lang.employeeName, unSortIcon: true, },
      { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true, },
      {
        field: 'rooms', headerName: this.lang.rooms, filter: false, valueGetter: (params) => {
          return 'rooms';
        },
        cellRenderer: () => {
          return `<i class="fa-solid fa-house"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#roomDetailsModal"></i>`;
        },
        onCellClicked: (event: CellClickedEvent) => {
          this.getByStockItemId(event.data.id)
        }
      },
      {
        field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
          return 'Update';
        },
        cellRenderer: () => {
          return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateStockItemModal"></i>`;
        },
        onCellClicked: (event: CellClickedEvent) => {
          this.getByStockItemId(event.data.id)
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
          this.onDeleteStockItemId(event.data.id),
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
      this.getAllStockItems()
    }
    //#endregion
  

  ngOnInit(){
    this.getAllStockItems()
  }
  
  //#region GetMethods
  async getAllStockItems(){
    this.rowData=await this.stockItemComponentService.getAllDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByStockItemId(id:string){
    this.stockItem=await this.stockItemComponentService.getByStockItemId(id)
  }
  //#endregion

    //#region Delete Methods
    onDeleteStockItemId(id: string) {
      this.stockItemDeleteId = true;
      this.deleteStockItem(id)
    }
    deleteStockItem(id: string) {
      if (this.stockItemDeleteId) {
        this.openDialog().afterClosed().subscribe(async result => {
          if (!result) {
            return
          }
          this.stockItemComponentService.deleteStockItem(id, () => { this.getAllStockItems() })
        })
      }
    }
    openDialog() {
      return this.dialog.open(StockItemDeleteTemplate, {
        width: '550px',
        panelClass: 'matdialog-delete',
      });
    }
    //#endregion
  
}
//#region delete Component
@Component({
  selector: 'stock-item-delete-template',
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
export class StockItemDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteStockItemItem"
  constructor(public dialogRef: MatDialogRef<StockItemDeleteTemplate>) {
  }
}
//#endregion
