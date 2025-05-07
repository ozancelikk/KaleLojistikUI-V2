import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LostPropertyImageDto } from '../../../models/lostPropertys/lostPropertyImageDto';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { LostPropertyImageComponentService } from '../../../services/component/property/lost-property-image-component.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-image-lost-property',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,],
  templateUrl: './image-lost-property.component.html',
  styleUrl: './image-lost-property.component.css'
})
export class ImageLostPropertyComponent {
  imageId: string
  propertyImage:any
  file:File
  propertyDetails:any
  lostPropertyImageDto: LostPropertyImageDto
  imageRole:string="POST.Writing.AddLostPropertyImageItem";

  @Output() imageEvent = new EventEmitter<any>()
  @Input() set propertyImageDetail(value: any) {
    if (!value) return
    this.getByPropertyId(value.id)
    this.propertyImage=value   
  }
  @Input() set propertyDetail(value: any) {
    if (!value) return
    this.addPropertyImageForm(value)
    this.propertyDetails=value
  }
  protected propertyImageUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private lostPropertyImageComponentService:LostPropertyImageComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) { }

  getImagePath(value:any): string {
    if (value) {
      let url: string = window["env"]["propertyImage"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }
  addPropertyImageForm(value: any) {
    this.propertyImageUpdateForm = this.formBuilder.group({
      propertyId: [value.id],
    })
  }
  get propertyId() {
    return this.propertyImageUpdateForm.get("propertyId")
  }

  updateImage() {
    if (!this.file || !['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(this.file.type)) {
      this.toastrService.error(this.lang.error);
      return; 
    }
    if (this.imageId) {
      let updateModel = {
        id: this.imageId,
        propertyId: this.propertyId.value,
        image: this.file
      };
      this.lostPropertyImageComponentService.updateImage(updateModel, () => {
        this.imageEvent.emit(true);
        this.file=undefined    
      });
    } else {
      let addModel = {
        propertyId: this.propertyId.value,
        image: this.file
      };this.propertyImageDetail
      this.lostPropertyImageComponentService.addImage(addModel, () => {
        this.imageEvent.emit(true);
        this.file=undefined
      });
    }
  }
  onChange(event: any) {
    this.file = event.target?.files[0];
  }
  async getByPropertyId(id: string) {
    this.lostPropertyImageDto = (await this.lostPropertyImageComponentService.getByPropertyId(id))
    this.lostPropertyImageDto ? this.imageId = this.lostPropertyImageDto.id: this.imageId=null
  }
}
