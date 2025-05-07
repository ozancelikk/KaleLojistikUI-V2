import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Shift } from '../../models/shiftSystem/shift';
import { ShiftComponentService } from '../../services/component/shift-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { changeDataTableHeight } from '../../../assets/js/main';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { UpdateShiftComponent } from './update-shift/update-shift.component';
import { NavbarShiftComponent } from './navbar-shift/navbar-shift.component';


@Component({
  selector: 'app-shift',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddShiftComponent,UpdateShiftComponent,NavbarShiftComponent],
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.css'
})
export class ShiftComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  isDeleteShift: boolean = false;
  shift:Shift;

  constructor(private shiftComponentService:ShiftComponentService,private dialog:MatDialog){}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.shiftName, unSortIcon: true, },
    { field: 'startTime', headerName: this.lang.startTime, unSortIcon: true, },
    { field: 'endTime', headerName: this.lang.endTime, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateShiftModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByShiftId(event.data.id)
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
        this.onDeleteShiftId(event.data.id),
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
  this.rowData=await this.shiftComponentService.getAllShift()
  console.log(this.rowData);
  
  changeDataTableHeight()
  window.addEventListener("resize", changeDataTableHeight)
  }
  async getByShiftId(id:string){
    this.shift=await this.shiftComponentService.getById(id)
  }
 
  //#region Delete Methods
  onDeleteShiftId(id: string) {
    this.isDeleteShift = true;
    this.deleteshift(id)
  }
  deleteshift(id: string) {
    if (this.isDeleteShift) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.shiftComponentService.deleteShift(id, () => { this.getAll() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(ShiftDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'shift-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can" *app="deleteRole"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class ShiftDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteShiftItem"
  constructor(public dialogRef: MatDialogRef<ShiftDeleteTemplate>) {
  }
}
//#endregion
