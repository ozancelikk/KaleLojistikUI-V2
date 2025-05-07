import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { Room } from '../../../../models/room/room';
import { BlockComponentService } from '../../../../services/component/block-component.service';
import { BranchComponentService } from '../../../../services/component/branch-component.service';
import { FloorComponentService } from '../../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../../services/component/hallway-component.service';
import { RoomComponentService } from '../../../../services/component/room-component.service';
import { Branch } from '../../../../models/branch/branch';
import { Block } from '../../../../models/block/block';
import { Floor } from '../../../../models/floor/floor';
import { Hallway } from '../../../../models/hallway/hallway';

@Component({
  selector: 'app-room-stock-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-stock-item.component.html',
  styleUrl: './room-stock-item.component.css'
})
export class RoomStockItemComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  rooms:Room[]=[]
  branchs:Branch[]
  blocks:Block[]
  floors:Floor[]
  hallways:Hallway[]
  constructor(
    private branchcomponentService:BranchComponentService,
    private blockcomponentService:BlockComponentService,
    private floorcomponentService:FloorComponentService,
    private hallwaycomponentService:HallwayComponentService,
  ) {}
  @Input() set roomDetail(value:any){
    if (!value) {return}
    this.rooms=value.roomId
  }
  ngOnInit(){
    this.getAllBlock()
    this.getAllBranch()
    this.getAllFloor()
    this.getAllHallway()
  }
  async getAllBlock(){
    this.blocks= await this.blockcomponentService.getAllBlock()
  }
  async getAllBranch(){
    this.branchs= await this.branchcomponentService.getAllBranch()
  }
  async getAllFloor(){
    this.floors= await this.floorcomponentService.getAllFloor()
  }
  async getAllHallway(){
    this.hallways= await this.hallwaycomponentService.getAllHallway()
  }
  getBlockName(id: string) {
    const block = this.blocks.find(dep => dep.id === id);
    return block ? block.blockName : this.lang.noDataFound;
  }
  getBranchName(id: string) {
    const branch = this.branchs.find(dep => dep.id === id);
    return branch ? branch.branchName : this.lang.noDataFound;
  }
  getFloorName(id: string) {
    const floor = this.floors.find(dep => dep.id === id);
    return floor ? floor.floorName : this.lang.noDataFound;
  }
  getHallwayName(id: string) {
    const hallway = this.hallways.find(dep => dep.id === id);
    return hallway ? hallway.hallwayName : this.lang.noDataFound;
  }
}
