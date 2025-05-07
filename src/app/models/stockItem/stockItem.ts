import { Room } from "../room/room"

export interface StockItem{
    id:string
    productId:string
    quantity:string
    entryDate:string
    description:string
    roomId:Room[];
    employeeId:string
    departmentId:string
}