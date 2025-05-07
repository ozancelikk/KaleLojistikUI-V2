import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { ErrorLogComponentService } from '../../services/component/error-log-component.service';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { changeDataTableHeightNotNavbar } from '../../../assets/js/main';

@Component({
  selector: 'app-error-log',
  standalone: true,
  imports: [CommonModule,AgGridModule],
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css'
})
export class ErrorLogComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  constructor(private errorLogComponentService:ErrorLogComponentService) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'exceptionMessage', headerName: this.lang.exceptionMessage, unSortIcon: true, },
    { field: 'methodName', headerName: this.lang.methodName, unSortIcon: true, },
    { field: 'serviceName', headerName: this.lang.serviceName, unSortIcon: true, },
    { field: 'userId', headerName: this.lang.userName, unSortIcon: true },
    { field: 'timeStamp', headerName: this.lang.timeStamp, unSortIcon: true, },
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
    this.getAllErrorLog()
  }

  async getAllErrorLog(){
    this.rowData=await this.errorLogComponentService.getAllErrorLog()
    changeDataTableHeightNotNavbar()
    window.addEventListener("resize", changeDataTableHeightNotNavbar)
    console.log(this.rowData);
    
  }

}
