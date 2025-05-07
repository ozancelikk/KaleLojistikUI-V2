import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddFloorComponent } from './add-floor/add-floor.component';
import { UpdateFloorComponent } from './update-floor/update-floor.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Branch } from '../../models/branch/branch';
import { Block } from '../../models/block/block';
import { BranchCount } from '../../models/branch/branchCount';
import { Floor } from '../../models/floor/floor';
import { FloorComponentService } from '../../services/component/floor-component.service';
import { BlockComponentService } from '../../services/component/block-component.service';
import { FloorChartsComponent } from './floor-charts/floor-charts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DetailFloorComponent } from './detail-floor/detail-floor.component';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { BranchFilterPipe } from '../../pipes/branch-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BranchComponentService } from '../../services/component/branch-component.service';


@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [CommonModule, AddFloorComponent, UpdateFloorComponent,BranchFilterPipe,FloorChartsComponent,NgxEchartsModule,DetailFloorComponent,NgxPaginationModule],
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css'
})
export class FloorComponent {
  @Input() filterText;
  @Input() set filterBranchId(value: string) {
    if (!value) return
    this.getAllBranchId(value);
  }
  @Input() set filterBlockId(value: string) {
    if (!value) return
    this.getAllByBlockId(value);
  }
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  branchs: Branch[];
  blocks: Block[];
  floorCounts: BranchCount[];
  floors: Floor[]
  characters: Floor[];
  floor: Floor
  branchId: string
  floorId: string
  //flag
  floorDeleteId = true;
  dataLoaded = false;
  blockDataLoaded = false
  floorUpdateLoad = false
  isFloorLoad = false
  //Icon

  paginatedFloors: any[] = [];
  pageSize: number = 6;
  dutiesCountByBlock: DutyGroupIdCount[]; 

  constructor(private floorComponentService: FloorComponentService, private dialog:MatDialog, private blockComponentService: BlockComponentService,   private dutyComponentService:DutyComponentService,private branchComponentService:BranchComponentService) { }

  ngOnInit(): void {  
    this.getAllFloor();
  }

  //#region Get Method
  
 getPaginationSize(){
  return Number(localStorage.getItem("paginationLimit"))
 }
  
  async getBranchStatusCount() {
    this.dutiesCountByBlock=[]
    this.dutiesCountByBlock = await this.dutyComponentService.getFloorStatusCount();
  }

  async getAllFloor() {
    await this.floorComponentService.getAll((response=>{
      this.floors = response.data
      this.dataLoaded = true;
      this.getAllWithCounts();
      this.getBranchStatusCount();
    }));
    
  }

  page:number=1;
  

  async getAllBlocks(successCallBack?: () => void) {
    this.blocks = (await this.blockComponentService.getAllBlock())
    if (successCallBack) {
      successCallBack();
    }
  }

  async getAllBlockByBranchId() {
    this.blocks = (await this.blockComponentService.getAllByBranchId(this.branchId))
    this.dataLoaded = true;
  }

  sortByBlock() {
    if (this.branchId) {
      this.getAllBlockByBranchId();
    } else {
      this.getAllBlocks();
    }
  }
  async getAllBranchId(id: string) {
    this.floors= await this.floorComponentService.getAllByBranchId(id)
  }
    

  async getAllWithCounts() {
    this.floorCounts = (await this.floorComponentService.getAllWithCount())
    this.dataLoaded = true;
  }
  isDisabled(id: string): boolean {
    const floor = this.floorCounts.find(floor => floor.id === id);
    return floor ? floor.hallwayCount < 1 : true;
  }
  async getByFloor(Id: string) {
    this.floor = (await this.floorComponentService.getByFloorId(Id))
    this.floorUpdateLoad = true;
  }
  async getDetailByFloorId(Id: string) {
    this.floor = (await this.floorComponentService.getDetailByFloorId(Id))
  }
  async getByFloorinBlock(Id: string) {
    this.floor = (await this.floorComponentService.getByBlockId(Id))
    this.dataLoaded = true;
  }

  async getAllByBlockId(Id: string) {
    this.floors = (await this.floorComponentService.getAllByBlockId(Id))
    this.dataLoaded = true;
  }
  getSelectBranch() {

    this.branchId = localStorage.getItem('selectedBranchId');
  }
  getBranchName(branchId: string): string {
    const branch = this.branchs.find(b => b.id === branchId);
    return branch ? branch.branchName : ''; // Eğer blok bulunamazsa boş bir dize döndürün.
  }
  //#endregion

  //#region Delete Method
  deleteFloor(Id: string) {
    if (this.floorDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
      (await this.floorComponentService.deleteFloor(Id,()=>{this.getAllFloor()}))
      }) 
    }
  }
  openDialog() {
    return this.dialog.open(FloorDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion
  
  //#region On Method

  onDeleteFloorId(id: string) {
    this.floorId = id;
    this.floorDeleteId = true;
    this.deleteFloor(id);
  }
  async onSelectBlockId(id: string) {
    this.floors = (await this.floorComponentService.getAllByBlockId(id))
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
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteFloorRole"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class FloorDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteFloorRole:string="GET.Deleting.DeleteFloorItem";
  constructor(public dialogRef: MatDialogRef<FloorDeleteTemplate>) {
  }
}
//#endregion
