import { Injectable } from '@angular/core';
import { ErrorLogService } from '../common/error-log.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogComponentService {

  constructor(private errorLogService:ErrorLogService) { }
  async getAllErrorLog(){
    const observable= this.errorLogService.getAllErrorLog()
    return  (await firstValueFrom(observable)).data
  }
}
