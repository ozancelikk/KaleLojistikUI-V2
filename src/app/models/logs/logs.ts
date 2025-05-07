import { LogMessage } from "./logMessage";

export interface Logs{
    id:string;
    date:string;
    time:string;
    eventId:string;
    level:string;
    guid:string;
    logUIMessage:string;
    message:LogMessage[];
    }