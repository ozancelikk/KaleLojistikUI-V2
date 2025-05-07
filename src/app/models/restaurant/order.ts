export interface Order{
    id:string
    roomId:string
    menus:any[]
    status:boolean
    managementStatus:boolean
    totalPrice:number
    orderDate:string
}