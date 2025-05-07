import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponentService } from '../../../services/component/notification-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { EmployeeComponentService } from '../../../services/component/employee-component.service';
import { PersonDetail } from '../../../models/personDetail';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-notification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './update-notification.component.html',
  styleUrl: './update-notification.component.css'
})
export class UpdateNotificationComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"))
  @Output() notificationEvent = new EventEmitter<any>()
  @Input() set notificationDetail(value: any) {
    if (!value) return
    this.updateNotificationForm(value);
  }
  notificationUpdateForm: FormGroup
  mail: string
  currentDate = new Date();
  dateNow: string
  personDetails: PersonDetail[]
  updateRole:string="POST.Updating.UpdateNotificationItem"

  constructor(private notificationComponentService: NotificationComponentService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllPersonDetails();
  }

  updateNotificationForm(value: any) {
    this.dateNow = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    this.notificationUpdateForm = this.formBuilder.group({
      id: [value.id,],
      notificationName: [value.notificationName, Validators.required],
      notificationDescription: [value.notificationDescription, Validators.required],
      reminderTime: [value.reminderTime, Validators.required],
      startNotificationDate: [value.startNotificationDate, Validators.required],
      endNotificationDate: [value.endNotificationDate, Validators.required],
      personId: [value.personId, Validators.required],
      date: [value.date],
      email: [value.email],
      nextRunTime: [value.nextRunTime]
    })
  }

  updateNotification() {
    if (this.notificationUpdateForm.valid) {
      this.changeDate()
      let model = Object.assign({}, this.notificationUpdateForm.value)
      if (model.notificationName.trim() == '' || model.notificationDescription.trim() == '') {
        this.toastrService.error(this.lang.pleaseFillİnformation)
        return
      }
      this.notificationComponentService.updateNotification(model, () => {
        this.notificationEvent.emit(true)
      })
    } else {
      this.toastrService.info(this.lang.pleaseFillİnformation, this.lang.error)
    }
  }
  changeDate() {
    var startNotificationDates = this.notificationUpdateForm.get("startNotificationDate").value
    var endNotificationDate = this.notificationUpdateForm.get("endNotificationDate").value
    startNotificationDates = this.datePipe.transform(startNotificationDates, 'yyyy-MM-dd HH:mm:ss');
    endNotificationDate = this.datePipe.transform(endNotificationDate, 'yyyy-MM-dd HH:mm:ss');
    this.notificationUpdateForm.get("startNotificationDate").setValue(startNotificationDates)
    this.notificationUpdateForm.get("endNotificationDate").setValue(endNotificationDate)
  }
  async getAllPersonDetails() {
    this.personDetails = await this.notificationComponentService.getAllPerson()
  }

}
