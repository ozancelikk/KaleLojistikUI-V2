import { Component, Input } from '@angular/core';
import { BlockComponentService } from '../../services/component/block-component.service';
import { Branch } from '../../models/branch/branch';
import { BranchCount } from '../../models/branch/branchCount'; 
import { Block } from '../../models/block/block';
import { CommonModule } from '@angular/common';
import { BlockUpdateComponent } from './block-update/block-update.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchComponentService } from '../../services/component/branch-component.service';
import { Languages } from '../../../assets/locales/language';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { BlockChartsComponent } from './block-charts/block-charts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DetailBlockComponent } from './detail-block/detail-block.component';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { BranchFilterPipe } from '../../pipes/branch-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockAddComponent } from './block-add/block-add.component';


@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule, BlockAddComponent, BlockUpdateComponent,BlockChartsComponent,DetailBlockComponent,BranchFilterPipe,NgxPaginationModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css'
})
export class BlockComponent {
  @Input() filterText;

  @Input() set filterBranchId(value: string) {
    this.getAllBranchId(value);
  }
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  //Class Group
  branchs: Branch[];
  blockCounts: BranchCount[];
  blocks: Block[];
  characters: Block[];
  block: Block;
  branchId: string
  blockId:string;
  deleteBlockItem= "GET.Deleting.DeleteBlockItem"
  updateBlockItem= "POST.Updating.UpdateBlockItem"
  detailsBlockRole="GET.Reading.GetByBlockIdBlockItem";

  //flag 
  deleteId = false;
  isBlockLoad = false
  dataLoaded = false;
  isDeletedId=false;



  //pagination
  getPaginationSize(){
    return Number(localStorage.getItem("paginationLimit"))
  }

  page:number=1;
  paginatedBlock: any[] = [];
  pageSize: number = 6;

    //Chart
    dutiesCountByBlock: DutyGroupIdCount[]; 
    
  constructor(private dialog:MatDialog,private blockComponentservice: BlockComponentService, private router: Router, private branchComponentService: BranchComponentService, private activatedRoute: ActivatedRoute,
    private dutyComponentService:DutyComponentService) { }
  ngOnInit(): void {
    this.getAllBlock()
  }

    //#region Delete and On Method

    async getBranchStatusCount() {
      this.dutiesCountByBlock=[]
      this.dutiesCountByBlock = await this.dutyComponentService.getBlockStatusCount();
    }

    onDeleteBlock(id: string) {
      this.blockId = id;
      this.isDeletedId = true;
      this.deleteBlock(id)
    }
    
    deleteBlock(Id: string) {
      if (this.isDeletedId) {
        this.openDialog().afterClosed().subscribe(async result => {
          if (!result) {
            return
          }
          this.blockComponentservice.deleteBlock(Id,()=>{this.getAllBlock()})    
        }) 
      }  
    }
    openDialog() {
      return this.dialog.open(BlockDeleteTemplate, {
        width: '550px',
        panelClass: 'matdialog-delete',
      });
    }

    //#endregion

  //#region Get Method
  getBranchId() {
    this.branchId = localStorage.getItem("selectedBranchId");
  }

  async getByBranch(Id: string) {
    this.block = (await this.blockComponentservice.getByBranchId(Id))
    this.dataLoaded = true;
  }
  async getDetailsByBlockId(Id: string) {
    this.block = (await this.blockComponentservice.getDetailsByBlockId(Id))
  }
  async getAllBranchId(Id: string) {
    this.blocks = (await this.blockComponentservice.getAllByBranchId(Id))
    this.dataLoaded = true;
  }
  async getAllSelectedBranchId(Id: string) {
    this.blocks = (await this.blockComponentservice.getAllByBranchId(Id))
    this.dataLoaded = true;
    this.router.navigate(["/block"])
  }

  async getAllWithCounts() {
    this.blockCounts = (await this.blockComponentservice.getAllWithCount())
    this.dataLoaded = true;
  }
  isDisabled(id: string): boolean {
    const block = this.blockCounts.find(block => block.id === id);
    return block ? block.floorCount < 1 : true;
  }
  async getByBlock(Id: string) {
    this.block = (await this.blockComponentservice.getByBlockId(Id))
    this.isBlockLoad = true;
  }
   getAllBlock() {
    this.dataLoaded = false;  
    this.blockComponentservice.getAll().then(response=>{
      this.getBranchStatusCount().then(()=>{ 
        this.getAllWithCounts().then(()=>{
          this.blocks = response.data
          this.dataLoaded = true;
        });
      });
   
    })
    //  this.blockComponentservice.getAll((response=>{
    //   console.log(response.data);
    //   this.blocks = response.data
    //   this.getBranchStatusCount();
    //   this.getAllWithCounts();
    //   this.dataLoaded = true;
    // }))
  }
  async getAllBranch(successCallBack?: () => void) {
    this.branchs = (await this.branchComponentService.getAllBranch())
    if (successCallBack) {
      successCallBack();
    }
  }

  //#endregion

  //#region  Pagination
  updatePaginationStyle(marginTopValue: string): void {
    const paginationElement = document.querySelector('.pagination') as HTMLElement;
    if (paginationElement) {
      paginationElement.style.marginTop = marginTopValue;
    }
  }

  //#endregion
}

//#region delete Component
@Component({
  selector: 'floor-delete-template',
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
export class BlockDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(public dialogRef: MatDialogRef<BlockDeleteTemplate>) {
  }
}
//#endregion
