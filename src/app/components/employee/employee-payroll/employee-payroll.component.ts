import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeePayrollComponentService } from '../../../services/component/employee-payroll-component.service';
import { ToastrService } from 'ngx-toastr';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { EmployeePayroll } from '../../../models/employeePayroll/employeePayroll';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NavbarEmployeePayrollComponent } from "../navbar-employee-payroll/navbar-employee-payroll.component";
import { AddEmployeePayrollComponent } from "../add-employee-payroll/add-employee-payroll.component";


@Component({
  selector: 'app-employee-payroll',
  standalone: true,
  imports: [CommonModule, AgGridModule, NavbarEmployeePayrollComponent, AddEmployeePayrollComponent],
  templateUrl: './employee-payroll.component.html',
  styleUrl: './employee-payroll.component.css'
})
export class EmployeePayrollComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  employeePayroll:EmployeePayroll
  employeePayrollDeleteId:boolean=false
  empId:string

  constructor(private employeePayrollComponentService:EmployeePayrollComponentService,private toastrService:ToastrService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'documentName', headerName: this.lang.documentName, unSortIcon: true, },
    { field: 'description', headerName: this.lang.description, unSortIcon: true, },
    { field: 'employeeId', headerName: this.lang.employeeName, unSortIcon: true, },
    { field: 'date', headerName: this.lang.createdDate, unSortIcon: true, },
    { field: 'Download', headerName: this.lang.pdfDownLoad, filter: false, valueGetter: (params) => {
        return 'Download';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-file-pdf"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.downloadDocument(event.data.id,event.data.documentName),
    },
    {
      field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
        return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteEmployeePayrollId(event.data.id),
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
  @Input() set employeeId(value:any){
    if(value==null){return}
    this.empId=value.id 
    this.getAll(value.id)
  }

  async getAll(id:string){
    this.rowData=await this.employeePayrollComponentService.GetAllDetailsByEmployeeId(id)
  }
  async getByEmployeeId(id:string){
    this.employeePayroll=await this.employeePayrollComponentService.getById(id)
  }
  
  async downloadDocument(documentId: string, documentName: string) {
    this.employeePayrollComponentService.downloadEmployeePayroll(documentId,documentName);
  }
  

  onDeleteEmployeePayrollId(id: string) {
    this.employeePayrollDeleteId = true;
    this.deleteEmployeeRoll(id)
  }
  deleteEmployeeRoll(id: string) {
    if (this.employeePayrollDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.employeePayrollComponentService.deleteEmployeePayroll(id, () => { this.getAll(this.empId) })
      })
    }
  }
  openDialog() {
    return this.dialog.open(EmployeePayrollDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
}
//#region delete Component
@Component({
  selector: 'employee-payroll-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="employeePayrollDeleteEmployeePayrollItem"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class EmployeePayrollDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  employeePayrollDeleteEmployeePayrollItem:string= "GET.Deleting.EmployeePayrollDeleteEmployeePayrollItem"
  constructor(public dialogRef: MatDialogRef<EmployeePayrollDeleteTemplate>) {
  }
}
//#endregion