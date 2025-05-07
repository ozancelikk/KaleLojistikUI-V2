import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { FoodCategoryComponentService } from '../../../services/component/restaurant/food-category-component.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-food-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-food-category.component.html',
  styleUrl: './update-food-category.component.css'
})
export class UpdateFoodCategoryComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  updateFoodCategoryForm: FormGroup;
  updateFoodCategoryRole:string="POST.Updating.UpdateFoodCategoryItem"
  @Output() foodCategoryEvent = new EventEmitter<any>()
  @Input() set foodCategoryDetail(value: any) {
    if (!value) { return }
    this.updateFoodCategoryForms(value)
  }
  constructor(private foodCategoryComponentService: FoodCategoryComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder) { }

  updateFoodCategoryForms(value: any) {
    this.updateFoodCategoryForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      categoryName: [value.categoryName, Validators.required],
    })
  }

  updateFoodCategory() {
    if (this.updateFoodCategoryForm.valid) {
      const model = Object.assign({}, this.updateFoodCategoryForm.value)
      if (model.categoryName.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.foodCategoryComponentService.updateFoodCategory(model, () => {
        this.foodCategoryEvent.emit(true)
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.warning)
    }
  }
}
