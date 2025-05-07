import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';
import { BlockAddComponent } from '../block-add/block-add.component';
import { BlockComponent } from '../block.component';
import { FormsModule } from '@angular/forms';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { Branch } from '../../../models/branch/branch';


@Component({
  selector: 'app-block-navbar',
  standalone: true,
  imports: [CommonModule,BlockComponent,FormsModule,],
  templateUrl: './block-navbar.component.html',
  styleUrl: './block-navbar.component.css'
})
export class BlockNavbarComponent {
  filterText: string = '';
  branchs:Branch[];
  branchId:string
  branchName:string
  addBlockRole="POST.Writing.AddBlockItem";

  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private branchComponentSerivce:BranchComponentService) { }

  //Pagination
  itemsPerPageOptions: number[] = [6, 12, 24];
  selectedItemsPerPage: any;
  currentPage: number = 1;
  ngOnInit(): void {
  this.selectedItemsPerPage=localStorage.getItem("paginationLimit")
  this.getAllBranch();
  }
  onBranchChange(id: any,name:string){
    this.branchId = id;
    this.branchName = name;
    
  }

  onItemsPerPageChange(option: number): void {
    this.selectedItemsPerPage = option;
    localStorage.setItem('paginationLimit', option.toString());
  }

  performSearch(event: any) {
    const searchTerm = event.target.value;
  }
  async getAllBranch(){
    this.branchs = await this.branchComponentSerivce.getAllBranch();
  }
}
