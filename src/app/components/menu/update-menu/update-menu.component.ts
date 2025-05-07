import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { MenuComponentService } from '../../../services/component/restaurant/menu-component.service';
import { ToastrService } from 'ngx-toastr';
import { FoodCategoryComponentService } from '../../../services/component/restaurant/food-category-component.service';
import { FoodCategory } from '../../../models/restaurant/foodCategory';


@Component({
  selector: 'app-update-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-menu.component.html',
  styleUrl: './update-menu.component.css'
})
export class UpdateMenuComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'))
  menuUpdateForm: FormGroup;
  foodCategories: FoodCategory[]
  updateRole:string="POST.Updating.UpdateMenuItem"
  @Output() menuEvent = new EventEmitter<any>()
  @Input() set menuDetail(value: any) {
    if (!value) { return }
    this.menuUpdateForms(value)
    this.getAllFoodCategory()
  }
  constructor(private formBuilder: FormBuilder, private menuComponentService: MenuComponentService, private toastrService: ToastrService, private foodCategoryComponentService: FoodCategoryComponentService) { }

  menuUpdateForms(value: any) {
    this.menuUpdateForm = this.formBuilder.group({
      id: [value.id],
      productName: [value.productName, Validators.required],
      productDescription: [value.productDescription, Validators.required],
      foodCategoryId: [value.foodCategoryId, Validators.required],
      price: [value.price, Validators.required],
    })
  }
  updateMenu() {
    if (this.menuUpdateForm.valid) {
      const model = Object.assign({}, this.menuUpdateForm.value)
      if (model.productName.trim() == '' || model.productDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.menuComponentService.updateMenu(model, () => {
        this.menuEvent.emit(true)
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.warning)
    }
  }
  async getAllFoodCategory() {
    this.foodCategories = await this.foodCategoryComponentService.getAllFoodCategory()
  }
}
