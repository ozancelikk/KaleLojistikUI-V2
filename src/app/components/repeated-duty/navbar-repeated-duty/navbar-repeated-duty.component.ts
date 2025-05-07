import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RepeatedDutyService } from '../../../services/common/repeated-duty.service';
import { ResponseModel } from '../../../models/responseModel';
import { Observable } from 'rxjs';
import { RepeatedDutyComponentService } from '../../../services/component/repeated-duty-component.service';


@Component({
  selector: 'app-navbar-repeated-duty',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './navbar-repeated-duty.component.html',
  styleUrl: './navbar-repeated-duty.component.css'
})
export class NavbarRepeatedDutyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  selectedIds: string[] = [];
  addRole:string="POST.Writing.AddRepeatedDutyItem"
  activeRole:string="POST.Writing.GetAllByIdStatusActiveRepeatedDutyItem"
  passiveRole:string="POST.Writing.GetAllByIdStatusPassiveRepeatedDutyItem"
  @Input() set selectedIdsInput(value: string[]) {
    if (!value) {return;}
    this.selectedIds=value;
  }
  @Output() selectedOutput = new EventEmitter<any>();

  constructor(private repeatedDutyComponentService: RepeatedDutyComponentService) {}

  getBySelectedIdActive() {
    this.repeatedDutyComponentService.getBySelectedIdActive(this.selectedIds,()=>{
      this.selectedOutput.emit(true);
    });
  }
  getBySelectedIdPassive() {
    this.repeatedDutyComponentService.getBySelectedIdPassive(this.selectedIds,()=>{
      this.selectedOutput.emit(true);
    });
  }
}
