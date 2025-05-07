import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { CompanyComponentService } from '../../services/component/company-component.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { Company } from '../../models/company/compant';
import { MatButtonModule } from '@angular/material/button';
import { NavbarCompanyComponent } from './navbar-company/navbar-company.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule,AgGridModule,NavbarCompanyComponent,AddCompanyComponent,UpdateCompanyComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  company:Company
  companyDeleteId:boolean=false
  constructor(private companyComponentService:CompanyComponentService,private dialog:MatDialog){}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'companyName', headerName: this.lang.companyName, unSortIcon: true, },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateCompanyModal"></i>`;
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
        this.onDeleteCompanyId(event.data.id),
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
  //#region  Get Methods

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.getAll()
  }
  async getAll(){
    this.rowData= await this.companyComponentService.getAllCompany()
  }
  async getById(id:string){
    this.company=await this.companyComponentService.getById(id)
  }
  //#endregion
  //#region  Delete Method
  onDeleteCompanyId(id: string) {
    this.companyDeleteId = true;
    this.deleteCompany(id)
  }
  deleteCompany(id: string) {
    if (this.companyDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.companyComponentService.deleteCompany(id, () => { this.getAll() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(CompanyDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
}
//#region delete Component
@Component({
  selector: 'company-delete-template',
  template: `
  <div >
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button *app="this.deleteCompanyItem" class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
</div>
  `,
  styles: [`::ng-deep .cdk-overlay-container {z-index: 9999 !important;}`],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, ],

})
export class CompanyDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteCompanyItem = "GET.Deleting.DeleteCompanyItem";
  constructor(public dialogRef: MatDialogRef<CompanyDeleteTemplate>) {
  }
}
//#endregion
