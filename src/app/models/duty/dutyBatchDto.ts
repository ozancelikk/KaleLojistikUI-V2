import { EmployeeDto } from "../employee/employeeDto";
import { Task } from "../task";

export interface DutyBatchDto{
    id:string;
    roomId:string[];
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