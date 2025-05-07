import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { TechnicalError } from '../../models/technicalError/technicalError';
import TechnicalErrorComponentService from '../../services/component/technical-error-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { changeDataTableHeight } from '../../../assets/js/main';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarTechnicalErrorComponent } from './navbar-technical-error/navbar-technical-error.component';
import { AddTechnicalErrorComponent } from './add-technical-error/add-technical-error.component';
import { UpdateTechnicalErrorComponent } from './update-technical-error/update-technical-error.component';
import { TechnicalErrorDetailComponent } from './technical-error-detail/technical-error-detail.component';
import { TechnicalErrorImageComponent } from './technical-error-image/technical-error-image.component';


@Component({
  selector: 'app-technical-error',
  standalone: true,
  imports: [CommonModule,AgGridModule,NavbarTechnicalErrorComponent,AddTechnicalErrorComponent,UpdateTechnicalErrorComponent,TechnicalErrorDetailComponent,TechnicalErrorImageComponent],
  templateUrl: './technical-error.component.html',
  styleUrl: './technical-error.component.css'
})
export class TechnicalErrorComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  technicalError: TechnicalError;
  deleteTechnicalErrorId: boolean = false

  constructor(private technicalErrorComponentService: TechnicalErrorComponentService, private dialog: MatDialog) { }

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'errorTitle', headerName: this.lang.errorTitle, unSortIcon: true, },
    { field: 'errorDescription', headerName: this.lang.errorDescription, unSortIcon: true, },
    { field: 'roomName', headerName: this.lang.roomName, unSortIcon: true, },
    { field: 'createdDate', headerName: this.lang.createdDate, unSortIcon: true, },
    { field: 'complecetedDate', headerName: this.lang.complecetedDate, unSortIcon: true, },
    { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true, },
    { field: 'employeeName', headerName: this.lang.employeeName, unSortIcon: true, },
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.passive : this.lang.active; } },
    {
      field: 'Detail', headerName: this.lang.details, filter: false, valueGetter: (params) => {
        return 'Detail';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-circle-info"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#technicalErrorsModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByTechnicalErrorId(event.data.id)
      }
    },
    {
      field: 'Image', headerName: this.lang.dutyImage, filter: false, valueGetter: (params) => {
        return 'Image';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#technicalErrorImage"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getByTechnicalErrorId(event.data.id),
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateTechnicalErrorModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByTechnicalErrorId(event.data.id)
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
        this.onDeleteTechnicalErrorId(event.data.id),
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
    this.getAllTechnicalError()
  }
  //#endregion

  //#region Get Methods
  async getAllTechnicalError() {
    this.rowData = await this.technicalErrorComponentService.getDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByTechnicalErrorId(id: string) {
    this.technicalError = await this.technicalErrorComponentService.getByTechnicalErrorId(id)
  }
  //#endregion

  //#region Delete Methods
  onDeleteTechnicalErrorId(id: string) {
    this.deleteTechnicalErrorId = true;
    this.deleteTechnicalError(id)
  }
  deleteTechnicalError(id: string) {
    if (this.deleteTechnicalErrorId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.technicalErrorComponentService.deleteTechnicalError(id, () => { this.getAllTechnicalError() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(TechnicalErrorDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion


}
//#region delete Component
@Component({
  selector: 'technical-error-delete-template',
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
export class TechnicalErrorDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.TechnicalErrorDeleteTechnicalErrorItem"
  constructor(public dialogRef: MatDialogRef<TechnicalErrorDeleteTemplate>) {
  }
}
//#endregion
