import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Floor } from '../../../models/floor/floor';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-detail-floor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-floor.component.html',
  styleUrl: './detail-floor.component.css'
})
export class DetailFloorComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  floor: Floor
  @Input() set floorDetail(value: any) {
    if (!value) return
    this.floor = value
  }

}
