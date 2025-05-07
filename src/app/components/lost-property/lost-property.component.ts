import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { LostPropertyComponentService } from '../../services/component/property/lost-property-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { LostProperty } from '../../models/lostPropertys/lostProperty';
import { LostPropertyImageDetailsDto } from '../../models/lostPropertys/lostPropertyImageDetailsDto';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { NavbarLostPropertyComponent } from './navbar-lost-property/navbar-lost-property.component';
import { AddLostPropertyComponent } from './add-lost-property/add-lost-property.component';
import { UpdateLostPropertyComponent } from './update-lost-property/update-lost-property.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { ImageLostPropertyComponent } from './image-lost-property/image-lost-property.component';


@Component({
  selector: 'app-lost-property',
  standalone: true,
  imports: [CommonModule,AgGridModule,NavbarLostPropertyComponent,AddLostPropertyComponent,UpdateLostPropertyComponent,ImageLostPropertyComponent],
  templateUrl: './lost-property.component.html',
  styleUrl: './lost-property.component.css'
})
export class LostPropertyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  lostProperty:LostProperty
  propertyId:string
  propertyDeleteId:boolean
  lostPropertyImageDetailsDto:LostPropertyImageDetailsDto
  constructor(private lostPropertyComponentService:LostPropertyComponentService,private dialog:MatDialog) { }

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'propertyName', headerName: this.lang.propertyName, unSortIcon: true, },
    { field: 'description', headerName: this.lang.description, unSortIcon: true, },
    { field: 'roomId', headerName: this.lang.roomName, unSortIcon: true, },
    { field: 'itemDiscoveryDate', headerName: this.lang.itemDiscoveryDate, unSortIcon: true, },
    { field: 'finishDate', headerName: this.lang.finishDate, unSortIcon: true, },
    { field: 'itemValuable', headerName: this.lang.itemValuable, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.yes : this.lang.no; }},
    { field: 'delivered', headerName: this.lang.delivered, unSortIcon: true, cellRenderer: (params: { value: boolean }) => { return params.value ? this.lang.wasDelivered: this.lang.notDelivered ; }},
    { field: 'employeeName', headerName: this.lang.employeeName, unSortIcon: true, },
    {
      field: 'UpdateImage', headerName: this.lang.productImage, filter: false, valueGetter: (params) => {
        return 'UpdateImage';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updatePropertImageModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getImagesByPropertyId(event.data.id)
        this.getById(event.data.id)
      }
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#propertyUpdateModal"></i>`;
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
        this.onDeleteProperty(event.data.id),
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
    this.getAllLostProperty()
  }
  //#region  GetMethods
  async getAllLostProperty(){
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
    this.rowData=await this.lostPropertyComponentService.getAllDetails()
  }
  async getById(id:string){
    this.lostProperty=await this.lostPropertyComponentService.getById(id)
  }
  async getImagesByPropertyId(id:string){
    this.lostPropertyImageDetailsDto=await this.lostPropertyComponentService.getImagesByPropertyId(id)
  }
  //#endregion

   //#region Delete Method
   onDeleteProperty(id:string){
    this.propertyId = id;
    this.propertyDeleteId = true;
    this.deleteProperty(id)
  }
  deleteProperty(id: string) {
    if (this.propertyDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.lostPropertyComponentService.deleteLostProperty(id, () => { this.getAllLostProperty() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(MenuDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'menu-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class MenuDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteLostPropertyItem"
  constructor(public dialogRef: MatDialogRef<MenuDeleteTemplate>) {
  }
}
//#endregion
