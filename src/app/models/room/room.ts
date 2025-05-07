import { AdditionalTask } from "../additionalTask/additionalTask";
import { Task } from "../task";

export interface Room{
    id:string;
    roomName:string;
    roomDescription:string;
    floorId:string;
    hallwayId:string;
    blockId:string;
    branchId:string;
    roomNumber:string;
    qrCodeAdress:string;
    status:string;
   }