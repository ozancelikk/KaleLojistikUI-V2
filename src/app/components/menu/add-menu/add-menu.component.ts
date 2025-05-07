import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponentService } from '../../../services/component/restaurant/menu-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { FoodCategoryComponentService } from '../../../services/component/restaurant/food-category-component.service';
import { FoodCategory } from '../../../models/restaurant/foodCategory';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'))
  @Output() menuEvent = new EventEmitter<any>()
  menuAddForm: FormGroup;
  foodCategories: FoodCategory[]
  constructor(private menuComponentService: MenuComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService, private foodCategoryComponentService: FoodCategoryComponentService) { }

  ngOnInit(): void {
    this.createNewMenu()
    this.getAllFoodCategory()
  }
  createNewMenu() {
    this.menuAddForm = this.formBuilder.group({
      productName: ["", Validators.required],
      productDescription: ["", Validators.required],
      foodCategoryId: ["", Validators.required],
      price: ["", Validators.required],
    })
  }

  addMenu() {
    if (this.menuAddForm.valid) {
      const model = Object.assign({}, this.menuAddForm.value)
      if (model.productName.trim() == '' || model.productDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.menuComponentService.addMenu(model, () => {
        this.menuEvent.emit(true)
        this.createNewMenu()
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.warning)
    }
  }
  async getAllFoodCategory() {
    this.foodCategories = await this.foodCategoryComponentService.getAllFoodCategory()
  }

}
