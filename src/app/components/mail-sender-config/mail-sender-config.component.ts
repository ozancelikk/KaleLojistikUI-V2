import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { MailSenderConfig } from '../../models/mailSenderConfig/mailSenderConfig';
import { MailSenderConfigComponentService } from '../../services/component/mail-sender-config-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { changeDataTableHeight } from '../../../assets/js/main';
import { AgGridModule } from 'ag-grid-angular';
import { AddMailSenderConfigComponent } from './add-mail-sender-config/add-mail-sender-config.component';
import { UpdateMailSenderConfigComponent } from './update-mail-sender-config/update-mail-sender-config.component';
import { NavbarMailSenderConfigComponent } from './navbar-mail-sender-config/navbar-mail-sender-config.component';

@Component({
  selector: 'app-mail-sender-config',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddMailSenderConfigComponent,UpdateMailSenderConfigComponent,NavbarMailSenderConfigComponent],
  templateUrl: './mail-sender-config.component.html',
  styleUrl: './mail-sender-config.component.css'
})
export class MailSenderConfigComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  mailSenderConfig: MailSenderConfig
  ondeleteMailSenderConfig: boolean = false

  constructor(private mailSenderConfigComponentService: MailSenderConfigComponentService, private dialog: MatDialog) { }

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'nameAndSurname', headerName: this.lang.name, unSortIcon: true, },
    { field: 'sendEmail', headerName: this.lang.emailSender, unSortIcon: true, },
    { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateMailSenderConfigModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByMailConfigId(event.data.id)
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
        this.onDeleteMailConfig(event.data.id),
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
    this.getAllMailSenderConfig()
  }
  //#endregion


  //#region  GetAll Method
  async getAllMailSenderConfig() {
    this.rowData = await this.mailSenderConfigComponentService.getAllMailSenderConfigDetails()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByMailConfigId(id: string) {
    this.mailSenderConfig = await this.mailSenderConfigComponentService.getByMailConfigId(id)
  }
  //#endregion

  //#region Delete Method
  onDeleteMailConfig(id: string) {
    this.ondeleteMailSenderConfig = true;
    this.deleteMailSenderConfig(id)
  }
  deleteMailSenderConfig(id: string) {
    if (this.ondeleteMailSenderConfig) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.mailSenderConfigComponentService.deleteMailSenderConfig(id, () => { this.getAllMailSenderConfig() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(MailSenderConfigDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'mail-sender-config-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],

})
export class MailSenderConfigDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(public dialogRef: MatDialogRef<MailSenderConfigDeleteTemplate>) {
  }
}
//#endregion
