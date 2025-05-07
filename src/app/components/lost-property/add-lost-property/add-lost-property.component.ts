import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LostPropertyComponentService } from '../../../services/component/property/lost-property-component.service';
import { ToastrService } from 'ngx-toastr';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { Employee } from '../../../models/employee/employee';
import { Room } from '../../../models/room/room';

@Component({
  selector: 'app-add-lost-property',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-lost-property.component.html',
  styleUrl: './add-lost-property.component.css'
})
export class AddLostPropertyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  @Output() propertyEvent = new EventEmitter<boolean>()
  propertyAddForm: FormGroup
  employees: Employee[]
  rooms: Room[]
  constructor(private lostPropertyComponentService: LostPropertyComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService, private employeeComponentService: EmployeeComponentService, private roomComponentservice: RoomComponentService) { }


  ngOnInit(): void {
    this.createNewProperty()
    this.getAllEmployee()
    this.getAllRoom()
  }
  createNewProperty() {
    this.propertyAddForm = this.formBuilder.group({
      propertyName: ["", Validators.required],
      description: ["", Validators.required],
      roomId: ["", Validators.required],
      employeeId: ["", Validators.required],
      itemValuable: [false, Validators.required],
      itemDiscoveryDate: [""],
      finishDate: [""],
      delivered: [true],
      employeeName: [""],
    })
  }

  addLostProperty() {
    if (this.propertyAddForm.valid) {
      const model = Object.assign({}, this.propertyAddForm.value)
      if (model.propertyName.trim() == '' || model.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.lostPropertyComponentService.addLostProperty(model, () => {
        this.propertyEvent.emit(true)
        this.createNewProperty()
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.warning)
    }
  }
  async getAllEmployee() {
    this.employees = await this.employeeComponentService.getAllEmployee()
  }
  async getAllRoom() {
    this.rooms = (await this.roomComponentservice.getAllRoom()).data
  }

}
