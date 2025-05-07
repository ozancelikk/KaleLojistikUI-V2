import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { EmployeeBreak } from '../../models/employeeBreak/employeeBreak';
import { EmployeeBreakComponentService } from '../../services/component/employee-break-component.service';
import { ToastrService } from 'ngx-toastr';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { changeDataTableHeight, changeDataTableHeightNotNavbar } from '../../../assets/js/main';
import { AddEmployeeBreakComponent } from './add-employee-break/add-employee-break.component';
import { UpdateEmployeeBreakComponent } from './update-employee-break/update-employee-break.component';
import { NavbarEmployeeBreakComponent } from './navbar-employee-break/navbar-employee-break.component';

@Component({
  selector: 'app-employee-break',
  standalone: true,
  imports: [CommonModule, AgGridModule,AddEmployeeBreakComponent,UpdateEmployeeBreakComponent,NavbarEmployeeBreakComponent],
  templateUrl: './employee-break.component.html',
  styleUrl: './employee-break.component.css'
})
export class EmployeeBreakComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  employeeBreaks: EmployeeBreak[];
  employeeBreak: EmployeeBreak;

  constructor(private employeeBreakComponentService: EmployeeBreakComponentService, private toastrService: ToastrService) { }

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'breakDescription', headerName: this.lang.breakDescription, unSortIcon: true, },
    { field: 'breakTime', headerName: this.lang.breakTime, unSortIcon: true, },
    { field: 'breakDate', headerName: this.lang.breakDate, unSortIcon: true },
    { field: 'employeeId', headerName: this.lang.employeeName, unSortIcon: true, },
    { field: 'userId', headerName: this.lang.user, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.inApprovalPhase : this.lang.approved; } },
    {
      field: 'StatusUpdate', headerName: this.lang.updateStatus, filter: false, valueGetter: (params) => {
        return 'ClaimUpdate';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.updateEmployeeBreak(event.data.id)
      }
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#employeeBreakUpdateModal"></i>`;
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

  //#region  GetMethods
  async getAll() {
    this.rowData = (await this.employeeBreakComponentService.getAllDetails())
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getById(id: string) {
    this.employeeBreak = (await this.employeeBreakComponentService.getById(id))
  }
  //#endregion
  updateEmployeeBreak(id: string) {
    this.getById(id)
    setTimeout(() => {
      if (this.employeeBreak == null) {
        this.toastrService.error(this.lang.noDataFound)
        return
      }
      if (this.employeeBreak.status == false) {
        this.toastrService.info(this.lang.alreadyConfirmed)
        return
      }
      this.employeeBreak.status = false
      this.employeeBreakComponentService.updateEmployeeBreak(this.employeeBreak, () => this.getAll())
    }, 300);
  }

}
