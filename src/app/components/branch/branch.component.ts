import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Branch } from '../../models/branch/branch';
import { BranchCount } from '../../models/branch/branchCount';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchComponentService } from '../../services/component/branch-component.service';
import { CommonModule } from '@angular/common';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';
import { BranchChartsComponent } from './branch-charts/branch-charts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'; 
import { DutyComponentService } from '../../services/component/duty-component.service';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { BranchFilterPipe } from '../../pipes/branch-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule,AddBranchComponent,UpdateBranchComponent,BranchChartsComponent,BranchFilterPipe,NgxPaginationModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css',
  providers:[BranchComponentService]
})
export class BranchComponent {
  @Input() filterText;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  //Class 
  branchs: Branch[]
  branchCounts: BranchCount[]
  branch: Branch
  characters: Branch[];
  branchCount: any
  rowData:any
  @Input() branchId: string;

  //Form Group
  reactiveForm: ReactiveFormsModule;

  branchUpdateForm: any;
  branchAddForm: FormGroup;


  //Flag
  dataLoaded = false;
  branchUpdateLoad = false
  isDeletedId = false;
  isBranchLoad = false
  isLoading = false; 
  deleteBranchItem: "GET.Deleting.DeleteBranchItem"
  deleteAdminBranchItem: "GET.Deleting.DeleteAdminBranchItem"
  updateBranchItem: "POST.Updating.UpdateBranchItem"

  //Paginatio

  paginatedBranch: any[] = [];
  pageSize: number = 6;
  //Chart
  dutiesCountByBranch: DutyGroupIdCount[]; 
  constructor(private branchComponentService: BranchComponentService,private dialog:MatDialog,private dutyComponentService:DutyComponentService) { }

  ngOnInit(): void {  
    this.getAllBranch();
    this.getAllWithCounts();
  }

  
 

  //#region  Get Method 
  async getBranchStatusCount() {
    this.dutiesCountByBranch =[];
    this.dutiesCountByBranch = await this.dutyComponentService.getBranchStatusCount();

  }

   async getAllBranch() {
    (await this.branchComponentService.getAll((response=>{
      this.branchs = response.data
      this.paginatedBranch=[...this.branchs];
      this.getAllWithCounts();
      this.getBranchStatusCount();
    })))
  }
  async getAllWithCounts() {
    this.branchCounts= (await this.branchComponentService.getAllWithCount())
  }
  isDisabled(id: string): boolean {
  
    const branch = this.branchCounts.find(branch => branch.id === id);
    return branch ? branch.blockCount < 1 : true;
  }

  ad(id: string) {
    for (let i = 0; i < this.branchCounts.length; i++) {
      if (this.branchCounts[i].id == id) {
        this.branchCount = this.branchCounts[i].blockCount
      }
    }
    return false
  }
  async getByBranch(Id: string) {
    this.branch=(await this.branchComponentService.getByBranchId(Id))
    this.branchUpdateLoad = true;
  }
  //#endregion

  //#region Delete and On Method

  onDeleteBranch(id: string) {
    this.branchId = id;
    this.isDeletedId = true;
    this.deleteBranch(id)
  }
  deleteBranch(id: string) {
    if (this.isDeletedId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.branchComponentService.branchSuserDelete(id,()=>{this.getAllBranch()})    
      }) 
    }  
  }
  openDialog() {
    return this.dialog.open(BranchDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion

  //#region  Pagination
  getPaginationSize(){
    return Number(localStorage.getItem("paginationLimit"))
  }
  page:number=1;

  //#endregion
}

//#region delete Component
@Component({
  selector: 'branch-delete-template',
  template: `
  <h6 mat-dialog-title style="font-size: 13pt; margin-bottom:0px !important;padding-bottom: 0px;">{{lang.areYouSureYouWanttoDelete}}</h6> 
  <h6 mat-dialog-title style="font-size: 13pt; margin-top:0px !important;"> <b>{{lang.everythinginsidewillbedeleted}}</b></h6>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" *app="this.deleteAdminBranchItem" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class BranchDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  deleteAdminBranchItem:string= "GET.Deleting.DeleteAdminBranchItem"

  constructor(public dialogRef: MatDialogRef<BranchDeleteTemplate>) {
  }
}
//#endregion

