import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { CategoryComponentService } from '../../../../services/component/stock-tracking/category-component.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() categoryEvent = new EventEmitter<any>()
  updateRole:string="POST.Updating.UpdateCategoryItem"
  @Input() set categoryDetail(value: any) {
    if (!value) { return }
    this.updateCategoryForm(value)
  }
  categoryUpdateForm: FormGroup;
  constructor(private categoryComponentService: CategoryComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  updateCategoryForm(value: any) {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [value.id],
      name: [value.name, Validators.required],
      description: [value.description, Validators.required]
    })
  }
  categoryUpdate() {
    if (this.categoryUpdateForm.valid) {
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value)
      if (categoryModel.name.trim() == '' || categoryModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.categoryComponentService.updateCategory(categoryModel, () => {
        this.categoryEvent.emit(true)
        $('#updateCategoryModal').modal('hide')
        $('#categoryModal').modal('toggle')
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
}
