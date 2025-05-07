import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Order } from '../../../models/restaurant/order';
import { FormGroup } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class DetailOrderComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem('lng'));
  order:Order
  @Input() set orderDetail(value: any) {
    if (!value) {return}
    this.order = value
  }

}
