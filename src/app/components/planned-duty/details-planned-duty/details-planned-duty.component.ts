import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { PlannedDutyComponentService } from '../../../services/component/planned-duty-component.service';
import { PlannedDuty } from '../../../models/plannedDuty/plannedDuty';

@Component({
  selector: 'app-details-planned-duty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-planned-duty.component.html',
  styleUrl: './details-planned-duty.component.css'
})
export class DetailsPlannedDutyComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  plannedDuty:PlannedDuty
  @Input() set plannedDutyId(value: PlannedDuty) {
    if(!value) return;
    this.plannedDuty=value;
  }
  constructor(private plannedDutyComponentService:PlannedDutyComponentService) {}

}
