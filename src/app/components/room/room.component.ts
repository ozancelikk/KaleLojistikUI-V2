import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddRoomComponent } from './add-room/add-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Room } from '../../models/room/room';
import { RoomComponentService } from '../../services/component/room-component.service';
import { RoomChartsComponent } from './room-charts/room-charts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DetailRoomComponent } from './detail-room/detail-room.component';
import { DutyGroupIdCount } from '../../models/duty/dutyGroupIdCount';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { BranchFilterPipe } from '../../pipes/branch-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoomCount } from '../../models/room/roomTaskCount';
import { QrCodeComponent } from './qr-code/qr-code.component';



@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, AddRoomComponent, UpdateRoomComponent,BranchFilterPipe,RoomChartsComponent,DetailRoomComponent,NgxPaginationModule,QrCodeComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  @Input() filterText;
  @Input() set filterBranchId(value: string) {
    if (!value) return
    this.getAllRoomByBranchId(value);
  }
  @Input() set filterBlockId(value: string) {
    if (!value) return
    this.getAllRoomByBlockId(value);
  }
  @Input() set filterFloorId(value: string) {
    if (!value) return
    this.getAllRoomByFloorId(value);
  }
  @Input() set filterHallwayId(value: string) {
    if (!value) return
    this.getAllRoomByHallwayId(value);
  }
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  //Class
  rooms: Room[];
  room: Room
  roomDetail: Room;
  dutyCounts:RoomCount[]
  qrCode:any

  //Group 
  branchId: string;
  roomId: string

  //Flag
  roomDeleteId = false;
  isRoomLoad = false
  dataLoaded = false;
  //Pagination

  dutiesCountByBlock: DutyGroupIdCount[]; 
  constructor(
    private roomComponentService: RoomComponentService,
    private dialog:MatDialog,
    private dutyComponentService:DutyComponentService,
    ) {}

   ngOnInit(): void {
    this.getAllRoom()
  }

  //#region  Get Method
  async getBranchStatusCount() {
    this.dutiesCountByBlock=[]
    this.dutiesCountByBlock = await this.dutyComponentService.getRoomStatusCount();
  }
  async getQrCodeImage(id:string){
    this.qrCode = (await this.roomComponentService.getByQrCodeImage(id))
  }
  async getAllRoom() {
     await this.roomComponentService.getAllRoom((response=>{
      this.rooms = response.data
      this.getBranchStatusCount();
      this.getAllWithDutyCount();
     }))
    
    this.getSelectBranch();
    if (this.branchId != null) {
      this.rooms.filter(room => room.branchId === this.branchId);
      this.dataLoaded = true;
    } else {
      this.dataLoaded = true;
    }
  }
  async getByRoom(Id: string) {
    this.room = (await this.roomComponentService.getByRoomId(Id))
    this.isRoomLoad = true;
  }
  async getAllWithDutyCount(){
    this.dutyCounts = await this.roomComponentService.getAllWithDutyCount()
  }

  getSelectBranch() {
    this.branchId = localStorage.getItem('selectedBranchId');
  }
  async getAllRoomByBranchId(id: string) {
    this.rooms = await this.roomComponentService.getAllByBranchId(id)
  }
  async getAllRoomByBlockId(id: string) {
    this.rooms = await this.roomComponentService.getAllByBlockId(id)
  }
  async getAllRoomByFloorId(id: string) {
    this.rooms = await this.roomComponentService.getAllByFloorId(id)
  }
  async getAllRoomByHallwayId(id: string) {
    this.rooms = await this.roomComponentService.getAllByHallwayId(id)
  }

  //#endregion

  //#region OnSelect and Delete Method
  onDeleteRoomId(id: string) {
    this.roomId = id;
    this.roomDeleteId = true;
    this.deleteRoom(id)
  }
  onDetailsRoomId(id: string) {
    this.roomId = id;
  }

  deleteRoom(id: string) {
    if (this.roomDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
      (await this.roomComponentService.deleteRoom(id,()=>{this.getAllRoom()}))
      }) 
    }
  }
  openDialog() {
    return this.dialog.open(RoomDeleteTemplate, {
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
  selector: 'room-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
     <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
     <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial><i class="fa-solid fa-trash-can" *app="deleteRole"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class RoomDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteRole:string="GET.Deleting.DeleteRoomItem"
  constructor(public dialogRef: MatDialogRef<RoomDeleteTemplate>) {
  }
}
//#endregion
