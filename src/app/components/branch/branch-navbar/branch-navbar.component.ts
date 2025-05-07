import { Component } from '@angular/core';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { CommonModule } from '@angular/common';
import { BranchComponentService } from '../../../services/component/branch-component.service';
import { BranchFilterPipe } from '../../../pipes/branch-filter.pipe';
import { BranchComponent } from '../branch.component';
import { CompanyComponent } from '../../company/company.component';


@Component({
  selector: 'app-branch-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,AddBranchComponent,CommonModule,BranchFilterPipe,FormsModule,BranchComponent,CompanyComponent,],
  templateUrl: './branch-navbar.component.html',
  styleUrl: './branch-navbar.component.css',
  providers:[BranchComponentService]
})
export class BranchNavbarComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  addBranchRole="POST.Writing.AddBranchItem";
  getallDepartmentRole="GET.Reading.GetAllDepartmentItem";
  //Pagination
  itemsPerPageOptions: number[] = [6, 12, 24];
  selectedItemsPerPage: any;
  currentPage: number = 1;
  filterText: string = '';

  ngOnInit(): void {
  this.selectedItemsPerPage=localStorage.getItem("paginationLimit")
  }

  onItemsPerPageChange(option: number): void {
    this.selectedItemsPerPage = option;
    localStorage.setItem('paginationLimit', option.toString());
  }

}
