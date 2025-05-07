import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddAdditionalTaskComponent } from './add-additional-task/add-additional-task.component';
import { UpdateAdditionalTaskComponent } from './update-additional-task/update-additional-task.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { AdditionalTask } from '../../models/additionalTask/additionalTask';
import { AdditionalRoomTask } from '../../models/additionalTask/additionalRoomTask';
import { faArrowRightLong, faCaretDown, faCheck, faCodeBranch, faPen, faPlus, faRecycle, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdditionalTaskComponentService } from '../../services/component/additional-task-component.service';
import { firstValueFrom } from 'rxjs';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarAdditionalTaskComponent } from './navbar-additional-task/navbar-additional-task.component';
import { DetailAdditionalTaskComponent } from './detail-additional-task/detail-additional-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UpdateAdditionalComponent } from './update-additional/update-additional.component';


@Component({
  selector: 'app-additional-task',
  standalone: true,
  imports: [CommonModule, AddAdditionalTaskComponent,AgGridModule,NavbarAdditionalTaskComponent,DetailAdditionalTaskComponent,UpdateAdditionalComponent],
  templateUrl: './additional-task.component.html',
  styleUrl: './additional-task.component.css'
})
export class AdditionalTaskComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  //Class 
  additionalTasks: AdditionalTask[]
  additionalTasked: AdditionalTask
  tasks: AdditionalRoomTask[]

  //Form Group
  additionalTaskId: string;
  //Flag
  dataLoaded = false;
  isDeletedId = false;
  isAdditionalTaskLoad = false
  isModalOpen = false

  //Pagination
  itemsPerPageOptions: number[] = [6, 12, 24];
  selectedItemsPerPage: number = 6;
  currentPage: number = 1;
  constructor(private additionalTaskComponentService: AdditionalTaskComponentService,private dialog:MatDialog) { }

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field: 'name', headerName: this.lang.dutyStations, unSortIcon: true },
    {field: 'DetailTask',headerName: this.lang.taskDetails,filter: false,valueGetter: (params) => {return 'DetailTask';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-info"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#taskDetailModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.getByAdditionalTask(event.data.id),
    },
    {field: 'Delete',headerName: this.lang.delete,filter: false,valueGetter: (params) => {return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteAdditionalTask(event.data.id),
    },
    {field: 'Update',headerName: this.lang.update,filter: false,valueGetter: (params) => {return 'Update';
  },
  cellRenderer: () => {
    return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#additionalUpdateModal"></i>`;
  },
  onCellClicked: (event: CellClickedEvent) =>{
    this.getByAdditionalTask(event.data.id)
  }
},
    // {field: 'UpdateTask',headerName: this.lang.updateAdditionalTask,filter: false,valueGetter: (params) => {return 'UpdateTask';
    //   },
    //   cellRenderer: () => {
    //     return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#additionalTaskUpdateModal"></i>`;
    //   },
    //   onCellClicked: (event: CellClickedEvent) =>{
    //     this.getByAdditionalTask(event.data.id)
    //   }
    // },
 
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
    this.rowData = (await this.additionalTaskComponentService.getAllDetails())
    this.dataLoaded = true;
  }
  async getByAdditionalTask(id: string) {
    this.additionalTasked = (await this.additionalTaskComponentService.getByAdditionalTaskId(id))
  }

  //#endregion

  //#region Delete and On Method

  onDeleteAdditionalTask(id: string) {
    this.additionalTaskId = id;
    this.isDeletedId = true;
    this.deleteAdditionalTask(id)
  }
  deleteAdditionalTask(Id: string) {
    if (this.isDeletedId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.additionalTaskComponentService.deleteAdditionalTask(Id,()=>{this.getAll()})    
      }) 
    }  
  }
  openDialog() {
    return this.dialog.open(AdditionaltaskDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'additional-task-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
   <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
     <button *app="this.deleteRole" class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class AdditionaltaskDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole="GET.Deleting.DeleteAdditionalTaskItem"
  constructor(public dialogRef: MatDialogRef<AdditionaltaskDeleteTemplate>) {
  }
}
//#endregion
