import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { UserAuthComponentService } from '../../../services/component/user/user-auth-component.service';
import { LanguageComponentService } from '../../../services/component/language-component.service';

@Component({
  selector: 'app-email-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-post.component.html',
  styleUrl: './email-post.component.css'
})
export class EmailPostComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));
  mail:string
  constructor(private authService:UserAuthComponentService,private languageComponentService:LanguageComponentService){}
  async sendEmail() {
    if (this.mail!=null) {
      (await this.authService.forgotPassword(this.mail))
    }
  }
  onChange(event:any) {
    this.mail = event.target.value;
  }

  changeLanguage(language:string){
    localStorage.setItem("lng",language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
}
