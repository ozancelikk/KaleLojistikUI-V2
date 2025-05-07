import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AnnouncementDto } from '../../models/announcement/announcementDto';
import { Languages } from '../../../assets/locales/language';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { AnnouncementComponentService } from '../../services/component/announcement-component.service';
import { UserComponentService } from '../../services/component/user/user-component.service';
import { UserDetailsDto } from '../../models/user/userDetailsDto';
import { DutyComponentService } from '../../services/component/duty-component.service';
import { DutyDetail } from '../../models/duty/dutyDetail';
import { NavbarDutyDetailComponent } from './navbar-duty-detail/navbar-duty-detail.component';
import { LanguageComponentService } from '../../services/component/language-component.service';
import { AddDutyComponent } from '../duty/add-duty/add-duty.component';
import { EmployeeComponentService } from '../../services/component/employee-component.service';
import { EmployeeDetailsDto } from '../../models/employee/employeeDetailsDto';





@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NavbarDutyDetailComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [AnnouncementComponentService]
})
export class NavbarComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  announcement: AnnouncementDto;
  user: UserDetailsDto;
  employee: EmployeeDetailsDto
  breadCrum:any
  //TrueFalse
  status: boolean = false;
  menuItems: any;
  isSidebarOpen: boolean = true;
  dataLoaded = false;
  userName: string;
  imagePath: any;
  employeeImagePath: any;
  dutyDetail: DutyDetail[];
  dutysDetail: DutyDetail;
  employeeStatus: boolean = false;
  userStatus: boolean = false;

  ngOnInit(): void {
    this.getImage()
    this.getAllNotification()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.routerState.snapshot.root;
        this.breadCrum = this.getBreadcrumb(currentRoute);
      }
    });
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private userComponentService: UserComponentService,
    private dutyComponentService: DutyComponentService,
    private languageComponentService: LanguageComponentService,
    private annoucementComponentService: AnnouncementComponentService,
    private employeeComponentService: EmployeeComponentService
  ) { }

  getImagePath(): string {
    if (this.imagePath) {
      let url: string = window["env"]["userImage"] + this.imagePath
      return url;
    } else if (this.employeeImagePath) {
      let url2: string = window["env"]["employeeImage"] + this.employeeImagePath
      return url2
    }
    let url3 = "assets/img/noimage.jpg";
    return url3
  }
  getImage() {
    var userId = localStorage.getItem("userId")
    var employeeId = localStorage.getItem("employeeId")
    if (userId) {
      this.getByUser()
      this.userStatus = true;
    } else if (employeeId) {
      this.getEmployeeById()
      this.employeeStatus = true;
    }
  }

  Logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("userId");
    localStorage.removeItem("employeeId");
    this.router.navigate(["/user-login"]);
  }

  SidebarShow() {
    const sidebarElement = document.querySelector('.hk-nav');
    const wrapperElement = document.querySelector('.main-element');

    if (sidebarElement && wrapperElement) {
      if (this.isSidebarOpen) {
        this.renderer.setStyle(sidebarElement, 'width', '0%');
        this.renderer.setStyle(sidebarElement, 'padding', '0');
        this.renderer.setStyle(wrapperElement, 'width', '100%');
      } else {
        this.renderer.setStyle(sidebarElement, 'width', '15%');
        this.renderer.setStyle(sidebarElement, 'padding', '80px 20px');
        this.renderer.setStyle(wrapperElement, 'width', '85%');
      }
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
  async getByUser() {
    var userId = localStorage.getItem("userId");
    this.user = (await this.userComponentService.getImagesByUserId(userId));
    this.imagePath = this.user.imagePath;
    this.userName = this.user.name + " " + this.user.surname;
    this.dataLoaded = true;
  }
  async getEmployeeById() {
    var employeeId = localStorage.getItem("employeeId")
    this.employee = await this.employeeComponentService.getImagesByEmployeeId(employeeId)
    this.employeeImagePath = this.employee.imagePath
    this.userName = this.employee.name + " " + this.employee.surname;
    this.dataLoaded = true;
  }
  async getAllNotification() {
    this.dutyDetail = (await this.dutyComponentService.getDutyDetailsForDate())
  }
  async getDetailDuty(id: string) {
    this.dutysDetail = await this.dutyComponentService.getByDutyDetails(id)
  }
  readNotification() {
    var a = document.getElementById("bell");
    a.classList.remove("bells");
  }
  async getAnnouncementDetailsForDate() {
    this.announcement = (await this.annoucementComponentService.getDutyDetailsForDate())
  }
  changeLanguage(language: string) {
    localStorage.setItem("lng", language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
  private getBreadcrumb(route: ActivatedRouteSnapshot): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data["breadcrumb"];  
  }


}
