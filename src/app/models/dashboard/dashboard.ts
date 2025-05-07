export interface Dashboard {
    id:string;
    employeeCount:number;
    dutyCount:number;
    weeklyDutyCount:number;
    mounthlyDutyCount:number;
    yearDutyGraficValue:number[];
    weeklyDutyGraficValue:number[];
    dailyDutyGraficValue:number[];
    yearlyDutyValue:number[];
}