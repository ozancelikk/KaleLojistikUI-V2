import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationComponentService } from '../../services/component/notification-component.service';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Notifications } from '../../models/notification/notifications';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarNotificationComponent } from './navbar-notification/navbar-notification.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,AgGridModule,NavbarNotificationComponent,AddNotificationComponent,UpdateNotificationComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  notifications:Notifications[]
  notification:Notifications
  notificationId:string
  isDeletedId:boolean
  constructor(private notificationComponentService:NotificationComponentService,private dialog:MatDialog){}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field: 'notificationName',headerName: this.lang.notificationName,unSortIcon: true,},
    {field: 'notificationDescription',headerName: this.lang.notificationDescription,unSortIcon: true,},
    {field: 'reminderTime',headerName: this.lang.remindertime,unSortIcon: true,},
    {field: 'date',headerName: this.lang.date,unSortIcon: true,},
    {field: 'startNotificationDate',headerName: this.lang.startNotificationDate,unSortIcon: true,},
    {field: 'endNotificationDate',headerName: this.lang.endNotificationDate,unSortIcon: true,},
    {field: 'nextRunTime',headerName: this.lang.nextRunTime,unSortIcon: true,},
    {field: 'personId',headerName: this.lang.personId,unSortIcon: true,},
    {field: 'email',headerName: this.lang.email,unSortIcon: true,},
    {field: 'Update',headerName: this.lang.update,filter: false,valueGetter: (params) => {return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#notificationUpdateModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>{
        this.getByNotification(event.data.id)
      }
    },
    {field: 'Delete',headerName: this.lang.delete,filter: false,valueGetter: (params) => {return 'Delete';
  },
  cellRenderer: () => {
    return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
  },
  onCellClicked: (event: CellClickedEvent) =>
    this.onDeleteNotification(event.data.id),
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
    this.getAllNotification()
  }

  //#region Get Method
  async getAllNotification(){
    this.rowData=(await this.notificationComponentService.getAllNotificationDetails())    
    changeDataTableHeight() 
    window.addEventListener("resize",changeDataTableHeight)
  }
  async getByNotification(id:string){
    this.notification=(await this.notificationComponentService.getByNotificationId(id))
  }
  //#endregion

  //#region Delete Method
  onDeleteNotification(id: string) {
    this.notificationId = id;
    this.isDeletedId = true;
    this.deleteNotification(id)
  }
   async deleteNotification(Id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
    (await this.notificationComponentService.deleteNotification(Id,()=>{this.getAllNotification()}))
    })
  }

  openDialog() {
    return this.dialog.open(NotificationDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

}
@Component({
  selector: 'notification-template-dashboard',
  template: `
   <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can" *app="deleteRole"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],
  
})
export class NotificationDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteNotificationItem"
  constructor(public dialogRef: MatDialogRef<NotificationDeleteTemplate>) {
  }
}