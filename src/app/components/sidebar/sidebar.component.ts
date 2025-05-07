import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';

import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LanguageComponentService } from '../../services/component/language-component.service';
import { EmployeeEndpointRoleComponentService } from '../../services/component/employee-endpoint-role-component.service'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  isBranchRole: boolean;
  isBlockRole: boolean
  isFloorRole: boolean
  role: any = {};
  constructor(private languageComponentService: LanguageComponentService, private employeeRoleEndpointService: EmployeeEndpointRoleComponentService) { }

  ngOnInit(): void {
    this.role = {
      addAdditionalTaskItem: "GET.Reading.GetAllDetailsAdditionalTaskItem",
      getAllBranchItem: "GET.Reading.GetAllBranchItem",
      getAllBlockItem: "GET.Reading.GetAllBlockItem",
      getAllFloorItem: "GET.Reading.GetAllFloorItem",
      getAllHallwayItem: "GET.Reading.GetAllHallwayItem",
      getAllRoomItem: "GET.Reading.GetAllRoomItem",
      getAllUserItem: "GET.Reading.GetAllUserItem",
      getAllEmployeeImageItem: "GET.Reading.GetAllEmployeeImageItem",
      getAllWorkingHoursSystemItem: "GET.Reading.GetAllWorkingHoursSystemItem",
      getAllWorkingHoursSystemQrItem: "GET.Reading.GetAllWorkingHoursSystemQrItem",
      getAllShiftItem: "GET.Reading.GetAllShiftItem",
      getAllShiftEmployeeEmployeeItem: "GET.Reading.GetAllShiftEmployeeEmployeeItem",   
      getAllMenuItem: "GET.Reading.GetAllMenuItem",
      getAllFoodCategoryItem: "GET.Reading.GetAllFoodCategoryItem",
      getAllOrderItem: "GET.Reading.GetAllOrderItem",
      getAllDissolutionDissolutionItem: "GET.Reading.GetAllDissolutionDissolutionItem",
      getAllProductItem: "GET.Reading.GetAllProductItem",
      getAllSupplierItem: "GET.Reading.GetAllSupplierItem",
      getAllDetailsStockItemItem: "GET.Reading.GetAllDetailsStockItemItem",
      getAllDecrementItem: "GET.Reading.GetAllDecrementItem",
      getDutyDetailsDutyItem: "GET.Reading.GetDutyDetailsDutyItem",
      getAllRepeatedDutyItem: "GET.Reading.GetAllRepeatedDutyItem",
      getDetailsTechnicalErrorItem: "GET.Reading.GetDetailsTechnicalErrorItem",
      getAllDetailsWorkAccidentItem: "GET.Reading.GetAllDetailsWorkAccidentItem",
      getAllMaterialManagementItem: "GET.Reading.GetAllMaterialManagementItem",
      getAllDocumentFileUploadItem: "GET.Reading.GetAllDocumentFileUploadItem",
      getAllNotificationDetailsNotificationItem: "GET.Reading.GetAllNotificationDetailsNotificationItem",
      getAllPermanentNotificationItem: "GET.Reading.GetAllPermanentNotificationItem",
      getAllImageDetailsLostPropertyItem: "GET.Reading.GetAllImageDetailsLostPropertyItem",
      getAllDetailsDynamicReportItem: "GET.Reading.GetAllDetailsDynamicReportItem",
      getAllEmployeeBreakDetailsItem: "GET.Reading.GetAllDetailsEmployeeBreakDetailsItem"
    };
  }


  changeLanguage(language: string) {
    localStorage.setItem("lng", language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
}
