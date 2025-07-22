export interface AASData {
    username: string;
    password: string;
    alarmData: AlarmDataRowData[];
    calendarData: CalendarDataRowData[];
}


export interface AlarmDataRowData {
    time: string;
    days: string[];
    description: string;
    key: number;
    sound: string;
    active: boolean;
}

export interface CalendarDataRowData{
    month:string;
    day:string;
    year:string;
    description:string;
    time:string;
    dayOfTheWeek: string;
    key:number;
    active?:boolean;
}