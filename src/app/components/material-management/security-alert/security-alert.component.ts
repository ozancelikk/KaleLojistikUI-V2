import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MaterialManagement } from '../../../models/materialManagement/materialManagement';

@Component({
  selector: 'app-security-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-alert.component.html',
  styleUrl: './security-alert.component.css'
})
export class SecurityAlertComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  materialManagement:MaterialManagement
  @Input() set securityAlert(value: any) {
    if (!value) return
    this.materialManagement=value
  }
}
