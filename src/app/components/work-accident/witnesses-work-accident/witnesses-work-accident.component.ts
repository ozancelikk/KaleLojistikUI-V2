import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { WorkAccident } from '../../../models/workAccident/workAccident';

@Component({
  selector: 'app-witnesses-work-accident',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './witnesses-work-accident.component.html',
  styleUrl: './witnesses-work-accident.component.css'
})
export class WitnessesWorkAccidentComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  workAccident:WorkAccident
  @Input() set workAccidentDetail(value: any) {
    if (!value) return
    this.workAccident=value
  }
}
