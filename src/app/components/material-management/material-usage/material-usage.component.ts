import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MaterialManagement } from '../../../models/materialManagement/materialManagement';

@Component({
  selector: 'app-material-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-usage.component.html',
  styleUrl: './material-usage.component.css'
})
export class MaterialUsageComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  materialManagement:MaterialManagement
  @Input() set materialUsage(value: any) {
    if (!value) return
    this.materialManagement=value
  }
}
