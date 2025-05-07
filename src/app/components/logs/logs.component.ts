import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Logs } from '../../models/logs/logs';
import { LogsComponentService } from '../../services/component/logs-component.service';
import { GridOptions, ColDef, ColGroupDef, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { changeDataTableHeight, changeDataTableHeightNotNavbar } from '../../../assets/js/main';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule,AgGridModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  logs:Logs[];

  constructor(private logsComponentService:LogsComponentService){}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {field: 'date',headerName: this.lang.date,unSortIcon: true, maxWidth: 250 },
    {field: 'time',headerName: this.lang.time,unSortIcon: true,maxWidth: 250 },
    {field: 'logUIMessage', headerName: this.lang.message, unSortIcon: true },
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
    this.getAllLogs()
  }

  async getAllLogs() {
    this.rowData=(await this.logsComponentService.getAllLogs())  
    changeDataTableHeightNotNavbar()
    window.addEventListener("resize", changeDataTableHeightNotNavbar)
  }
}
