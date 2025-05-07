import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { Language } from '../../../models/language/language';
import { Languages } from '../../../../assets/locales/language';
import { Category } from '../../../models/category/category';
import { CategoryComponentService } from '../../../services/component/stock-tracking/category-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { changeDataTableHeight } from '../../../../assets/js/main';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { NavbarCategoryComponent } from './navbar-category/navbar-category.component';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddCategoryComponent,UpdateCategoryComponent,NavbarCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  categories:Category[];
  category:Category;
  categoryDeleteId:boolean;

  constructor(private categoryComponentService:CategoryComponentService,private dialog:MatDialog) {}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.categoryName, unSortIcon: true, },
    { field: 'description', headerName: this.lang.categoryDescription, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateCategoryModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByCategoryId(event.data.id)
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
        this.onDeleteCategoryId(event.data.id),
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
    this.getAllCategory()
  }

  //#region  GetMethods
  async getAllCategory(){
    this.rowData=await this.categoryComponentService.getAllCategory()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getByCategoryId(id:string){
    this.category=await this.categoryComponentService.getByCategoryId(id)
  }
  //#endregion

  //#region Delete Methods
  onDeleteCategoryId(id: string) {
    this.categoryDeleteId = true;
    this.deleteCategory(id)
  }
  deleteCategory(id: string) {
    if (this.categoryDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.categoryComponentService.deleteCategory(id, () => { this.getAllCategory() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(CategoryDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'category-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class CategoryDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteCategoryItem"
  constructor(public dialogRef: MatDialogRef<CategoryDeleteTemplate>) {
  }
}
//#endregion
