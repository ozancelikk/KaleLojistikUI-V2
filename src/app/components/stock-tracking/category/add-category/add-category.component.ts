import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../../assets/locales/ILanguage';
import { Languages } from '../../../../../assets/locales/language';
import { CategoryComponentService } from '../../../../services/component/stock-tracking/category-component.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() categoryEvent = new EventEmitter<any>()
  categoryAddForm: FormGroup;

  constructor(private categoryComponentService: CategoryComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createCategoryForm()
  }
  createCategoryForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  categoryAdd() {
    if (this.categoryAddForm.valid) {
      let categoryModel = Object.assign({}, this.categoryAddForm.value)
      if (categoryModel.name.trim() == '' || categoryModel.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.categoryComponentService.addCategory(categoryModel, () => {
        this.createCategoryForm();
        this.categoryEvent.emit(true)
        $('#addCategoryModal').modal('hide')
        $('#categoryModal').modal('toggle')
      })
    } else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }

}
