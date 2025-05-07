import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddWorkAccidentComponent } from './add-work-accident/add-work-accident.component';
import { UpdateWorkAccidentComponent } from './update-work-accident/update-work-accident.component';
import { NavbarWorkAccidentComponent } from './navbar-work-accident/navbar-work-accident.component';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Employee } from '../../models/employee/employee';
import { WorkAccident } from '../../models/workAccident/workAccident';
import { WorkAccidentComponentService } from '../../services/component/work-accident-component.service';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { DetailsWorkAccidentComponent } from './details-work-accident/details-work-accident.component';
import { WitnessesWorkAccidentComponent } from './witnesses-work-accident/witnesses-work-accident.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { UpdateWitnessComponent } from './update-witness/update-witness.component';
import { StatusRecord } from '../../models/statusRecord/statusRecord';


@Component({
  selector: 'app-work-accident',
  standalone: true,
  imports: [CommonModule, AddWorkAccidentComponent, UpdateWorkAccidentComponent, NavbarWorkAccidentComponent, AgGridModule, DetailsWorkAccidentComponent, WitnessesWorkAccidentComponent, ReactiveFormsModule,UpdateWitnessComponent],
  templateUrl: './work-accident.component.html',
  styleUrl: './work-accident.component.css'
})
export class WorkAccidentComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  //Class 
  workAccidents: WorkAccident[]
  workAccident: WorkAccident

  //Form Group
  workAccidentId: string;
  //Flag
  dataLoaded = false;
  isDeletedId = false;
  isMaterialLoad = false

  constructor(private workAccidentComponentService: WorkAccidentComponentService, private dialog: MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    
    {
      field: 'statusRecordIds',
      headerName: this.lang.lossOfLimb,
      unSortIcon: true,
      cellRenderer: (params: { value: StatusRecord[] }) => {
        if (!params.value || params.value.length === 0) {
          return this.lang.not;
        }
        const lastRecord = params.value[params.value.length - 1];
        return lastRecord?.status || this.lang.not;
      }
    },
    
    {
      field: 'Details', headerName: this.lang.details, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-eye"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#detailWorkAccidentModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByWorkAccident(event.data.id)
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
        this.deleteWorkAccident(event.data.id),
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateWorkAccidentModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByWorkAccident(event.data.id)
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

  //#region  Get Method 

  async getAll() {
    this.rowData = (await this.workAccidentComponentService.getAllDetails())
    this.dataLoaded = true;
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByWorkAccident(Id: string) {
    this.workAccident = (await this.workAccidentComponentService.getById(Id))
  }
  downloadPdf(id:string,date:string){
 
    this.workAccidentComponentService.downloadWorkAccident(id,date);
  }
  //#endregion

  //#region Delete and On Method

  onDeleteWorkAccident(Id: string) {
    this.workAccidentId = Id;
    this.isDeletedId = true;
  }
  deleteWorkAccident(id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.workAccidentComponentService.deleteWorkAccident(id, () => { this.getAll() }))
    })
  }
  openDialog() {
    return this.dialog.open(WorkAccidentDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

}
@Component({
  selector: 'work-accident-delete-template',
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
export class WorkAccidentDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteWorkAccidentItem"
  constructor(public dialogRef: MatDialogRef<WorkAccidentDeleteTemplate>) {
  }
}