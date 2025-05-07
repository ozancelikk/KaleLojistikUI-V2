import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DutyComponent } from './components/duty/duty.component';
import { WorkAccidentComponent } from './components/work-accident/work-accident.component';
import { MaterialManagementComponent } from './components/material-management/material-management.component';
import { EmailPostComponent } from './components/passwordRecovery/email-post/email-post.component';
import { VerificationCodePageComponent } from './components/passwordRecovery/verification-code-page/verification-code-page.component';
import { PasswordComponent } from './components/passwordRecovery/password/password.component';
import { LogsComponent } from './components/logs/logs.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { DocumentFileComponent } from './components/document-file/document-file.component';
import { loginGuard } from './guards/login.guard';
import { AdditionalTaskComponent } from './components/additional-task/additional-task.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FoodCategoryComponent } from './components/food-category/food-category.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { BranchNavbarComponent } from './components/branch/branch-navbar/branch-navbar.component';
import { BlockNavbarComponent } from './components/block/block-navbar/block-navbar.component';
import { FloorNavbarComponent } from './components/floor/floor-navbar/floor-navbar.component';
import { HallwayNavbarComponent } from './components/hallway/hallway-navbar/hallway-navbar.component';
import { RoomNavbarComponent } from './components/room/room-navbar/room-navbar.component';
import { LostPropertyComponent } from './components/lost-property/lost-property.component';
import { EmployeeBreakComponent } from './components/employee-break/employee-break.component';
import { ProductComponent } from './components/stock-tracking/product/product.component';
import { SupplierComponent } from './components/stock-tracking/supplier/supplier.component';
import { StockItemComponent } from './components/stock-tracking/stock-item/stock-item.component';
import { DecrementComponent } from './components/stock-tracking/decrement/decrement.component';
import { RepeatedDutyComponent } from './components/repeated-duty/repeated-duty.component';
import { DynamicReportComponent } from './components/dynamic-report/dynamic-report.component';
import { MailSenderConfigComponent } from './components/mail-sender-config/mail-sender-config.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { TechnicalErrorComponent } from './components/technical-error/technical-error.component';
import { DissolutionComponent } from './components/dissolution/dissolution.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { ErrorLogComponent } from './components/error-log/error-log.component';
import { ILanguage } from '../assets/locales/ILanguage';
import { Languages } from '../assets/locales/language';
import { DutyCommentComponent } from './components/duty-comment/duty-comment.component';
import { AddDutyCommentComponent } from './components/duty-comment/add-duty-comment/add-duty-comment.component'; 
import { ShiftComponent } from './components/shift/shift.component';
import { EmployeeShiftComponent } from './components/employee-shift/employee-shift.component';
import { PermanentNotificationComponent } from './components/permanent-notification/permanent-notification.component'; 
import { PlannedDutyComponent } from './components/planned-duty/planned-duty.component';


import { ShipmentComponent } from './components/shipment/shipment.component';
import { ComplaintComponent } from './components/complaint/complaint/complaint.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { AmeleComponent } from './components/amele/amele.component';
import { SenderComponent } from './components/sender/sender.component';


var lang:ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

if (lang == undefined) {
  localStorage.setItem("lng","tr")
  lang = Languages.lngs.get(localStorage.getItem("lng"));
}

const authRoutes = [
    { path: "user-login", component: UserLoginComponent },
    { path: "employee-login", component: EmployeeLoginComponent },
    { path: "email-post", component: EmailPostComponent },
    { path: "verification-code", component: VerificationCodePageComponent },
    { path: "password-recovery", component: PasswordComponent },
    { path: "comment-add/:id", component: AddDutyCommentComponent}
];

const dashboardRoutes = [
    { path: "", component: DashboardComponent, canActivate: [loginGuard],data:{breadcrumb:lang.dashboard} },
];
const dutyStationRoutes = [
    { path: "branch", component: BranchNavbarComponent, canActivate: [loginGuard],data:{breadcrumb:lang.branch} },
    { path: "block", component: BlockNavbarComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.block}},
    { path: "floor", component: FloorNavbarComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.floor}},
    { path: "hallway", component: HallwayNavbarComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.hallway}},
    { path: "room", component: RoomNavbarComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.room}},
    { path: 'shipments', component: ShipmentComponent, canActivate: [loginGuard], data: { breadcrumb: 'Kargolar' } },
    { 
        path: 'complaints', 
        component: ComplaintComponent, 
        canActivate: [loginGuard], 
        data: { breadcrumb: 'Şikayetler' } 
      },
      { 
        path: 'warehouses', 
        component: WarehouseComponent, 
        canActivate: [loginGuard], 
        data: { breadcrumb: 'Depolar' } 
      },
      {
        path: 'ameles',
        component: AmeleComponent,
        canActivate: [loginGuard],
        data: { breadcrumb: 'Ameleler' }
      },
      {
        path: 'senders',
        component: SenderComponent,
        canActivate: [loginGuard],
        data: { breadcrumb: 'Gönderenler' }
      }
      
      
      
];

const managementRoutes =[
    { path: "work-accident", component: WorkAccidentComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.workAccident}},
    { path: "material-management", component: MaterialManagementComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.materialManagement}},
    { path: "transaction-history", component: LogsComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.transactionHistory}},
    { path: "document-file", component: DocumentFileComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.documentFile}},
    { path: "lost-property", component: LostPropertyComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.lostProperty}},
    { path: "report", component: DynamicReportComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.report}},
    { path: "mail-sender", component: MailSenderConfigComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.mailSender}},
    { path: "error-log", component: ErrorLogComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.errorLog}},
    { path: "permanent-notification", component: PermanentNotificationComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.permanentNotification}},
]
const dutyRoutes = [
    { path: "duty", component: DutyComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.duty}},
    { path: "additional-task", component: AdditionalTaskComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.additionalTask}},
    { path: "notification", component: NotificationComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.notification}},
    { path: "repeated-duty", component: RepeatedDutyComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.repeatedDuty}},
    { path: "technical-error", component: TechnicalErrorComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.technicalError}},
    { path: "duty-comment", component: DutyCommentComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.dutyComment}},
    { path: "planned-duty", component: PlannedDutyComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.plannedDuty}},
];

const humanRoutes =[
    { path: "employee", component: EmployeeComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.employee}},
    { path: "user", component: UserComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.user}},
    { path: "user-profile", component: UserProfileComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.userProfile}},
    { path: "employee-profile", component: EmployeeProfileComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.employeeProfile}},
    { path: "employee-break", component: EmployeeBreakComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.employeeBreak}}, 
    { path: "shift-system", component: ShiftComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.shiftSystem}},
    { path: "employee-shift", component: EmployeeShiftComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.employeeShift}}, 
]
const restaurantRoutes =[
    { path: "food-category", component: FoodCategoryComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.foodCategory}},
    { path: "menu", component: MenuComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.menu}},
    { path: "order", component: OrderComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.order}},
    { path: "dissolution", component: DissolutionComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.dissolution}},
]
const stockItemRoutes =[
    { path: "product", component: ProductComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.product}},
    { path: "supplier", component: SupplierComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.supplier}},
    { path: "stock-item", component: StockItemComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.stockItem}},
    { path: "decrement", component: DecrementComponent, canActivate: [loginGuard] ,data:{breadcrumb:lang.decrement}},
  
]




const notFoundRoute = { path: '404', component: NotFoundComponent };
const redirectToNotFound = { path: '**', redirectTo: '/404' };

export const routes: Routes = [
    ...authRoutes,
    {
        path: "",
        component: LayoutComponent,
        children: [
            ...dashboardRoutes,
            ...managementRoutes,
            ...dutyStationRoutes,
            ...dutyRoutes,
            ...humanRoutes,
            ...restaurantRoutes,
            ...stockItemRoutes
        ],
    },
    notFoundRoute,
    redirectToNotFound,
];