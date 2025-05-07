import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ILanguage } from '../../../../assets/locales/ILanguage';
import { Languages } from '../../../../assets/locales/language';
import { RoomComponentService } from '../../../services/component/room-component.service';
import { RoomDetail } from '../../../models/room/roomdetail';

@Component({
  selector: 'app-detail-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-room.component.html',
  styleUrl: './detail-room.component.css'
})
export class DetailRoomComponent {

  @Input() set roomDetail(value: any) {
    if (!value) return
    this.getDetailsByRoom(value)
  }
  qr:any
  roomDetails:RoomDetail
  lang: ILanguage = Languages.lngs.get(localStorage.getItem("lng"));

  constructor(private roomComponentService:RoomComponentService){}

  async getDetailsByRoom(id:string){
    this.roomDetails=(await this.roomComponentService.getDetailsByRoom(id))
    this.getQrCodeImage(id)
  }
  
  async getQrCodeImage(id:string){
    this.qr=(await this.roomComponentService.getByQrCodeImage(id))
    this.getImagePath()
  }
  getImagePath(): string {
    if (this.qr) {
      let url: string = this.qr;
      return url;
    }
    let url2=window["env"]["noImage"];
    return url2
  }
}
