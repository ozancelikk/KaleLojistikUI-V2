import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hallway } from '../../../models/hallway/hallway';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { HallwayComponentService } from '../../../services/component/hallway-component.service';

@Component({
  selector: 'app-qr-code-hallway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-code-hallway.component.html',
  styleUrl: './qr-code-hallway.component.css'
})
export class QrCodeHallwayComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  hallway: Hallway;
  qrCodePath: any;
  @Input() set qrCode(value: any) {
    if (!value) {return}
    this.hallway = value;
    this.getQrCodeImage(this.hallway.id);
  }
  constructor(private hallwayComponentService:HallwayComponentService){}
  async getQrCodeImage(id:string){
    this.qrCodePath=(await this.hallwayComponentService.getByQrCodeImage(id))
    this.getImagePath()
  }
  getImagePath(): string {
    if (this.qrCodePath) {
      let url: string = this.qrCodePath;
      return url;
    }
    let url2="assets/img/noimage.jpg";
    return url2
  }
  downloadQrCode(){
    let a = document.createElement('a');
    a.href = this.qrCodePath;
    a.download = this.hallway.hallwayName+'_qrCode.png';
    a.click();
  }

}
