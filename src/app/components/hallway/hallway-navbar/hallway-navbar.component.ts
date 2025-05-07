import { Component } from '@angular/core';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFloorComponent } from '../../floor/add-floor/add-floor.component';
import { AddHallwayComponent } from '../add-hallway/add-hallway.component';
import { HallwayComponent } from '../hallway.component';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { FloorComponentService } from '../../../services/component/floor-component.service';
import { Block } from '../../../models/block/block';
import { Floor } from '../../../models/floor/floor';


@Component({
  selector: 'app-hallway-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HallwayComponent,FormsModule,],
  templateUrl: './hallway-navbar.component.html',
  styleUrl: './hallway-navbar.component.css'
})
export class HallwayNavbarComponent {
  addHallwayRole:string="POST.Writing.AddHallwayItem";
  constructor(private branchComponentService:BranchComponentService,private blockComponentService:BlockComponentService,private floorComponentService:FloorComponentService) {}
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  filterText: string = '';
  branchs:Branch[];
  blocks:Block[];
  floors:Floor[];
  branchId:string
  branchName:string
  blockId:string
  blockName:string
  floorId:string
  floorName:string

  //Pagination
  itemsPerPageOptions: number[] = [6, 12, 24];
  selectedItemsPerPage: any;
  currentPage: number = 1;

  ngOnInit(): void {
    this.selectedItemsPerPage = localStorage.getItem("paginationLimit");
    this.getAllBranch();
    this.getAllFloor();
    this.getAllBlock();
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
  async getBlockByBranchId(id:string){
    this.blocks = await this.blockComponentService.getAllByBranchId(id);
  }
  async getFloorByBlockId(id:string){
    this.floors = await this.floorComponentService.getAllByBlockId(id);
  }
  onBranchChange(id: any,name:string){
    this.branchId = id;
    this.branchName = name;
    this.getBlockByBranchId(id); 
  }
  onBlockChange(id: any,name:string){
    this.blockId = id;
    this.blockName = name;
    this.getFloorByBlockId(id); 
  }
  onFloorChange(id: any,name:string){
    this.floorId = id;
    this.floorName = name; 
  }

  onItemsPerPageChange(option: number): void {
    this.selectedItemsPerPage = option;
    localStorage.setItem('paginationLimit', option.toString());
  }
}
