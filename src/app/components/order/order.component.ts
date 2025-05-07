import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { OrderComponentService } from '../../services/component/restaurant/order-component.service';
import { Order } from '../../models/restaurant/order';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { changeDataTableHeight, changeDataTableHeightNotNavbar } from '../../../assets/js/main';
import { DetailOrderComponent } from './detail-order/detail-order.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,AgGridModule,MatDialogModule,MatButtonModule,DetailOrderComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem('lng'));
  orders:Order[]
  order:Order
  orderId:string
  orderDeleteId:boolean
  constructor(private orderComponentService:OrderComponentService,private dialog:MatDialog ) {}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'roomName', headerName: this.lang.roomName, unSortIcon: true, },
    { field: 'totalPrice', headerName: this.lang.totalPrice, unSortIcon: true, },
    { field: 'orderDate', headerName: this.lang.orderDate, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.yourOrderHasBeenTaken : this.lang.yourOrderIsPreparing; } },
    { field: 'orderStatus', headerName: this.lang.orderStatus, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.incomplete : this.lang.completed; } },
    {
      field: 'Detail', headerName: this.lang.details, filter: false, valueGetter: (params) => {
        return 'Detail';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-circle-info"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#orderMenuDetailsModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByOrderId(event.data.id)
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
        this.onDeleteOrder(event.data.id),
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
    this.getAllOrderDetails()
  }

  //#region  Get Methods
  async getAllOrderDetails(){
    this.rowData=await this.orderComponentService.getAllOrderDetails();
    changeDataTableHeightNotNavbar()
    window.addEventListener("resize", changeDataTableHeightNotNavbar)
  }
  async getByOrderId(id:string){
    this.order=await this.orderComponentService.getByOrderId(id);
  }
  //#endregion

  //#region Delete Method
  onDeleteOrder(id:string){
    this.orderId = id;
    this.orderDeleteId = true;
    this.deleteOrder(id)
  }
  deleteOrder(id: string) {
    if (this.orderDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.orderComponentService.deleteOrder(id, () => { this.getAllOrderDetails() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(OrderDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'order-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can" *app="deleteRole"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class OrderDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteOrderItem"
  constructor(public dialogRef: MatDialogRef<OrderDeleteTemplate>) {
  }
}
//#endregion
