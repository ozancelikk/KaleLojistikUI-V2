import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Decrement } from '../../../models/decrement/decrement';
import { DecrementComponentService } from '../../../services/component/stock-tracking/decrement-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { changeDataTableHeight } from '../../../../assets/js/main';
import { NavbarDecrementComponent } from './navbar-decrement/navbar-decrement.component';
import { AddDecrementComponent } from './add-decrement/add-decrement.component';
import { UpdateDecrementComponent } from './update-decrement/update-decrement.component';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-decrement',
  standalone: true,
  imports: [CommonModule,NavbarDecrementComponent,AddDecrementComponent,UpdateDecrementComponent,AgGridModule],
  templateUrl: './decrement.component.html',
  styleUrl: './decrement.component.css'
})
export class DecrementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  decrement: Decrement
  decrementDeleteId: boolean = false
  constructor(private decrementComponentService: DecrementComponentService, private dialog: MatDialog) { }

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'productId', headerName: this.lang.productName, unSortIcon: true, },
    { field: 'quantity', headerName: this.lang.quantity, unSortIcon: true, },
    { field: 'decremantQuantity', headerName: this.lang.decremantQuantity, unSortIcon: true, },
    { field: 'date', headerName: this.lang.date, unSortIcon: true, },
    { field: 'employeeId', headerName: this.lang.employeeName, unSortIcon: true, },
    { field: 'description', headerName: this.lang.description, unSortIcon: true, },
    { field: 'areaId', headerName: this.lang.areaName, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDecrementModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getDecrementById(event.data.id)
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
        this.onDeleteDecrementId(event.data.id),
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
  }
  //#endregion
  
  ngOnInit(){
  this.getAllDecrement()
  }

  //#region  GetMethods
  async getAllDecrement() {
    this.rowData = await this.decrementComponentService.getAllDecrementDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getDecrementById(id: string) {
    this.decrement = await this.decrementComponentService.getByDecrementId(id)
  }
  //#endregion

  //#region  deleteMethods
  onDeleteDecrementId(id: string) {
    this.decrementDeleteId = true;
    this.deleteDecrement(id)
  }
  deleteDecrement(id: string) {
    if (this.decrementDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.decrementComponentService.deleteDecrement(id, () => { this.getAllDecrement() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(DecrementDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'decrement-delete-template',
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
export class DecrementDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteDecrementItem"
  constructor(public dialogRef: MatDialogRef<DecrementDeleteTemplate>) {
  }
}
//#endregion

