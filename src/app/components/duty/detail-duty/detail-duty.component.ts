import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyDetail } from '../../../models/duty/dutyDetail';
import { TranslateComponentService } from '../../../services/component/translate-component.service';
import { Translate } from '../../../models/translate/translate';

@Component({
  selector: 'app-detail-duty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-duty.component.html',
  styleUrl: './detail-duty.component.css'
})
export class DetailDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  dutyDetail:DutyDetail
  data:string
  @Input() set dutyDetails(value:any){
    if(!value) return
    this.dutyDetail=value
  }
  constructor(private translateComponentService:TranslateComponentService) { }



}
