import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UpdateDutyComponent } from './update-duty/update-duty.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Duty } from '../../models/duty/duty';
import { DutyDetail } from '../../models/duty/dutyDetail';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent, GridApi, BodyScrollEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarDutyComponent } from './navbar-duty/navbar-duty.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { DetailDutyComponent } from './detail-duty/detail-duty.component';

import { EmployeeDutyDetailComponent } from './employee-duty-detail/employee-duty-detail.component';
import { AddDutyComponent } from './add-duty/add-duty.component';
import { DutyTagComponent } from '../duty-tag/duty-tag.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { DutyImageComponent } from './duty-image/duty-image.component';
import { ReportDutyComponent } from './report-duty/report-duty.component';
import { AssignmentDutyComponent } from './assignment-duty/assignment-duty.component';
import { DutyService } from '../../services/common/duty.service';
import { BatchAddDutyComponent } from './batch-add-duty/batch-add-duty.component';
@Component({
  selector: 'app-duty',
  standalone: true,
  imports: [CommonModule,AddDutyComponent, UpdateDutyComponent, AgGridModule,DutyImageComponent, NavbarDutyComponent, MatDialogModule,DetailDutyComponent,EmployeeDutyDetailComponent,DutyTagComponent,TaskUpdateComponent,ReportDutyComponent,AssignmentDutyComponent,BatchAddDutyComponent],
  templateUrl: './duty.component.html',
  styleUrl: './duty.component.css'
})
export class DutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  duties: DutyDetail[];
  duty: Duty;
  dataLoaded = false;
  dutyId: any
  dutyDeleteId: boolean
  dutyDetails: DutyDetail;
  gridApi: GridApi;
  @Output() dutyEvent = new EventEmitter<any>()

  constructor(
    private dutyComponentService: DutyComponentService,
    private dialog: MatDialog,
    private dutyService: DutyService
  ) { }

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 30,
  };
  protected pageIndex: number = 0;
  protected pageSize: number = 30;
  protected limit: number = 30;
// onBodyScroll(params: BodyScrollEvent) {
//   let t = this.gridApi.getLastDisplayedRow()
//   if (t == this.limit - 1) {
//     this.limit += 30
//     this.pageIndex++;
//     this.dutyService.getAllDutyDetails(this.pageIndex,this.pageSize).subscribe((response) => {
//       if (response.data.length > 0) {
//         // this.limit += 30;
//         this.rowData = this.rowData.concat(response.data);
//       }
//     });
//     }
//   }

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'dutyTitle', headerName: this.lang.dutyTitle, unSortIcon: true,}, 
    { field: 'createdDate', headerName: this.lang.date, unSortIcon: true, },
    { field: 'startTime', headerName: this.lang.startTime, unSortIcon: true, },
    { field: 'endTime', headerName: this.lang.endTime, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.active : this.lang.passive; } },
    {
      field: 'Employees', headerName: this.lang.employees, filter: false, valueGetter: (params) => {
        return 'Employees';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-users"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#employeeDetailsModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getByDutyDetails(event.data.id),
    },
    {
      field: 'Detail', headerName: this.lang.details, filter: false, valueGetter: (params) => {
        return 'Detail';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-circle-info"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#dutyDetailsModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getByDutyDetails(event.data.id),
    },
    {
      field: 'Image', headerName: this.lang.dutyImage, filter: false, valueGetter: (params) => {
        return 'Image';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#dutyImage"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getByDutyDetails(event.data.id),
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDutyModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByDuty(event.data.id)
      }
    },
    {
      field: 'UpdateTask', headerName: this.lang.taskupdate, filter: false, valueGetter: (params) => {
        return 'UpdateTask';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#dutyUpdateTaskModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByDuty(event.data.id)
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
        this.deleteDuty(event.data.id),
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
    this.getAllDuty()
  }


  //#region GetAllMethod()
  onDeleteDutyId(Id: string) {
    this.dutyId = Id;
    this.dutyDeleteId = true;
  }
  deleteDuty(id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.dutyComponentService.deleteDuty(id, () => { this.getAllDuty() }))
    })
  }
  async getAllDuty() {
    this.pageIndex=0;
    this.limit=30
    this.rowData = (await this.dutyComponentService.getAllDuty())
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
    this.dataLoaded = true;
  }
  async getByDuty(Id: string, successCallBack?: () => void) {
    this.duty = (await this.dutyComponentService.getByDuty(Id))
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }
  async getByDutyDetails(Id: string, successCallBack?: () => void) {
    this.dutyDetails = (await this.dutyComponentService.getByDutyDetails(Id))
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }

  openDialog() {
    return this.dialog.open(DutyDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion


}
@Component({
  selector: 'duty-delete-template',
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
export class DutyDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteDutyItem:string= "GET.Deleting.DeleteDutyItem"
  constructor(public dialogRef: MatDialogRef<DutyDeleteTemplate>) {
  }
}

