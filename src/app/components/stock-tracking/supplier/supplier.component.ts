import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { Supplier } from '../../../models/supplier/supplier';
import { SupplierComponentService } from '../../../services/component/stock-tracking/supplier-component.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';
import { changeDataTableHeight } from '../../../../assets/js/main';
import { NavbarSupplierComponent } from './navbar-supplier/navbar-supplier.component';


@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, AgGridModule, AddSupplierComponent, UpdateSupplierComponent, NavbarSupplierComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  supplier: Supplier
  supplierDeleteId: boolean = false
  constructor(private supplierComponentService: SupplierComponentService, private dialog: MatDialog) { }

  //#region Ag-Grid

  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.supplierName, unSortIcon: true, },
    { field: 'contactInfo', headerName: this.lang.contactInfo, unSortIcon: true, },
    { field: 'address', headerName: this.lang.address, unSortIcon: true, },

    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateSupplierModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getSupplierById(event.data.id)
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
        this.onDeleteSupplierId(event.data.id),
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
    this.getAllSupplier()
  }
  //#endregion

  //#region Get Methods
  async getAllSupplier() {
    this.rowData = await this.supplierComponentService.getAllSupplier()
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
  }
  async getSupplierById(id: string) {
    this.supplier = await this.supplierComponentService.getBySupplierId(id)
  }
  //#endregion

  //#region Delete Methods
  onDeleteSupplierId(id: string) {
    this.supplierDeleteId = true;
    this.deleteSupplier(id)
  }
  deleteSupplier(id: string) {
    if (this.supplierDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.supplierComponentService.deleteSupplier(id, () => { this.getAllSupplier() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(SupplierDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

}
//#region delete Component
@Component({
  selector: 'supplier-delete-template',
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
export class SupplierDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteSupplierItem"
  constructor(public dialogRef: MatDialogRef<SupplierDeleteTemplate>) {
  }
}
//#endregion

