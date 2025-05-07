import { Task } from "../task";
import { EmployeeDto } from "../employee/employeeDto";

export interface Duty{
    id:string;
    roomId:string;
    blockId:string;
    branchId:string;
    hallwayId:string;
    floorId:string;
    employeeId:EmployeeDto[];
    createdUserId:string;
    status:boolean;
    createdDate:string;
    dutyStartDate:string;
    dutyEndDate:string;
    dutyTitle:string;
    dutyTagId:string
    task:Task[]
    taskId:string;
    startTime:string;
    endTime:string;
   }