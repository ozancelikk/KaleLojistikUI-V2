import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyComponentService } from '../../../services/component/duty-component.service';
import { BranchService } from '../../../services/common/branch.service';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { Branch } from '../../../models/branch/branch';
import { Room } from '../../../models/room/room';
import { Hallway } from '../../../models/hallway/hallway';
import { Block } from '../../../models/block/block';
import { Floor } from '../../../models/floor/floor';
declare var $: any;

@Component({
  selector: 'app-report-duty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-duty.component.html',
  styleUrl: './report-duty.component.css'
})
export class ReportDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  branchs: Branch[]
  blocks: Block[]
  floors: Floor[]
  hallways: Hallway[]
  rooms: Room[]
  roomId: string
  firstDate: string
  lastDate: string
  report: boolean = false
  branchId:string
  floorId:string;

  constructor(private dutyComponentService: DutyComponentService, private branchComponentService: BranchComponentService, private blockComponentService: BlockComponentService, private floorComponentService: FloorComponentService, private hallwayComponentService: HallwayComponentService, private roomComponentService: RoomComponentService) { }

  ngOnInit() {
    this.getAllBranchs()
  }
  async getAllBranchs() {
    this.branchs = await this.branchComponentService.getAllBranch()
  }
  async onBranchChange(event: any) {
    this.branchId=event.target.value
    this.blocks = await this.blockComponentService.getAllByBranchId(event.target.value)
  }
  async onBlockChange(event: any) {
    this.floors = await this.floorComponentService.getAllByBlockId(event.target.value)
  }
  async onFloorChange(event: any) {
    this.floorId=event.target.value;
    this.hallways = await this.hallwayComponentService.getAllByFloorId(event.target.value)
  }
  async onHallwayChange(event: any) {
    this.rooms = await this.roomComponentService.getAllByHallwayId(event.target.value)
  }
  onFirsDate(event: any) {
    this.firstDate = event.target.value;
    const selectedDate = new Date(this.firstDate);
    const formattedDate = this.formatDate(selectedDate);
    this.firstDate = formattedDate;
  }
  onEndDate(event: any) {
    this.lastDate = event.target.value
    const selectedDate = new Date(this.lastDate);
    const formattedDate = this.formatDate(selectedDate);
    this.lastDate = formattedDate;
  }
  onRoomChange(event: any) {
    this.roomId = event.target.value
  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  downloadPdf() {
    this.report = true
    this.dutyComponentService.getByRoomIdAndFilterDateReportPdf(this.firstDate, this.lastDate, this.roomId, () => {
      this.report = false
      $('#reportRoomInDutyModal').modal('hide');
    })
  }
  getByBranchIdAndFilterDateReportPdf() {
    this.report = true
    this.dutyComponentService.getByBranchIdAndFilterDateReportPdf(this.firstDate, this.lastDate, this.branchId, () => {
      this.report = false
      $('#reportRoomInDutyModal').modal('hide');
    })
  }
  getByFloorIdAndFilterDateReportPdf() {
    this.report = true
    this.dutyComponentService.getByFloorIdAndFilterDateReportPdf(this.firstDate, this.lastDate, this.floorId, () => {
      this.report = false
      $('#reportRoomInDutyModal').modal('hide');
    })
  }

}
