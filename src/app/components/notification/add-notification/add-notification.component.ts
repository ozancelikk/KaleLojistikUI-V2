import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Languages } from '../../../../assets/locales/language';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { NotificationComponentService } from '../../../services/component/notification-component.service';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { Employee } from '../../../models/employee/employee';
import { PersonDetail } from '../../../models/personDetail';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-notification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-notification.component.html',
  styleUrl: './add-notification.component.css'
})
export class AddNotificationComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() notificationEvent = new EventEmitter<any>()
  notificationAddForm: FormGroup
  mail: string
  currentDate = new Date();
  dateNow: string
  personDetails: PersonDetail[]

  constructor(private notificationComponentService: NotificationComponentService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastrService: ToastrService) { }

  ngOnInit() {
    this.createNewNotification();
    this.getPersonDetails();
  }

  createNewNotification() {
    this.dateNow = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    this.notificationAddForm = this.formBuilder.group({
      notificationName: ["", Validators.required],
      notificationDescription: ["", Validators.required],
      reminderTime: ["", Validators.required],
      startNotificationDate: ["", Validators.required],
      endNotificationDate: ["", Validators.required],
      personId: ["", Validators.required],
      date: [this.dateNow],
      email: [""],
      nextRunTime: [""]
    })
  }

  addNotification() {
    if (this.notificationAddForm.valid) {
      this.changeDate()
      let model = Object.assign({}, this.notificationAddForm.value)
      if (model.notificationName.trim() == '' || model.notificationDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.notificationComponentService.addNotification(model, () => {
        this.notificationEvent.emit(true)
        this.createNewNotification()
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  changeDate() {
    var startNotificationDates = this.notificationAddForm.get("startNotificationDate").value
    var endNotificationDate = this.notificationAddForm.get("endNotificationDate").value
    startNotificationDates = this.datePipe.transform(startNotificationDates, 'yyyy-MM-dd HH:mm:ss');
    endNotificationDate = this.datePipe.transform(endNotificationDate, 'yyyy-MM-dd HH:mm:ss');
    this.notificationAddForm.get("startNotificationDate").setValue(startNotificationDates)
    this.notificationAddForm.get("endNotificationDate").setValue(endNotificationDate)
  }
  async getPersonDetails() {
    this.personDetails = (await this.notificationComponentService.getAllPerson())
  }

}
