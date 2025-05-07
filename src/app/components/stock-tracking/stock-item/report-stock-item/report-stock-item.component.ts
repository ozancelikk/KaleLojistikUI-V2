import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { StockItemComponentService } from '../../../../services/component/stock-tracking/stock-item-component.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-report-stock-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './report-stock-item.component.html',
  styleUrl: './report-stock-item.component.css'
})
export class ReportStockItemComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  firsDate:string
  endDate:string
  report:boolean=false

  constructor(private stockItemComponentService:StockItemComponentService,private toastrService:ToastrService) {}

  onFirsDate(event:any){
    this.firsDate = event.target.value;
    const selectedDate = new Date(this.firsDate);
    const formattedDate = this.formatDate(selectedDate);
    this.firsDate = formattedDate;  
  }
  onEndDate(event:any){
    this.endDate=event.target.value
    const selectedDate = new Date(this.endDate);
    const formattedDate = this.formatDate(selectedDate);
    this.endDate = formattedDate;  
  }
  downloadPdf(){
    this.report=true
    this.stockItemComponentService.getEmployeeWorkinghoursPdf(this.firsDate,this.endDate,()=>{
      this.toastrService.success(this.lang.reportSuccessful)
      this.report=false
      $('#reportStockItemModal').modal('hide');
      this.onFirsDate(null)
      this.onEndDate(null)
    })
  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

}
