import { Injectable } from '@angular/core';
import { StockItemService } from '../../common/stocktracking/stock-item.service';
import { ToastrService } from 'ngx-toastr';
import { StockItem } from '../../../models/stockItem/stockItem';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockItemComponentService {

  constructor(private readonly stockItemService:StockItemService,private toastrService:ToastrService) { }

  async getAllStockItem(){
    const observable= this.stockItemService.getAllStockItem()
    const response= await firstValueFrom(observable)
    return response.data
  }
  async getAllDetails(){
    const observable= this.stockItemService.getAllDetails()
    return  (await firstValueFrom(observable)).data
  }
  async getByStockItemId(id:string){
    const observable =this.stockItemService.getByStockItemId(id)
    return (await firstValueFrom(observable)).data
  }

  async deleteStockItem(id:string,callBackfunction?:()=>void){
    const observable =await this.stockItemService.deleteStockItem(id)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async addStockItem(stockItem:StockItem,callBackfunction?:()=>void,errorCallBack?:(err)=>void){
    const observable =await this.stockItemService.addStockItem(stockItem)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    }).catch(error=>{
      errorCallBack&&errorCallBack(error) 
    })
   
  }
  async updateStockItem(stockItem:StockItem,callBackfunction?:()=>void){
    const observable =await this.stockItemService.updateStockItem(stockItem)  
    const promiseData= firstValueFrom(observable)
    promiseData.then(response=>{
      this.toastrService.success(response.message)
      callBackfunction&&callBackfunction()
    })
  }
  async getEmployeeWorkinghoursPdf(firstDate:string,endDate:string,callBackfunction?:()=>void){
    const observable= this.stockItemService.dateByStockReportbyEmployee(firstDate,endDate)
    const promiseData = firstValueFrom(observable)
    
    promiseData.then(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadURL = window.URL.createObjectURL(blob);
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString().replace(/[/: ]/g, "-");
      const link = document.createElement('a');
      link.download = `stock-item-${formattedDate}.pdf`;
      link.href = downloadURL;
      link.click();
      callBackfunction && callBackfunction()
    })
  }
}
