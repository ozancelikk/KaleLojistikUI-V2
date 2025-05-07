import { Component } from '@angular/core';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from '../add-room/add-room.component';
import { RoomComponent } from '../room.component';
import { FormsModule } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';
import { Block } from '../../../models/block/block';
import { Floor } from '../../../models/floor/floor';
import { Hallway } from '../../../models/hallway/hallway';


@Component({
  selector: 'app-room-navbar',
  standalone: true,
  imports: [CommonModule, RoomComponent, FormsModule,],
  templateUrl: './room-navbar.component.html',
  styleUrl: './room-navbar.component.css'
})
export class RoomNavbarComponent {
  addRole:string="POST.Writing.AddRoomItem"
  filterText: string = '';
  faSearch = faSearch;
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  branchs:Branch[];
  blocks:Block[];
  floors:Floor[];
  hallways:Hallway[];
  branchId:string
  branchName:string
  blockId:string
  blockName:string
  floorId:string
  floorName:string
  hallwayId:string
  hallwayName:string
  //Pagination
  currentPage: number = 1;
  selectedItemsPerPage: any;
  itemsPerPageOptions: number[] = [6, 12, 24];
  constructor(private branchComponentService:BranchComponentService,private blockComponentService:BlockComponentService,private floorComponentService:FloorComponentService,private hallwayComponentService:HallwayComponentService){}

  ngOnInit(): void {
    this.selectedItemsPerPage=localStorage.getItem("paginationLimit");
    this.getAllBranch();
  }
  async getAllBranch(){
    this.branchs = await this.branchComponentService.getAllBranch();
  }
  async getAllBlock(){
    this.blocks = await this.blockComponentService.getAllBlock();
  }
  async getAllFloor(){
    this.floors = await this.floorComponentService.getAllFloor();
  }
  async getAllHallway(){
    this.hallways = await this.hallwayComponentService.getAllHallway();
  }
  async getAllBlockByBranchId(id:string){
    this.blocks = await this.blockComponentService.getAllByBranchId(id);
  }
  async getAllFloorByBlockId(id:string){
    this.floors = await this.floorComponentService.getAllByBlockId(id);
  }
  async getAllHallwayByFloorId(id:string){
    this.hallways = await this.hallwayComponentService.getAllByFloorId(id);
  }

  onItemsPerPageChange(option: number): void {
    this.selectedItemsPerPage = option;
    localStorage.setItem('paginationLimit', option.toString());
  }
  onBranchChange(id: any,name:string){
    this.branchId = id;
    this.branchName = name;
    this.getAllBlockByBranchId(id);
  }
  onBlockChange(id: any,name:string){
    this.blockId = id;
    this.blockName = name;
    this.getAllFloorByBlockId(id);
  }
  onFloorChange(id: any,name:string){
    this.floorId = id;
    this.floorName = name;
    this.getAllHallwayByFloorId(id);
  }
  onHallwayChange(id: any,name:string){
    this.hallwayId = id;
    this.hallwayName = name;
  }
}
