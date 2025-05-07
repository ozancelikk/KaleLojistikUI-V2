import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { RepeatedDuty } from '../../models/duty/repeatedDuty';
import { RepeatedDutyComponentService } from '../../services/component/repeated-duty-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent, GridApi, ColumnApi } from 'ag-grid-community';
import { changeDataTableHeight } from '../../../assets/js/main';
import { AddRepeatedDutyComponent } from './add-repeated-duty/add-repeated-duty.component';
import { UpdateRepeatedDutyComponent } from './update-repeated-duty/update-repeated-duty.component';
import { NavbarRepeatedDutyComponent } from './navbar-repeated-duty/navbar-repeated-duty.component';

import { AddEmployeeRepeatedDutyComponent } from './add-employee-repeated-duty/add-employee-repeated-duty.component';
import { AddEmployeeComponent } from "../employee/add-employee/add-employee.component";
import { AddBatchRepeatedDutyComponent } from './add-batch-repeated-duty/add-batch-repeated-duty.component';

@Component({
  selector: 'app-repeated-duty',
  standalone: true,
  imports: [CommonModule, AgGridModule, AddRepeatedDutyComponent, UpdateRepeatedDutyComponent, NavbarRepeatedDutyComponent, AddEmployeeRepeatedDutyComponent,AddBatchRepeatedDutyComponent],
  templateUrl: './repeated-duty.component.html',
  styleUrl: './repeated-duty.component.css'
})
export class RepeatedDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  repeatedDuty: RepeatedDuty
  repeatedDutys: RepeatedDuty[]
  repeatedDutyDeleteId: boolean = false
  selectedIds: string[] = [];
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  constructor(private repeatedDutyComponentService: RepeatedDutyComponentService, private dialog: MatDialog) { }

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Select',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { field: 'dutyId', headerName: this.lang.dutyName, unSortIcon: true, },
    { field: 'reminderTime', headerName: this.lang.howManyMinutesShouldItBeRun, unSortIcon: true, },
    { field: 'nextRunTime', headerName: this.lang.nextRunTime, unSortIcon: true, },
    { field: 'startTime', headerName: this.lang.startTime, unSortIcon: true, },
    { field: 'finishTime', headerName: this.lang.endTime, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true,cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.active : this.lang.passive; } },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateRepeatedDutyModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByRepeatedDuty(event.data.id)
      }
    },
    {
      field: 'EmployeeUpdate', headerName: this.lang.updateEmployee, filter: false, valueGetter: (params) => {
        return 'EmployeeUpdate';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#addEmployeeRepeatedDuty"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByRepeatedDuty(event.data.id)
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
        this.onDeleteRepeatedDutyId(event.data.id),
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
    this.getAllRepeatedDuty()
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.addEventListener('selectionChanged', this.onSelectionChanged.bind(this));
  }
  
  //#endregion
 
  //#region  GetAllMethods
  async getAllRepeatedDuty() {
    this.rowData = await this.repeatedDutyComponentService.getAllRepeatedDutyDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByRepeatedDuty(id: string) {
    this.repeatedDuty = await this.repeatedDutyComponentService.getByRepeatedDutyId(id)
  }
  //#endregion

  //#region  deleteMethods
  onDeleteRepeatedDutyId(id: string) {
    this.repeatedDutyDeleteId = true;
    this.deleteRepeatedDuty(id)
  }
  deleteRepeatedDuty(id: string) {
    if (this.repeatedDutyDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.repeatedDutyComponentService.deleteRepeatedDuty(id, () => { this.getAllRepeatedDuty() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(RepeatedDutyDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
  //#region 
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedIds = selectedRows.map(row => row.id);
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'repeated-duty-delete-template',
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
export class RepeatedDutyDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteRepeatedDutyItem"
  constructor(public dialogRef: MatDialogRef<RepeatedDutyDeleteTemplate>) {
  }
}
//#endregion

