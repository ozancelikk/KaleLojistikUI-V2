import { Component } from '@angular/core';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { Languages } from '../../../assets/locales/language';
import { Employee } from '../../models/employee/employee';
import { Room } from '../../models/room/room';
import { Hallway } from '../../models/hallway/hallway';
import { EmployeeDto } from '../../models/employee/employeeDto';
import { EmployeeDetailsDto } from '../../models/employee/employeeDetailsDto';
import { EmployeeComponentService } from '../../services/component/employee-component.service';
import { CellClickedEvent, ColDef, ColGroupDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeImageComponent } from './employee-image/employee-image.component';
import { UpdateEmployeeClaimComponent } from './update-employee-claim/update-employee-claim.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { changeDataTableHeight } from '../../../assets/js/main';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { AddBatchEmployeeComponent } from './add-batch-employee/add-batch-employee.component';
import { DepartmentComponent } from '../department/department.component';
import { EmployeeShiftAddComponent } from './employee-shift-add/employee-shift-add.component'; 
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, AddEmployeeComponent, UpdateEmployeeComponent, AgGridModule, EmployeeShiftAddComponent,
    EmployeeNavbarComponent, ChangePasswordComponent, EmployeeImageComponent, UpdateEmployeeClaimComponent, DetailEmployeeComponent, AddBatchEmployeeComponent, DepartmentComponent,EmployeePayrollComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  //Class
  employeies: Employee[];
  rooms: Room[];
  hallways: Hallway[];
  employeeDetail: Employee;
  employeeClaimDetail:Employee;
  employeeDetailImage: EmployeeDetailsDto
  employeeDetails: Employee;
  employeeDto: EmployeeDto

  employeeDetailsDto: EmployeeDetailsDto[]
  employee: Employee;

  //Form
  employeeRoomCount: any
  employeeHallwayCount: any
  employeeId: string;

  //Flag
  dataLoaded = false;
  employeeDeleteId = false;
  isEmployeeLoad = false;


  currentPage: number = 1;
  selectedItemsPerPage: number = 6;
  itemsPerPageOptions: number[] = [6, 12, 24];

  constructor(
    private employeeComponentService: EmployeeComponentService,
    private dialog: MatDialog
  ) { }
  
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

  public columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name', headerName: this.lang.name, unSortIcon: true, },
    { field: 'surname', headerName: this.lang.surname, unSortIcon: true, },
    { field: 'role', headerName: this.lang.email, unSortIcon: true },
    { field: 'warehouseId', headerName: this.lang.title, unSortIcon: true, },
    {
      field: 'Details', headerName: this.lang.employeeDetail, filter: false, valueGetter: (params) => {
        return 'Details';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-circle-info"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#employeeDetailModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'UpdateImage', headerName: this.lang.employeeImage, filter: false, valueGetter: (params) => {
        return 'UpdateImage';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-image"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateImage"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getImagesByEmployeeId(event.data.id)
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'EmployeeShift', headerName: this.lang.addNewEmployeeShift, filter: false, valueGetter: (params) => {
        return 'EmployeeShift';
      },
      cellRenderer: () => {
        return `<i class="fa-regular fa-calendar-days"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#employeeShiftAddModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },  
    {
      field: 'ChangePassword', headerName: this.lang.changePassword, filter: false, valueGetter: (params) => {
        return 'ChangePassword';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-lock"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#changePasswordModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'ClaimUpdate', headerName: this.lang.updateOperationClaim, filter: false, valueGetter: (params) => {
        return 'ClaimUpdate';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-user"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateEmployeeEndpointRoleModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'Update', headerName: this.lang.update, filter: false, valueGetter: (params) => {
        return 'Update';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-pen"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#updateModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'Payroll', headerName: this.lang.payrolls, filter: false, valueGetter: (params) => {
        return 'Payroll';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-file-invoice"style="cursor:pointer;opacity:0.7; font-size:20px;" data-bs-toggle="modal" data-bs-target="#employeePayrollModal"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getByEmployeeId(event.data.id)
      }
    },
    {
      field: 'Delete', headerName: this.lang.delete, filter: false, valueGetter: (params) => {
        return 'Delete';
      },
      cellRenderer: () => {
        return `<i class="fa-solid fa-trash-can"style="cursor:pointer;opacity:0.7; font-size:20px;"></i>`;
      },
      onCellClicked: (event: CellClickedEvent) =>
        this.onDeleteEmployeeId(event.data.id),
    },
  ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    sortable: true,
    resizable: true,
    floatingFilter: true,
    minWidth: 130,
  };
  public rowBuffer = 0;
  public rowModelType: 'clientSide' | 'infinite' | 'viewport' | 'serverSide' =
    'infinite';
  public cacheBlockSize = 300;
  public cacheOverflowSize = 2;
  public maxConcurrentDatasourceRequests = 1;
  public infiniteInitialRowCount = 1000;
  public maxBlocksInCache = 10;
  public noRowsTemplate: any
  public rowData!: any[];
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.getAllEmployee()
  }
  //#region  Get Method

  async getAllEmployee() {
    this.rowData = (await this.employeeComponentService.getAllEmployee())
    changeDataTableHeight()
    window.addEventListener("resize", changeDataTableHeight)
    this.dataLoaded = true;
    this.isEmployeeLoad = true
  }
  async getByEmployeeId(id: string) {
    this.employeeDto = (await this.employeeComponentService.getByEmployeeId(id))
    this.dataLoaded = true;
  }


  async getImagesByEmployeeId(id: string) {
    this.employeeDetailImage = (await this.employeeComponentService.getImagesByEmployeeId(id))
  }
  //#endregion

  //#region on and Delete method

  onDeleteEmployeeId(id: string) {
    this.employeeId = id;
    this.employeeDeleteId = true;
    this.deleteEmployee(id)
  }
  deleteEmployee(id: string) {
    if (this.employeeDeleteId) {
      this.openDialog().afterClosed().subscribe(async result => {
        if (!result) {
          return
        }
        this.employeeComponentService.deleteEmployee(id, () => { this.getAllEmployee() })
      })
    }
  }
  openDialog() {
    return this.dialog.open(EmployeeDeleteTemplate, {
      width: '550px',
      panelClass: 'matdialog-delete',
    });
  }
  async onDetailModalClicked(id: string) {
    this.employeeDto = (await this.employeeComponentService.getByEmployeeId(id));
    this.isEmployeeLoad = true;
  }

  //#endregion


}
//#region delete Component
@Component({
  selector: 'employee-delete-template',
  template: `
  <h5 mat-dialog-title>
    {{lang.areYouSureYouWanttoDelete}}</h5>
   <div mat-dialog-content>
   </div>
   <div mat-dialog-actions class="mat-mdc-dialog-actions">
    <button class="button-4" mat-button [mat-dialog-close]=false><i class="fa-solid fa-circle-xmark"></i> {{lang.cancel}}</button>
    <button class="button-24" mat-button [mat-dialog-close]=true cdkFocusInitial *app="deleteEmployeeItem"><i class="fa-solid fa-trash-can"></i> {{lang.delete}}</button>
   </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule,],

})
export class EmployeeDeleteTemplate {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  deleteEmployeeItem: string="GET.Deleting.DeleteEmployeeItem"
  constructor(public dialogRef: MatDialogRef<EmployeeDeleteTemplate>) {
  }
}
//#endregion