import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { TechnicalErrorImageComponentService } from '../../../services/component/technical-error-image-component.service';
import { TechnicalErrorImageDto } from '../../../models/technicalError/technicalErrorImageDto';


@Component({
  selector: 'app-technical-error-image',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './technical-error-image.component.html',
  styleUrl: './technical-error-image.component.css'
})
export class TechnicalErrorImageComponent {
  imageRole:string="GET.Reading.GetImagesByTechnicalErrorIdTechnicalErrorImageItem"
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"))
  list:TechnicalErrorImageDto[]
  before:any
  after:any
  now:any;
  @Input() set technicalError(value:any){
    if(value==null)return
    this.getImage(value.id)
  }
  constructor(private technicalErrorImageComponentService:TechnicalErrorImageComponentService){}
  getImageBeforePath(value:any): string {
    if (value) {
      let url: string = window["env"]["technicalErrorImageBefore"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }
  getImageAfterPath(value:any): string {
    if (value) {
      let url: string = window["env"]["technicalErrorImageBefore"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }
  getImagePath(value:any): string {
    if (value) {
      let url: string = window["env"]["technicalErrorImageBefore"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }

  async getImage(id:string){
    await this.technicalErrorImageComponentService.getImagesByTechnicalErrorId(id).then(data=>{
      this.list=data
      data.forEach(element=>{
        if (element.imageNumber==0) {
          this.now=element.technicalErrorId+"/"+element.imagePath
        }else if(element.imageNumber==1){
          this.before=element.technicalErrorId+"/"+element.imageNumber+"/"+element.imagePath
        }else{
          this.after=element.technicalErrorId+"/"+element.imageNumber+"/"+element.imagePath
        }
      })
    })
  }

}
