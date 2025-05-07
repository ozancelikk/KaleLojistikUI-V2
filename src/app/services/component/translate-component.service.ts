import { Injectable } from '@angular/core';
import { TranslateService } from '../common/translate.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateComponentService {

  constructor(private translateService:TranslateService) { }
  async translate(sourceText:string,languFrom:string,languTo:string){
    const observable =this.translateService.translate(sourceText,languFrom,languTo)
    const response=(await firstValueFrom(observable))
    return response
  }
}
