import { OperationClaim } from "../operationClaims/operaitonClaim";

export interface User{
    id:string;
    name:string;
    surname:string;
    email:string;
    title:string;
    operationClaims:OperationClaim[];
    status:boolean;
    phoneNumber:string;
}