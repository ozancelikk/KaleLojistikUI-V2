import { EmployeeDto } from "../employee/employeeDto";
import { Task } from "../task";

export interface DutyDetail {
    id: string;
    roomName: string;
    blockName: string;
    branchName: string;
    hallwayName: string;
    floorName: string;
    employeeName: EmployeeDto[];
    createdUserId:string;
    status: boolean;
    createdDate: string;
    dutyStartDate: string;
    dutyEndDate: string;
    dutyTitle: string;
    dutyTag: string
    task: Task[]
    startTime:string;
    endTime:string;
    dldDescription:string;
}