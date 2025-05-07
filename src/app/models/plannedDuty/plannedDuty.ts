import { EmployeeDto } from "../employee/employeeDto";
import { Task } from "../task";

export interface PlannedDuty{
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