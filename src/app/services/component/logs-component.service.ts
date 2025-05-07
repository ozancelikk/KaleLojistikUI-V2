import { Injectable } from '@angular/core';
import { LogsService } from '../common/logs.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsComponentService {

  constructor(private logsService:LogsService) { }

  async getAllLogs(){
    const observable= this.logsService.getAllLogs()
    return( await firstValueFrom(observable)).data
  }
}
