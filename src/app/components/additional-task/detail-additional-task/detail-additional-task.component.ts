import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AdditionalRoomTask } from '../../../models/additionalTask/additionalRoomTask';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-detail-additional-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-additional-task.component.html',
  styleUrl: './detail-additional-task.component.css'
})
export class DetailAdditionalTaskComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  tasked:AdditionalRoomTask[]
  @Input() set tasks(value: any) {
    if (!value) return
    this.tasked=value.tasks
    
    
  }
}
