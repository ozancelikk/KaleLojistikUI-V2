import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';
import { AddFloorComponent } from '../add-floor/add-floor.component';
import { FloorComponent } from '../floor.component';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../../models/branch/branch';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BlockComponentService } from '../../../services/component/block-component.service';
import { Block } from '../../../models/block/block';


@Component({
  selector: 'app-floor-navbar',
  standalone: true,
  imports: [CommonModule,FloorComponent,FormsModule,],
  templateUrl: './floor-navbar.component.html',
  styleUrl: './floor-navbar.component.css'
})
export class FloorNavbarComponent {
  filterText: string = '';
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  //Pagination
  currentPage: number = 1;
  selectedItemsPerPage: any;
  itemsPerPageOptions: number[] = [6, 12, 24];
  branchs:Branch[];
  branchId:string
  branchName:string
  blockId:string
  blockName:string
  blocks:Block[];
  addFlorrRole:string="POST.Writing.AddFloorItem"
  constructor(private branchComponentService:BranchComponentService,private blockComponentService:BlockComponentService) { }
  ngOnInit(): void {
    this.selectedItemsPerPage=localStorage.getItem("paginationLimit")
    this.getallBranch();
    this.getAllBlock();
  }
  async getallBranch(){
    this.branchs = await this.branchComponentService.getAllBranch();
  }
  async getAllBlock(){
    this.blocks = await this.blockComponentService.getAllBlock();
  }

  onItemsPerPageChange(option: number): void {
    this.selectedItemsPerPage = option;
    localStorage.setItem('paginationLimit', option.toString());
  }
  onBranchChange(id: any,name:string){
    this.branchId = id;
    this.branchName = name;
    this.getBlockByBranchId(id);
  }
  async getBlockByBranchId(id:string){
    this.blocks = await this.blockComponentService.getAllByBranchId(id);
  }
  onBlockChange(id: any,name:string){
    this.blockId = id;
    this.blockName = name;
  }


}
