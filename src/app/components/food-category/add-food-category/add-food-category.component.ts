import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { FoodCategoryComponentService } from '../../../services/component/restaurant/food-category-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-food-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-food-category.component.html',
  styleUrl: './add-food-category.component.css'
})
export class AddFoodCategoryComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() foodCategoryEvent = new EventEmitter<any>()
  foodCategoryAddForm: FormGroup;
  constructor(private foodCategoryComponentService: FoodCategoryComponentService, private toastrService: ToastrService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.createNewFoodCategory()
  }

  createNewFoodCategory() {
    this.foodCategoryAddForm = this.formBuilder.group({
      categoryName: ["", Validators.required],
    })
  }

  addFoodCategory() {
    if (this.foodCategoryAddForm.valid) {
      const model = Object.assign({}, this.foodCategoryAddForm.value)
      if (model.categoryName.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.foodCategoryComponentService.addFoodCategory(model, () => {
        this.foodCategoryEvent.emit(true)
        this.createNewFoodCategory()
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.warning)
    }
  }

}
