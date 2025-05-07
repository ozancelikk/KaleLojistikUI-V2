import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuImageDto } from '../../../models/restaurant/menuImageDto';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MenuImageComponentService } from '../../../services/component/restaurant/menu-image-component.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-image-menu',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './image-menu.component.html',
  styleUrl: './image-menu.component.css'
})
export class ImageMenuComponent {
  imageId: string
  imageRole:string="POST.Writing.AddMenuImageItem"
  menuImage:any
  file: File
  menuDetails:any
  menuImageDto: MenuImageDto
  @Output() imageEvent = new EventEmitter<any>()
  @Input() set menuImageDetail(value: any) {
    if (!value) return
    this.getBymenuId(value.id)
    this.menuImage=value   
  }
  @Input() set menuDetail(value: any) {
    if (!value) return
    this.addMenuImageForm(value)
    this.menuDetails=value
  }
  protected menuImageUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private menuImageComponentService:MenuImageComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) { }

  getImagePath(value:any): string {
    if (value) {
      let url: string = window["env"]["menuImage"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }

  addMenuImageForm(value: any) {
    this.menuImageUpdateForm = this.formBuilder.group({
      menuId: [value.id],
    })
  }
  get menuId() {
    return this.menuImageUpdateForm.get("menuId")
  }

  updateImage() {
    if (!this.file || !['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(this.file.type)) {
      this.toastrService.error(this.lang.error);
      return; 
    }
    if (this.imageId) {
      let updateModel = {
        id: this.imageId,
        menuId: this.menuId.value,
        image: this.file
      };
      this.menuImageComponentService.updateImage(updateModel, () => {
        this.imageEvent.emit(true);
        this.file=undefined    
      });
    } else {
      let addModel = {
        menuId: this.menuId.value,
        image: this.file
      };this.menuImageDetail
      this.menuImageComponentService.addImage(addModel, () => {
        this.imageEvent.emit(true);
        this.file=undefined
      });
    }
  }
  
  onChange(event: any) {
    this.file = event.target?.files[0];
  }
  async getBymenuId(id: string) {
    this.menuImageDto = (await this.menuImageComponentService.getByMenuId(id))
    this.menuImageDto ? this.imageId = this.menuImageDto.id: this.imageId=null
  }
}
