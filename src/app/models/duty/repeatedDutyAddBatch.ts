export interface RepeatedDutyAddBatch{
    id:string
    status:boolean
    reminderTime:number
    dutyId:string[];
    nextRunTime:number
    startTime:string
    finishTime:string
}