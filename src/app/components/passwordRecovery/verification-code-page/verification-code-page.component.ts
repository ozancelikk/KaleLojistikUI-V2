import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { UserAuthComponentService } from '../../../services/component/user/user-auth-component.service';
import { LanguageComponentService } from '../../../services/component/language-component.service';

@Component({
  selector: 'app-verification-code-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-code-page.component.html',
  styleUrl: './verification-code-page.component.css'
})
export class VerificationCodePageComponent {
  lang: ILanguage = Languages.lngs.get(localStorage.getItem('lng'));
  key: string;
  mail: string;
  countdownTime: number = 180; // 3 minutes
  countdownActive: boolean = false;
  countdownExpired: boolean = false;

  constructor(private authService: UserAuthComponentService,private router:Router,private languageComponentService:LanguageComponentService) { }
  ngOnInit(): void {
    this.getMail();
    this.startCountdown();
  }
  async checkKey() {
    if (this.key != null) {
      (await this.authService.checkKey(this.mail, this.key))
    }
  }
  onChange(event: any) {
    this.key = event.target.value;
  }
  getMail() {
    this.mail = localStorage.getItem("mail");
  }
  sendVerificationCode() {
    this.startCountdown();
  }
  startCountdown() {
    this.countdownActive = true;

    const countdownInterval = setInterval(() => {
      this.countdownTime--;

      if (this.countdownTime <= 0) {
        clearInterval(countdownInterval);
        this.countdownActive = false;
        this.countdownExpired = true;
      }
    }, 1000);
  }
  redirectToEmailPost() {
    if (this.countdownExpired) {
      this.router.navigate(['/email-post']);
    } else {
      console.log('Countdown has not expired yet.');
    }
  }

  get countdownTimeFormatted(): string {
    const minutes = Math.floor(this.countdownTime / 60);
    const seconds = this.countdownTime % 60;
    return `${this.lang.verificationCode}(${minutes}:${seconds < 10 ? '0' : ''}${seconds})`;
  }
  changeLanguage(language:string){
    localStorage.setItem("lng",language)
    this.languageComponentService.setLanguage(language)
    window.location.reload()
  }
}
