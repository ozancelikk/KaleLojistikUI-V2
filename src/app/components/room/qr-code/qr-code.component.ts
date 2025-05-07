import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Room } from '../../../models/room/room';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {
  lang:ILanguage=Languages.lngs.get(localStorage.getItem("lng"));
  room: Room;
  qrCodePath: any;
  @Input() set qrCode(value: any) {
    if (!value) {return}
    console.log(value);
    
    this.room = value;
    this.getQrCodeImage(this.room.id);
  }
  constructor(private roomComponentService:RoomComponentService){}
  async getQrCodeImage(id:string){
    this.qrCodePath=(await this.roomComponentService.getByQrCodeImage(id))
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
    a.download = this.room.roomName+'_qrCode.png';
    a.click();
  }

}
