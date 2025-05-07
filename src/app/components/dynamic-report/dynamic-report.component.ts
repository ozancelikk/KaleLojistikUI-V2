import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { DynamicReport } from '../../models/dynamicReport/dynamicReport';
import { DynamicReportComponentService } from '../../services/component/dynamic-report-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { changeDataTableHeight } from '../../../assets/js/main';
import { AddDynamicReportComponent } from './add-dynamic-report/add-dynamic-report.component';6
import { NavbarDynamicReportComponent } from './navbar-dynamic-report/navbar-dynamic-report.component';
import { AddDynamicReportAreaComponent } from './add-dynamic-report-area/add-dynamic-report-area.component';
import { AddDynamicReportEmployeeComponent } from './add-dynamic-report-employee/add-dynamic-report-employee.component';

@Component({
  selector: 'app-dynamic-report',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AgGridModule,AddDynamicReportComponent,NavbarDynamicReportComponent,AddDynamicReportAreaComponent,AddDynamicReportEmployeeComponent],
  templateUrl: './dynamic-report.component.html',
  styleUrl: './dynamic-report.component.css'
})
export class DynamicReportComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  dynamicreport:DynamicReport
  dynamicReportDeleteId:boolean=false
  constructor(private dynamicReportComponentService:DynamicReportComponentService,private dialog:MatDialog) {}

    //#region Ag-Grid

    protected gridOptions: GridOptions = {
      pagination: true,
      paginationPageSize: 50,
    };
  
    public columnDefs: (ColDef | ColGroupDef)[] = [
      { field: 'reportFilterDate', headerName: this.lang.startingDate, unSortIcon: true, },
      { field: 'reportFilterEndDate', headerName: this.lang.endDate, unSortIcon: true, },
      { field: 'reportName', headerName: this.lang.reportName, unSortIcon: true, },
      { field: 'reportCreatedDate', headerName: this.lang.date, unSortIcon: true, },
      { field: 'personId', headerName: this.lang.employeeName, unSortIcon: true, },
      { field: 'titleName', headerName: this.lang.reportTitle, unSortIcon: true, },
      { field: 'entityType', headerName: this.lang.entityType, unSortIcon: true, },
      {
        field: 'Download', headerName: this.lang.downloadReport, filter: false, valueGetter: (params) => {
          return 'Download';
        },
        cellRenderer: () => {
          return `<i class="fa-solid fa-file-arrow-down"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
        },
        onCellClicked: (event: CellClickedEvent) => {
          this.downloadDocumentById(event.data.id)
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
          this.onDeleteDynamicReportId(event.data.id),
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
    
  ngOnInit() {
    this.getAllDynamicReport()
  }



  //#region GetMethods
  async getAllDynamicReport(){
    this.rowData=await this.dynamicReportComponentService.getAllDynamicReportDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getbyDynamicReportId(id:string){
    this.dynamicreport=await this.dynamicReportComponentService.getByDynamicReportId(id)
  }
  async downloadDocumentById(id:string){
    await this.dynamicReportComponentService.downloadDocumentById(id)
  }
  //#endregion

  //#region Delete Methods
  onDeleteDynamicReportId(id: string) {
    this.dynamicReportDeleteId = true;
    this.deleteDynamicReport(id)
  }
  deleteDynamicReport(id: string) {
    if (this.dynamicReportDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.dynamicReportComponentService.deleteDynamicReport(id, () => { this.getAllDynamicReport() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(DynamicReportDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'dynamic-report-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  </div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  
  })
  export class DynamicReportDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  
  constructor(public dialogRef: MatDialogRef<DynamicReportDeleteTemplate>) {
  }
  }
  //#endregion
