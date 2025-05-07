import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { ImageMenuComponent } from './image-menu/image-menu.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { Menu } from '../../models/restaurant/menu';
import { MenuComponentService } from '../../services/component/restaurant/menu-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MenuImageDetailsDto } from '../../models/restaurant/menuImageDetailsDto';
import { changeDataTableHeight } from '../../../assets/js/main';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddMenuComponent,UpdateMenuComponent,NavbarMenuComponent,ImageMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem('lng'))
  menu:Menu;
  menuId:string;
  menuDeleteId:boolean;
  menuImage:MenuImageDetailsDto;
  // menuImageDetailsDto :MenuImageDetailsDto

  constructor(private menuComponentService:MenuComponentService,private dialog:MatDialog) { }

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'productName', headerName: this.lang.productName, unSortIcon: true, },
    { field: 'productDescription', headerName: this.lang.productDescription, unSortIcon: true, },
    { field: 'foodCategoryId', headerName: this.lang.foodCategoryName, unSortIcon: true, },
    { field: 'price', headerName: this.lang.price, unSortIcon: true, },
    {
      field: 'UpdateImage', headerName: this.lang.productImage, filter: false, valueGetter: (params) => {
        return 'UpdateImage';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateMenuImage"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getImageByMenuId(event.data.id)
        this.getByMenuId(event.data.id)
      }
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#menuUpdateModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByMenuId(event.data.id)
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
        this.onDeleteMenu(event.data.id),
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
    this.getallMenu()
  }

  //#region  Get Method
  async getallMenu(){
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
    this.rowData= (await this.menuComponentService.getAllImagesDetails())
  }
  async getByMenuId(id:string){
    this.menu= (await this.menuComponentService.getByMenuId(id))
  }
  async getImageByMenuId(id:string){
    this.menuImage= (await this.menuComponentService.getImagesByMenuId(id))
  }
  //#endregion

  //#region Delete Method
  onDeleteMenu(id:string){
    this.menuId = id;
    this.menuDeleteId = true;
    this.deleteMenu(id)
  }
  deleteMenu(id: string) {
    if (this.menuDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.menuComponentService.deleteMenu(id, () => { this.getallMenu() })
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
  deleteRole:string="GET.Deleting.DeleteMenuItem"
  constructor(public dialogRef: MatDialogRef<MenuDeleteTemplate>) {
  }
}
//#endregion
