import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { DepartmentNavbarComponent } from './department-navbar/department-navbar.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Department } from '../../models/department/department';
import { DepartmentComponentService } from '../../services/component/department-component.service';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentUpdateComponent } from './department-update/department-update.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { DepartmentRoleUpdateComponent } from './department-role-update/department-role-update.component';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,AgGridModule,DepartmentUpdateComponent,DepartmentNavbarComponent,DepartmentAddComponent,DepartmentRoleUpdateComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  departments:Department[]
  department:Department
  departmentDeleteId:boolean=false
  constructor(private departmentComponentService:DepartmentComponentService,private dialog:MatDialog){}

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'departmentName', headerName: this.lang.departmentName, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDepartmentModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getById(event.data.id)
      }
    },
    {
      field: 'Claim', headerName: this.lang.updateOperationClaim, filter: false, valueGetter: (params) => {
        return 'Claim';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-user"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateDepartmentEndpointRoleModal"></i>`;
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
    this.getAll()
  }

  ngOnInit(){
    this.getAll();
  }

  //#region Get Method
  async getAll(){
    this.rowData=await this.departmentComponentService.getAllDepartment();
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getById(id:string){
    this.department=await this.departmentComponentService.getByDepartmentId(id);
  }
  //#endregion

  //#region  Delete Method
  onDeleteDepartmentId(id: string) {
    this.departmentDeleteId = true;
    this.deleteDepartment(id)
  }
  deleteDepartment(id: string) {
    if (this.departmentDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.departmentComponentService.deleteDepartment(id, () => { this.getAll() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(DepartmentDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'department-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteDepartmentRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, ],

})
export class DepartmentDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteDepartmentRole: string = "POST.Deleting.DeleteDepartmentItem"
  constructor(public dialogRef: MatDialogRef<DepartmentDeleteTemplate>) {
  }
}
//#endregion
