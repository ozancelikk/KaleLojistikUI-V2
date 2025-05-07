import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AddDocumentFileComponent } from './add-document-file/add-document-file.component';
import { FormGroup } from '@angular/forms';
import { faFileArrowDown, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { DocumentFile } from '../../models/documentfile/documentFile';
import { DocumentFileComponentService } from '../../services/component/document-file-component.service';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { NavbarDocumentFileComponent } from './navbar-document-file/navbar-document-file.component';
import { changeDataTableHeight } from '../../../assets/js/main';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-document-file',
  standalone: true,
  imports: [CommonModule,AgGridModule,AddDocumentFileComponent,NavbarDocumentFileComponent],
  templateUrl: './document-file.component.html',
  styleUrl: './document-file.component.css'
})
export class DocumentFileComponent {
  lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  files:File;
  id:string
  documents:DocumentFile[];
  documentName:string;
  documentDescription:string;
  dataLoaded=false;
  uploadForm: FormGroup;
  faDownload=faFileArrowDown;
  faTrash=faTrashCan;
  constructor(private documentFileComponentService:DocumentFileComponentService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'documentName', headerName: this.lang.documentName, unSortIcon: true, },
    { field: 'personName', headerName: this.lang.personName, unSortIcon: true, },
    { field: 'departmentId', headerName: this.lang.departmentName, unSortIcon: true, },
    { field: 'Download', headerName: this.lang.pdfDownLoad, filter: false, valueGetter: (params) => {
        return 'Download';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-file-pdf"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.downloadDocument(event.data.id,event.data.documentName),
    },
    { field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
      return 'Delete';
    },
    cellRenderer: () => {
      return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
    },
    onCellClicked: (event: CellClickedEvent) =>
      this.deleteDocument(event.data.id),
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
    this.loadDocuments()
  }
  async loadDocuments() {
    this.rowData=(await this.documentFileComponentService.getAllDocumentDetails())
    changeDataTableHeight() 
    window.addEventListener("resize",changeDataTableHeight)
  }
  async downloadDocument(documentId: string, documentName: string) {
    this.documentFileComponentService.downloadDocument(documentId,documentName);
  }
  
  
  deleteDocument(Id: string) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.documentFileComponentService.deleteDocument(Id,()=>{this.loadDocuments()})    
      }) 
  }
  openDialog() {
    return this.dialog.open(DocumentDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
}
//#region delete Component
@Component({
  selector: 'document-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteDocumentRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class DocumentDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteDocumentRole="GET.Deleting.DeleteDocumentFileUploadItem";
  constructor(public dialogRef: MatDialogRef<DocumentDeleteTemplate>) {
  }
}
//#endregion
