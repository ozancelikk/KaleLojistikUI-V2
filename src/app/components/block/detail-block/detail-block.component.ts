import { Component, Input } from '@angular/core';
import { Block } from '../../../models/block/block';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-block.component.html',
  styleUrl: './detail-block.component.css'
})
export class DetailBlockComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  block: Block
  @Input() set blockDetail(value: any) {
    if (!value) return
    this.block = value
  }
}
