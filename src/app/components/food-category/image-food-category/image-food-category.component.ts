import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { FoodCategoryImageService } from '../../../services/common/restaurant/food-category-image.service';
import { FoodCategoryImageDto } from '../../../models/restaurant/foodCategoryImageDto';
import { ToastrService } from 'ngx-toastr';
import { FoodCategoryImageComponentService } from '../../../services/component/restaurant/food-category-image-component.service';


@Component({
  selector: 'app-image-food-category',
  standalone: true,
  imports: [CommonModule,FormsModule ,],
  templateUrl: './image-food-category.component.html',
  styleUrl: './image-food-category.component.css'
})
export class ImageFoodCategoryComponent {
  imageId: string
  categoryImage:any
  file: File
  foodCategoryDetails:any
  foodCategoryImageDto: FoodCategoryImageDto
  updateImageRole:string="POST.Writing.AddFoodCategoryImageItem"
  @Output() imageEvent = new EventEmitter<any>()
  @Input() set foodCategoryImageDetail(value: any) {
    if (!value) return
    this.getByCategoryId(value.id)
    this.categoryImage=value   
  }
  @Input() set categoryDetail(value: any) {
    if (!value) return
    this.addCategoryImageForm(value)
    this.foodCategoryDetails=value
  }
  protected categoryImageUpdateForm: FormGroup
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  constructor(private foodCategoryImageComponentService:FoodCategoryImageComponentService, private formBuilder: FormBuilder,private toastrService:ToastrService) { }

  getImagePath(value:any): string {
    if (value) {
      let url: string = window["env"]["categoryImage"]+value
      return url;
    }
    let url2:string="assets/img/noimage.jpg";
    return url2
  }

  addCategoryImageForm(value: any) {
    this.categoryImageUpdateForm = this.formBuilder.group({
      categoryId: [value.id],
    })
  }
  get categoryId() {
    return this.categoryImageUpdateForm.get("categoryId")
  }

  updateImage() {
    if (!this.file || !['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(this.file.type)) {
      this.toastrService.error(this.lang.error);
      return; 
    }
    if (this.imageId) {
      let updateModel = {
        id: this.imageId,
        categoryId: this.categoryId.value,
        image: this.file
      };
      this.foodCategoryImageComponentService.updateImage(updateModel, () => {
        this.imageEvent.emit(true);
        this.toastrService.success(this.lang.updateFoodCategory)
        this.file=undefined 
      });
    } else {
      let addModel = {
        categoryId: this.categoryId.value,
        image: this.file
      };
      this.foodCategoryImageComponentService.addImage(addModel, () => {
        this.imageEvent.emit(true);
        this.toastrService.success(this.lang.updateFoodCategory)
        this.file=undefined
      });
    }
  }
  
  onChange(event: any) {
    this.file = event.target?.files[0];
  }
  async getByCategoryId(id: string) {
    this.foodCategoryImageDto = (await this.foodCategoryImageComponentService.getByCategoryId(id))
    this.foodCategoryImageDto ? this.imageId = this.foodCategoryImageDto.id: this.imageId=null
  }
}
