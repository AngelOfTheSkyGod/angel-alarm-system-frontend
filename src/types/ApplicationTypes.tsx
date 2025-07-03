export interface AASData {
    username: string;
    password: string;
    alarmData: AlarmDataRowData[];
}


export interface AlarmDataRowData {
    time: string;
    days: string[];
    description: string;
    key: number;
    sound: string;
    active: boolean;
}