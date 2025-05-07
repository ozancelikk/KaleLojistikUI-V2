import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { DutyCommentComponentService } from '../../services/component/duty-comment-component.service';
import { ToastrService } from 'ngx-toastr';
import { DutyComment } from '../../models/duty/dutyComment';
import { GridOptions, ColDef, ColGroupDef, CellClickedEvent, SideBarDef, GridReadyEvent } from 'ag-grid-community';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { changeDataTableHeightNotNavbar } from '../../../assets/js/main';

@Component({
  selector: 'app-duty-comment',
  standalone: true,
  imports: [CommonModule,AgGridModule],
  templateUrl: './duty-comment.component.html',
  styleUrl: './duty-comment.component.css'
})
export class DutyCommentComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  dutycomment:DutyComment
  commentDeletedId:boolean
  constructor(private dutyCommentComponentService:DutyCommentComponentService,private toastrService:ToastrService,private dialog:MatDialog) {}
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.name, unSortIcon: true,},
    { field: 'surname', headerName: this.lang.surname, unSortIcon: true, },
    { field: 'email', headerName: this.lang.email, unSortIcon: true, },
    { field: 'roomId', headerName: this.lang.roomName, unSortIcon: true, },
    { field: 'content', headerName: this.lang.content, unSortIcon: true, },
    { field: 'dutyRate', headerName: this.lang.dutyRate, unSortIcon: true ,cellRenderer:(params)=>{return this.asd(params.data.dutyRate)}},
    { field: 'dutyCommentDate', headerName: this.lang.dutyCommentDate, unSortIcon: true, },
    
    {
      field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
        return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteDutyId(event.data.id),
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
    this.getAllDutyComment()
  }

  async getAllDutyComment(){
    this.rowData=await this.dutyCommentComponentService.getAllDetails()
    console.log(this.rowData);
    
    changeDataTableHeightNotNavbar()
    window.addEventListener("resize", changeDataTableHeightNotNavbar)
  }
  async getByDutyCommentId(id:string){
    this.dutycomment=await this.dutyCommentComponentService.getByDutyCommentId(id)
  }
  onDeleteDutyId(Id: string) {
    this.commentDeletedId = true;
    this.deleteDuty(Id);
  }
  deleteDuty(id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.dutyCommentComponentService.deleteDutyComment(id, () => { this.getAllDutyComment() }))
    })
  }
  openDialog() {
    return this.dialog.open(DutyCommentDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  asd(value:any){
    let data="";
    for(let i=0;i<value;i++)
      data+=`<i class="fa-solid fa-star"></i>`
    let data2=5-value;
    for(let i=0;i<data2;i++)
      data+=`<i class="fa-regular fa-star"></i>`
    console.log(data);
    
    return data;
  }

}
@Component({
  selector: 'duty-comment-delete-template',
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
export class DutyCommentDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(public dialogRef: MatDialogRef<DutyCommentDeleteTemplate>) {
  }
}
