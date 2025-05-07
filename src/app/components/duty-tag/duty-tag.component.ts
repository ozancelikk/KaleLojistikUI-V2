import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { DutyTagComponentService } from '../../services/component/duty-tag-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { DutyTag } from '../../models/dutyTag/dutyTag';
import { AgGridModule } from 'ag-grid-angular';
import { AddDutyTagComponent } from './add-duty-tag/add-duty-tag.component';
import { UpdateDutyTagComponent } from './update-duty-tag/update-duty-tag.component';
import { NavbarDutyTagComponent } from './navbar-duty-tag/navbar-duty-tag.component';
import { changeDataTableHeight } from '../../../assets/js/main';


@Component({
  selector: 'app-duty-tag',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddDutyTagComponent,UpdateDutyTagComponent,NavbarDutyTagComponent],
  templateUrl: './duty-tag.component.html',
  styleUrl: './duty-tag.component.css'
})
export class DutyTagComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutyTagDeleteId: boolean = false;
  dutyTag:DutyTag
  @Output() dutyTagAddEvent = new EventEmitter<any>()
  constructor(private dutyTagComponentService:DutyTagComponentService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'tagName', headerName: this.lang.dutyTagName, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDutyTagModal"></i>`;
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
        this.onDeleteDutyTagId(event.data.id),
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
    this.rowData = await this.dutyTagComponentService.getAllDutyTag()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getById(id: string) {
    this.dutyTag = await this.dutyTagComponentService.getByDutyTagId(id)
  }
 //#region  Delete Method
 onDeleteDutyTagId(id: string) {
  this.dutyTagDeleteId = true;
  this.deleteDutyTag(id)
}
deleteDutyTag(id: string) {
  if (this.dutyTagDeleteId) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      this.dutyTagComponentService.deleteDutyTag(id, () => { this.getAll() })
    })
  }
}
openDialog() {
  return this.dialog.open(DutyTagDeleteTemplate, {
    width: '550px',
    panelClass: 'matdialog-delete',
  });
}
//#endregion
}
//#region delete Component
@Component({
selector: 'duty-tag-delete-template',
template: `
<div >
<h5 mat-dialog-title>
  {{lang.areYouSureYouWanttoDelete}}</h5>
 <div mat-dialog-content>
 </div>
 <div mat-dialog-actions class="mat-mdc-dialog-actions">
  <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
  <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can" *app="deleteDutyTagItem"></i> {{lang.delete}}</button>
 </div>
</div>
`,
styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
standalone: true,
imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class DutyTagDeleteTemplate {
lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
deleteDutyTagItem:string= "GET.Deleting.DeleteDutyTagItem" 
constructor(public dialogRef: MatDialogRef<DutyTagDeleteTemplate>) {
}
}
//#endregion
