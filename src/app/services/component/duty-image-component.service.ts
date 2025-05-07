import { Injectable } from '@angular/core';
import { DutyImageService } from '../common/duty-image.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DutyImageComponentService {

  constructor(private dutyImageSerice:DutyImageService) { }
  async getAfterImagesByDutyId(id:string){
    const observable =this.dutyImageSerice.getAfterImagesByDutyId(id)
    return (await firstValueFrom(observable)).data
  }
  async getBeforeImagesByDutyId(id:string){
    const observable =this.dutyImageSerice.getBeforeImagesByDutyId(id)
    return (await firstValueFrom(observable)).data
  }
}
