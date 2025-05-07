import { WorkAccidentAdmin } from "./workAccidentAdmin";

export interface WorkAccident{
    id:string
    identificationNumber:string;
    insuranceRegistrationNumber:string;
    employeeId:string
    fatherName:string
    birthDay:string
    placeOfBirth:string
    mission:string
    dateOfStart:string
    accidentDate:string
    numberOfEmployees:string
    workingStartDate:string
    address:string
    phoneNumber:string
    lossOfLimb:boolean
    LossOfLimbText:string;
    description:string
    workAccidentAdmin:WorkAccidentAdmin[]
}