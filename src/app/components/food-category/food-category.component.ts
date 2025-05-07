import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FoodCategoryComponentService } from '../../services/component/restaurant/food-category-component.service';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { FoodCategory } from '../../models/restaurant/foodCategory';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddFoodCategoryComponent } from './add-food-category/add-food-category.component';
import { UpdateFoodCategoryComponent } from './update-food-category/update-food-category.component';
import { NavbarFoodCategoryComponent } from './navbar-food-category/navbar-food-category.component';
import { ImageFoodCategoryComponent } from './image-food-category/image-food-category.component';
import { FoodCategoryImageDetailsDto } from '../../models/restaurant/foodCategoryImageDetailsDto';


@Component({
  selector: 'app-food-category',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddFoodCategoryComponent,UpdateFoodCategoryComponent,NavbarFoodCategoryComponent,ImageFoodCategoryComponent],
  templateUrl: './food-category.component.html',
  styleUrl: './food-category.component.css'
})
export class FoodCategoryComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  foodCategory:FoodCategory;
  foodCategoryId:string;
  foodCategoryDeleteId:boolean;
  foodCategoryImageDetailsDto :FoodCategoryImageDetailsDto

  constructor(private foodCategoryComponentService:FoodCategoryComponentService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'categoryName', headerName: this.lang.foodCategoryName, unSortIcon: true, },
    {
      field: 'UpdateImage', headerName: this.lang.foodCategoryImage, filter: false, valueGetter: (params) => {
        return 'UpdateImage';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateCategoryImage"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getImageByFoodCategoryId(event.data.id)
        this.getbyFoodCategoryId(event.data.id)
      }
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#foodCategoryUpdateModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getbyFoodCategoryId(event.data.id)
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
        this.onDeleteFoodCategory(event.data.id),
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
    this.getAllFoodCategory()
  }

  //#region Get Method
  async getAllFoodCategory(){
    this.rowData=(await this.foodCategoryComponentService.getAllFoodCategory())
  }
  async getbyFoodCategoryId(id:string){
    this.foodCategory=(await this.foodCategoryComponentService.getByFoodCategoryId(id))
  }
  async getImageByFoodCategoryId(id:string){
    this.foodCategoryImageDetailsDto=(await this.foodCategoryComponentService.getImageByFoodCategoryId(id))
  }
  //#endregion

  //#region Delete Method
  onDeleteFoodCategory(id:string){
    this.foodCategoryId = id;
    this.foodCategoryDeleteId = true;
    this.deleteFoodCategory(id)
  }
  deleteFoodCategory(id: string) {
    if (this.foodCategoryDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.foodCategoryComponentService.deleteFoodCategory(id, () => { this.getAllFoodCategory() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(FoodCategoryDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'food-category-delete-template',
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
export class FoodCategoryDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteFoodCategoryItem"
  constructor(public dialogRef: MatDialogRef<FoodCategoryDeleteTemplate>) {
  }
}
//#endregion
