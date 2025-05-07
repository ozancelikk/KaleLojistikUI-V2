import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddMaterialManagementComponent } from './add-material-management/add-material-management.component';
import { UpdateMaterialManagementComponent } from './update-material-management/update-material-management.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialManagementComponentService } from '../../services/component/material-management-component.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { MaterialManagement } from '../../models/materialManagement/materialManagement';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { NavbarMaterialManagementComponent } from './navbar-material-management/navbar-material-management.component';
import { MaterialUsageComponent } from './material-usage/material-usage.component';
import { SecurityAlertComponent } from './security-alert/security-alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { changeDataTableHeight } from '../../../assets/js/main';


@Component({
  selector: 'app-material-management',
  standalone: true,
  imports: [CommonModule, AddMaterialManagementComponent, UpdateMaterialManagementComponent, AgGridModule,NavbarMaterialManagementComponent,MaterialUsageComponent,SecurityAlertComponent],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css'
})
export class MaterialManagementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  //Class 
  materialManagements: MaterialManagement[]
  materialManagement: MaterialManagement

  //Form Group
  reactiveForm: ReactiveFormsModule;
  materialId: string;
  materialUpdateForm: any;
  materialAddForm: FormGroup;


  //Flag
  dataLoaded = false;
  materialUpdateLoad = false
  isDeletedId = false;
  isMaterialLoad = false

  constructor(private materialManagementComponentService: MaterialManagementComponentService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field: 'materialName',headerName: this.lang.materialName,unSortIcon: true,},
    {field: 'materialUsage',headerName: this.lang.materialUsage,filter: false,valueGetter: (params) => {return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-eye"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#materialUsageModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>{
        this.getByMaterial(event.data.id)
      }
    },
    {field: 'securityAlert',headerName: this.lang.securityAlert,filter: false,valueGetter: (params) => {return 'SecurityAlert';
      },
      cellRenderer: () => {
        return `<i class="fa-regular fa-eye"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#securityAlertModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>{
        this.getByMaterial(event.data.id)
      }
    },
    {field: 'Delete',headerName: this.lang.delete,filter: false,valueGetter: (params) => {return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.deleteMaterial(event.data.id),
    },
    {field: 'Update',headerName: this.lang.update,filter: false,valueGetter: (params) => {return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateMaterialModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>{
        this.getByMaterial(event.data.id)
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
  public noRowsTemplate:any
  public rowData!: any[];
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };

  onGridReady(params: GridReadyEvent){
    params.api.sizeColumnsToFit();
    this.getAll()
  }


  //#region  Get Method 

  async getAll() {
    this.rowData = (await this.materialManagementComponentService.getAllMaterialManagement())   
    changeDataTableHeight() 
    window.addEventListener("resize",changeDataTableHeight)
  }
  async getByMaterial(Id: string) {
    this.materialManagement = (await this.materialManagementComponentService.getById(Id))
  }
  //#endregion

  //#region Delete and On Method

  onDeleteMaterial(Id: string) {
    this.materialId = Id;
    this.isDeletedId = true;
  }
   async deleteMaterial(Id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
    (await this.materialManagementComponentService.deleteMaterialManagement(Id,()=>{this.getAll()}))
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
  selector: 'work-accident-template-dashboard',
  template: `
   <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
   <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
     <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial  *app="deleteRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],
  
})
export class WorkAccidentDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteMaterialManagementItem"
  constructor(public dialogRef: MatDialogRef<WorkAccidentDeleteTemplate>) {
  }
}


