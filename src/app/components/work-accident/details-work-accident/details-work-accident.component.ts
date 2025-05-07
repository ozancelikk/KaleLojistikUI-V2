import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WorkAccident } from '../../../models/workAccident/workAccident';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-details-work-accident',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-work-accident.component.html',
  styleUrl: './details-work-accident.component.css'
})
export class DetailsWorkAccidentComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  workAccident:WorkAccident
  @Input() set workAccidentDetail(value: any) {
    if (!value) return
    this.workAccident=value
  }
}
