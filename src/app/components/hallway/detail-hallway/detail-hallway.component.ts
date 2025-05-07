import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hallway } from '../../../models/hallway/hallway';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-detail-hallway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-hallway.component.html',
  styleUrl: './detail-hallway.component.css'
})
export class DetailHallwayComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  hallway: Hallway
  @Input() set hallwayDetail(value: any) {
    if (!value) return
    this.hallway = value
  }
}
