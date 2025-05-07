import { Injectable } from '@angular/core';
import { TechnicalErrorImageService } from '../common/technical-error-image.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicalErrorImageComponentService {

  constructor(private technicalErrorImageService:TechnicalErrorImageService) { }

  async getImagesByTechnicalErrorId(id:string){
    const observable =this.technicalErrorImageService.getImagesByTechnicalErrorId(id)
    return (await firstValueFrom(observable)).data
  }
}
