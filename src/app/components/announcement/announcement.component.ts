import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Languages } from '../../../assets/locales/language';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { GridOptions } from 'ag-grid-community';
import { AnnouncementComponentService } from '../../services/component/announcement-component.service';
import { UpdateAnnouncementComponent } from './update-announcement/update-announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule,AgGridModule,UpdateAnnouncementComponent,AddAnnouncementComponent],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(private announcementComponentService: AnnouncementComponentService,private dialog:MatDialog) { }
  protected gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 50,
  };

}
