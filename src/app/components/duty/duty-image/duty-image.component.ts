import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { DutyImageComponentService } from '../../../services/component/duty-image-component.service';
import { DutyImageDto } from '../../../models/duty/dutyImageDto';

@Component({
  selector: 'app-duty-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './duty-image.component.html',
  styleUrl: './duty-image.component.css'
})
export class DutyImageComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  dutyImageBefore:DutyImageDto[]
  before:any
  after:any
  dutyDetails:any
  @Input() set dutyDetail(value: any) {
    if (!value) return
    this.before=null
    this.after=null
    this.dutyDetails=value
    this.beforeDutyImage(value.id)
  }
  constructor(private dutyImageComponentService:DutyImageComponentService) { }

  getImageBeforePath(value:any): string {
    if (value) {
      let url: string = window["env"]["dutyImageBefore"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }
  getImageAfterPath(value:any): string {
    if (value) {
      let url: string = window["env"]["dutyImageAfter"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }
  async beforeDutyImage(id:string){
    await this.dutyImageComponentService.getBeforeImagesByDutyId(id).then(data=>{
      this.dutyImageBefore=data
      data.forEach(element => {
        if (element.imageNumber==1) {
          this.before=element.dutyId+"/"+element.imagePath
        }else{
          this.after=element.dutyId+"/"+element.imagePath
        }
      });
      
    })
    
  }
  
}
