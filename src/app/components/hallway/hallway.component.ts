import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddHallwayComponent } from './add-hallway/add-hallway.component';
import { UpdateHallwayComponent } from './update-hallway/update-hallway.component';
import { HallwayComponentService } from '../../services/component/hallway-component.service';
import { FloorComponentService } from '../../services/component/floor-component.service';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Hallway } from '../../models/hallway/hallway';
import { Floor } from '../../models/floor/floor';
import { HallwayChartsComponent } from './hallway-charts/hallway-charts.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DetailHallwayComponent } from './detail-hallway/detail-hallway.component';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { BranchFilterPipe } from '../../pipes/branch-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BranchCount } from '../../models/branch/branchCount';
import { HallwayCount } from '../../models/hallway/hallwayCount';


@Component({
  selector: 'app-hallway',
  standalone: true,
  imports: [CommonModule, AddHallwayComponent, UpdateHallwayComponent, HallwayChartsComponent, BranchFilterPipe, DetailHallwayComponent, NgxPaginationModule],
  templateUrl: './hallway.component.html',
  styleUrl: './hallway.component.css'
})
export class HallwayComponent {
  @Input() filterText;
  @Input() set filterBranchId(value: string) {
    if (!value) return
    this.getAllHallwayByBranchId(value);
  }
  @Input() set filterBlockId(value: string) {
    if (!value) return
    this.getAllHallwayByBlockId(value);
  }
  @Input() set filterFloorId(value: string) {
    if (!value) return
    this.getAllHallwayByFloorId(value);
  }
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));
  //Class
  hallways: Hallway[];
  floors: Floor[];
  characters: Hallway[];
  hallway: Hallway;
  hallwayCounts:BranchCount[]
  dutyCounts:HallwayCount[];
  //Form
  hallwayId: string;
  hallwayUpdateForm: any;
  blockName: string;
  branchId: string;
  floorId: string

  //flag
  isHallwayLoad = false;
  hallwayDeleteId = false;
  dataLoaded = false;
  hallwayUpdateLoad = false;
  selectedTask: any;
  isModalOpen = false;

  //Chart
  dutiesCountByBlock: DutyGroupIdCount[];

  constructor(
    private hallwayComponentService: HallwayComponentService,
    private floorComponentservice: FloorComponentService,
    private dutyComponentService: DutyComponentService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllHallway();
  }

  //#region Get Method
  async getBranchStatusCount() {
    this.dutiesCountByBlock=[]
    this.dutiesCountByBlock = await this.dutyComponentService.getHallwayStatusCount();
  }
  async getAllHallwayCount(){
    this.hallwayCounts = await this.hallwayComponentService.getAllWithCount()
  }
  async getAllDutyCount(){
    this.dutyCounts = await this.hallwayComponentService.getAllWithDutyCounts()
  }

  async getAllHallway() {
    (await this.hallwayComponentService.getAll((response => {
      this.hallways = response.data
      this.getAllHallwayCount();
      this.getBranchStatusCount();
      this.getAllDutyCount();
    })))
  }
  async getAllFloor(successCallBack?: () => void) {
    this.floors = (await this.floorComponentservice.getAllFloor())
    this.dataLoaded = true;
    if (successCallBack) {
      successCallBack();
    }
  }
  async getAllFloorByBranchId() {
    this.floors = (await this.floorComponentservice.getAllByBranchId(this.branchId))
    this.dataLoaded = true;
  }
  async getAllHallwayByBranchId(id:string) {
    this.hallways = (await this.hallwayComponentService.getAllByBranchId(id))
    this.dataLoaded = true;
  }

  sortByFloor() {
    if (this.branchId) {
      this.getAllFloorByBranchId();
    } else {
      this.getAllFloor();
    }
  }
  async getByHallway(Id: string) {
    this.hallway = (await this.hallwayComponentService.getByHallwayId(Id))
    this.hallwayUpdateLoad = true;
  }
  async getDetailsByHallwayId(Id: string) {
    this.hallway = (await this.hallwayComponentService.getDetailsByHallwayId(Id))

  }
  async getAllHallwayByBlockId(id: string) {
    this.hallways= await this.hallwayComponentService.getAllHallwayByBlockId(id)
  }
  async getAllHallwayByFloorId(id: string) {
    this.hallways = await this.hallwayComponentService.getAllByFloorId(id)
  }

  getSelectBranch() {
    this.branchId = localStorage.getItem('selectedBranchId');
  }
  //#endregion

  //#region Delete Method
  deleteHallway(Id: string) {
    this.openDialog().afterClosed().subscribe(async result => {
      if (!result) {
        return
      }
      (await this.hallwayComponentService.deleteHallway(Id, () => { this.getAllHallway() }))
    })
  }
  onHallwayDeleteId(Id: string) {
    this.hallwayId = Id;
    this.hallwayDeleteId = true;
    this.deleteHallway(this.hallwayId)
  }
  openDialog() {
    return this.dialog.open(HallwayDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  //#endregion


  //#region  Pagination
  getPaginationSize() {
    return Number(localStorage.getItem("paginationLimit"))
  }
  page: number = 1;
  //#endregion
}

//#region delete Component
@Component({
  selector: 'hallway-delete-template',
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
export class HallwayDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteHallwayItem";
  constructor(public dialogRef: MatDialogRef<HallwayDeleteTemplate>) {
  }
}
//#endregion