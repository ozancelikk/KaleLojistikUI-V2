import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { PlannedDutyComponentService } from '../../services/component/planned-duty-component.service';
import { AgGridModule } from 'ag-grid-angular';
import { PlannedDuty } from '../../models/plannedDuty/plannedDuty';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridApi, GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { DutyService } from '../../services/common/duty.service';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { MatButtonModule } from '@angular/material/button';

import { NavbarPlannedDutyComponent } from './navbar-planned-duty/navbar-planned-duty.component';
import { AddPlannedDutyComponent } from './add-planned-duty/add-planned-duty.component';
import { UpdatePlannedDutyComponent } from './update-planned-duty/update-planned-duty.component';
import { DetailsPlannedDutyComponent } from './details-planned-duty/details-planned-duty.component';

@Component({
  selector: 'app-planned-duty',
  standalone: true,
  imports: [CommonModule, AgGridModule,NavbarPlannedDutyComponent,AddPlannedDutyComponent,UpdatePlannedDutyComponent,DetailsPlannedDutyComponent],
  templateUrl: './planned-duty.component.html',
  styleUrl: './planned-duty.component.css'
})
export class PlannedDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  plannedDuty: PlannedDuty;
  plannedDutyBool: boolean;
  dataLoaded = false;
  plannedDutyId: any;
  constructor(private plannedDutyComponentService: PlannedDutyComponentService, private dialog: MatDialog,) { }
  gridApi: GridApi;
  @Output() dutyEvent = new EventEmitter<any>()

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 30,
  };
  protected pageIndex: number = 0;
  protected pageSize: number = 30;
  protected limit: number = 30;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'dutyTitle', headerName: this.lang.dutyTitle, unSortIcon: true, },
    { field: 'createdDate', headerName: this.lang.date, unSortIcon: true, },
    { field: 'startTime', headerName: this.lang.startTime, unSortIcon: true, },
    { field: 'endTime', headerName: this.lang.endTime, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.active : this.lang.passive; } },
    {
      field: 'Details', headerName: this.lang.details, filter: false, valueGetter: (params) => {
        return 'Details';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-users"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#plannedDutysModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getById(event.data.id),
    }, 
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updatePlannedDutyModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getById(event.data.id)
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
        this.deletePlanneDuty(event.data.id),
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
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    this.getallPlannedDuty()
  }


  async getallPlannedDuty() {
    this.rowData = await this.plannedDutyComponentService.getAllPlannedDutyDetails()
    this.plannedDutyBool = true;
  }
  async getById(id: string) {
    this.plannedDuty = await this.plannedDutyComponentService.getByPlannedDutyId(id)
  }
  openDialog() {
    return this.dialog.open(PlannedDutyDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  onDeletePlannedDutyId(Id: string) {
    this.plannedDutyId = Id;
    this.plannedDutyBool = true;
  }
  deletePlanneDuty(id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.plannedDutyComponentService.deletePlannedDuty(id, () => { this.getallPlannedDuty() }))
    })
  }


}

@Component({
  selector: 'planned-duty-delete-template',
  template: `
 <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
     <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
     <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteDutyItem"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, ],

})
export class PlannedDutyDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteDutyItem: string = "GET.Deleting.DeletePlannedDutyItem"
  constructor(public dialogRef: MatDialogRef<PlannedDutyDeleteTemplate>) {
  }
}
