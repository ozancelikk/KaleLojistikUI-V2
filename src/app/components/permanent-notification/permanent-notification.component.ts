import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { AgGridModule } from 'ag-grid-angular';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { PermanentNotification } from '../../models/permanentNotification/permanentNotification';
import { changeDataTableHeightNotNavbar } from '../../../assets/js/main';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PermanentNotificationComponentService } from '../../services/component/permanent-notification-component.service';


@Component({
  selector: 'app-permanent-notification',
  standalone: true,
  imports: [CommonModule,AgGridModule],
  templateUrl: './permanent-notification.component.html',
  styleUrl: './permanent-notification.component.css'
})
export class PermanentNotificationComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  permanentNotification:PermanentNotification
  constructor(private permanentComonentService:PermanentNotificationComponentService,private dialog:MatDialog) {}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field: 'employeeId',headerName: this.lang.employeeName,unSortIcon: true,},
    {field: 'notificationTitle',headerName: this.lang.notificationTitle,unSortIcon: true,},
    {field: 'notificationBody',headerName: this.lang.notificationBody,unSortIcon: true,},
    {field: 'notificationDate',headerName: this.lang.notificationDate,unSortIcon: true,},
    { field: 'status', headerName: this.lang.status, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.active : this.lang.passive; } },
    {field: 'NotificationTrigger',headerName: this.lang.sendNotification,filter: false,valueGetter: (params) => {return 'NotificationTrigger';
    },
    cellRenderer: () => {
      return `<i class="fa-solid fa-bell"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
    },
    onCellClicked: (event: CellClickedEvent) =>
      this.sendNotification(event.data.id),
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
    this.getAllPermanentNotification()
  }
  async getAllPermanentNotification(){
    this.rowData=await this.permanentComonentService.getAllPermanentNotification()
    changeDataTableHeightNotNavbar();
    window.addEventListener('resize', changeDataTableHeightNotNavbar);
  }
  async sendNotification(Id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
    (await this.permanentComonentService.sendNotification(Id,()=>{this.getAllPermanentNotification()}))
    })
  }

  openDialog() {
    return this.dialog.open(SendNotificationTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
}
@Component({
  selector: 'permanent-notification-template-dashboard',
  template: `
   <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoSendNotification}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-24" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-4" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-regular fa-paper-plane" *app="triggerRole"></i> {{lang.send}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],
  
})
export class SendNotificationTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  triggerRole:string="GET.Reading.NotificationTriggerPermanentNotificationItem";
  constructor(public dialogRef: MatDialogRef<SendNotificationTemplate>) {
  }
}