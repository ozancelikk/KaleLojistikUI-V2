import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AddEmployeeShiftComponent } from './add-employee-shift/add-employee-shift.component';
import { UpdateEmployeeShiftComponent } from './update-employee-shift/update-employee-shift.component';
import { NavbarEmployeeShiftComponent } from './navbar-employee-shift/navbar-employee-shift.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { EmployeeShift } from '../../models/employeeShift/employeeShift';
import { EmployeeShiftComponentService } from '../../services/component/employee-shift-component.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { changeDataTableHeight } from '../../../assets/js/main';

import { BulkAddEmployeeShiftComponent } from './bulk-add-employee-shift/bulk-add-employee-shift.component';

@Component({
  selector: 'app-employee-shift',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddEmployeeShiftComponent,UpdateEmployeeShiftComponent,NavbarEmployeeShiftComponent, BulkAddEmployeeShiftComponent],
  templateUrl: './employee-shift.component.html',
  styleUrl: './employee-shift.component.css'
})
export class EmployeeShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  employeeShift:EmployeeShift;
  isEmployeeShift:boolean=false
  constructor(private employeeShiftComponentService:EmployeeShiftComponentService,private toastrService:ToastrService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'employeeId', headerName: this.lang.employeeName, unSortIcon: true,},
    { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true,},
    { field: 'shiftId', headerName: this.lang.shiftName, unSortIcon: true, },
    { field: 'shiftDate', headerName: this.lang.shiftDate, unSortIcon: true, },
    {
      field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
        return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteEmployeeShiftId(event.data.id),
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateEmployeeShiftModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getById(event.data.id)
      }
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
    this.getAll()
  }

  async getAll(){
    this.rowData=await this.employeeShiftComponentService.getAllEmployeeShiftDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getById(id:string){
    this.employeeShift=await this.employeeShiftComponentService.getByEmployeeShiftId(id)
  }
  openDialog() {
    return this.dialog.open(EmployeeShiftDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  onDeleteEmployeeShiftId(id: string) {
    this.isEmployeeShift = true;
    this.deleteEmployeeShift(id)
  }
  deleteEmployeeShift(id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.employeeShiftComponentService.deleteEmployeeShift(id, () => { this.getAll() }))
    })
  }
}
@Component({
  selector: 'employee-shift-delete-template',
  template: `
 <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
     <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
     <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class EmployeeShiftDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteEmployeeShiftItem";
  constructor(public dialogRef: MatDialogRef<EmployeeShiftDeleteTemplate>) {
  }
}
