import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Dissolution } from '../../models/dissolution/dissolution';
import { DissolutionComponentService } from '../../services/component/dissolution-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { changeDataTableHeight } from '../../../assets/js/main';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { AddDissolutionComponent } from './add-dissolution/add-dissolution.component';
import { UpdateDissolutionComponent } from './update-dissolution/update-dissolution.component';
import { NavbarDissolutionComponent } from './navbar-dissolution/navbar-dissolution.component';


@Component({
  selector: 'app-dissolution',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddDissolutionComponent,UpdateDissolutionComponent,NavbarDissolutionComponent],
  templateUrl: './dissolution.component.html',
  styleUrl: './dissolution.component.css'
})
export class DissolutionComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  dissolutions: Dissolution[]
  dissolution: Dissolution
  dissolutionDeleteId: boolean = false
  constructor(private dissolutionComponentService: DissolutionComponentService, private dialog: MatDialog) { }

   //#region Ag-Grid

   protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'productName', headerName: this.lang.productName, unSortIcon: true, },
    { field: 'batchNumber', headerName: this.lang.batchNumber, unSortIcon: true, },
    { field: 'description', headerName: this.lang.description, unSortIcon: true, },
    { field: 'personName', headerName: this.lang.personName, unSortIcon: true, },
    { field: 'startDate', headerName: this.lang.startDate, unSortIcon: true, },
    { field: 'endDate', headerName: this.lang.endDate, unSortIcon: true, },
    { field: 'startDeggre', headerName: this.lang.startDeggre, unSortIcon: true, },
    { field: 'finishDeggre', headerName: this.lang.finishDeggre, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDissolutionModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByDissolutionId(event.data.id)
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
        this.onDeleteDepartmentId(event.data.id),
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
    this.getAllDissolution()
  }
  //#endregion


  //#region  get Methods
  async getAllDissolution() {
    this.rowData = await this.dissolutionComponentService.getAllDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByDissolutionId(id: string) {
    this.dissolution = await this.dissolutionComponentService.getByDissolutionId(id)
  }
  //#endregion
  
  //#region  delete Methods
  onDeleteDepartmentId(id: string) {
    this.dissolutionDeleteId = true;
    this.deleteDepartment(id)
  }
  deleteDepartment(id: string) {
    if (this.dissolutionDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.dissolutionComponentService.deleteDissolution(id, () => { this.getAllDissolution() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(DissolutionDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

}
//#region delete Component
@Component({
  selector: 'dissolution-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteDissolutionRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class DissolutionDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteDissolutionRole: string = "GET.Deleting.DissolutionDeleteDissolutionItem"

  constructor(public dialogRef: MatDialogRef<DissolutionDeleteTemplate>) {
  }
}
//#endregion
