import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserImageComponentService } from '../../../services/component/user/user-image-component.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { UserImageDto } from '../../../models/user/userImageDto';
import { UserDetailsDto } from '../../../models/user/userDetailsDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css'
})
export class UserImageComponent {
  imagePath:string
  imageId: string
  file: File
  userImageDto: UserImageDto
  userDetailsDto:UserDetailsDto
  @Output() imageEvent = new EventEmitter<any>()
  @Input() set userImageDetail(value: any) {
    if (!value) return
    this.getImagesByUserId(value.id)
    this.addUserImageForm(value)
    this.imagePath=value.imagePath
    this.userDetailsDto=value
    
  }
  protected userImageUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private userImageComponentService: UserImageComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) { }

  getImagePath(): string {
    if (this.imagePath) {
      let url: string = window["env"]["userImage"]+ this.imagePath
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }

  addUserImageForm(value: any) {
    this.userImageUpdateForm = this.formBuilder.group({
      userId: [value.id],
    })
  }
  get userId() {
    return this.userImageUpdateForm.get("userId")
  }

  updateImage() {
    if (!this.file || !['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(this.file.type)) {
      this.toastrService.error(this.lang.error);
      return; 
    }
    if (this.imageId) {
      let updateModel = {
        id: this.imageId,
        userId: this.userId.value,
        imagePath: this.file
      }
      this.userImageComponentService.updateImage(updateModel, () => {
        this.imageEvent.emit(true)
        this.toastrService.success(this.lang.updateUser)
      })
    } else {
      let addModel = {
        userId: this.userId.value,
        imagePath: this.file,
      }
      this.userImageComponentService.addImage(addModel, () => {
        this.imageEvent.emit(true)
        this.toastrService.success(this.lang.updateUser)
      })
    }
  }
  onChange(event: any) {
    this.file = event.target?.files[0];
  }
  async getImagesByUserId(id: string) {
    this.userImageDto = (await this.userImageComponentService.getImagesByUserId(id))
    this.imageId = this.userImageDto.id
  }

}
