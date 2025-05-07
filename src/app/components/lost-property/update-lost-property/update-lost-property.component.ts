import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { ToastrService } from 'ngx-toastr';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { LostPropertyComponentService } from '../../../services/component/property/lost-property-component.service';
import { RoomComponentService } from '../../../services/component/room-component.service'; 
import { Employee } from '../../../models/employee/employee';
import { Room } from '../../../models/room/room';


@Component({
  selector: 'app-update-lost-property',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './update-lost-property.component.html',
  styleUrl: './update-lost-property.component.css'
})
export class UpdateLostPropertyComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));
  lostPropertyUpdateForm: FormGroup
  updateRole:string="POST.Updating.UpdateLostPropertyItem"
  employees: Employee[]
  rooms: Room[]
  @Output() propertyEvent = new EventEmitter<boolean>()
  @Input() set propertyDetails(value: any) {
    if (!value) { return }
    this.updatePropertyForm(value)
  }
  constructor(private lostPropertyComponentService: LostPropertyComponentService, private formBuilder: FormBuilder, private toastrService: ToastrService, private employeeComponentService: EmployeeComponentService, private roomComponentservice: RoomComponentService) { }


  ngOnInit(): void {
    this.getAllEmployee()
    this.getAllRoom()
  }

  updatePropertyForm(value: any) {
    this.lostPropertyUpdateForm = this.formBuilder.group({
      id: [value.id, Validators.required],
      propertyName: [value.propertyName, Validators.required],
      description: [value.description, Validators.required],
      roomId: [value.roomId, Validators.required],
      employeeId: [value.employeeId, Validators.required],
      itemValuable: [value.itemValuable, Validators.required],
      itemDiscoveryDate: [value.itemDiscoveryDate],
      finishDate: [value.finishDate],
      delivered: [value.delivered],
      employeeName: [value.employeeName],
    })
  }

  updateLostProperty() {
    if (this.lostPropertyUpdateForm.valid) {
      const model = Object.assign({}, this.lostPropertyUpdateForm.value)
      if (model.propertyName.trim() == '' || model.description.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.lostPropertyComponentService.updateLostProperty(model, () => {
        this.propertyEvent.emit(true)
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
