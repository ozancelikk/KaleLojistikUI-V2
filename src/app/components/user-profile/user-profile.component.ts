import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Languages } from '../../../assets/locales/language';
import { ILanguage } from '../../../assets/locales/ILanguage';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { UserDetailsDto } from '../../models/user/userDetailsDto';
import { UserComponentService } from '../../services/component/user/user-component.service';
import { UserImageComponentService } from '../../services/component/user/user-image-component.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  showLoading: boolean = false;
  userUpdateForm: any;
  userLoad = false;
  userId: any;
  imageId: string
  user: UserDetailsDto;
  verifyPassword: string;
  password: string;
  mailAddress: string
  file: File
  userChangePasswordForm: FormGroup
  isUserLoad: boolean = false
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(private userComponentService: UserComponentService, private formBuilder: FormBuilder, private userImageComponentService: UserImageComponentService, private toastrService: ToastrService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changePasswordForm();
    this.getUserId();
  }

  getUserId(){
    this.userId=localStorage.getItem("userId")
    this.getByUser(this.userId);
  }
  
  changePasswordForm() {
    this.userChangePasswordForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  changePassword() {
    let model = Object.assign({}, this.userChangePasswordForm.value);
    model["email"] = this.mailAddress;
    if (this.userChangePasswordForm.valid) {
      if (this.verifyPassword != this.password) {
        this.toastrService.error(this.lang.passwordDontMatch, this.lang.error);
      }
      else {
        this.userComponentService.changePassword(model, () => {
          this.toastrService.success(this.lang.passwordChangeSucceed, this.lang.successful);
          this.userChangePasswordForm.reset();
        });
      }
    }
    else {
      this.toastrService.error(this.lang.pleaseFillİnformation, this.lang.error);
    }
  }

  async getByUser(id:string) {
    this.user = (await this.userComponentService.getImagesByUserId(id))
    this.mailAddress = this.user.email
    this.isUserLoad = true
    this.getImage(this.userId)
    this.userUpdateForms();
  }

  getImagePath(userDetail: UserDetailsDto): string {
    let url: string = userDetail.imagePath != null ?  window["env"]["userImage"]
      + userDetail.imagePath : "assets/img/noimage.jpg";
    return url;
  }
  onChange(event:any) {
    this.file = event.target?.files[0];
  }

  updateImage() {
    this.showLoading = true;
    this.cdr.detectChanges();
    let model = {
        userId: this.userId,
        imagePath: this.file,
        id: this.imageId,
    }
    if (this.imageId == null) {
        let model2 = {
            userId: this.userId,
            imagePath: this.file,
        }
        this.userImageComponentService.addImage(model2)
            .finally(() => this.showLoading = false); // Yükleme tamamlandığında göstergesini kapat
    } else {
        this.userImageComponentService.updateImage(model)
            .finally(() => this.showLoading = false); // Yükleme tamamlandığında göstergesini kapat
    }
}

  async getImage(id: string) {
    var userImage = (await this.userImageComponentService.getImagesByUserId(id))
    this.imageId = userImage.id
  }

  userUpdateForms() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.name],
      surname: [this.user.surname],
      email: [this.user.email,Validators.required],
      title: [this.user.title],
      status: [this.user.status],
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.email = userModel.email.trim();
      this.userComponentService.updateUser(userModel)
    } else {
      this.toastrService.error(this.lang.anErrorOccurredDuringTheUpdateProcess);
    }
  }
}
