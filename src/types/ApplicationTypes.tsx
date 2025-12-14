export interface LoginData {
    username: string;
    password: string;
    userIdentifier: string;
}
export interface AASData extends LoginData{
    alarmData: AlarmDataRowData[];
    calendarData: CalendarDataRowData[];
    slideShowData: SlideShowPictureData[];
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

export interface SlideShowPictureData{
    imageDataUrl: string;
}


export interface SlideShowPictureDataWithBlob{
    imageDataUrl: string;
    imageBlob: Blob;
}

export interface ConfigContextProps {
    baseUrl:string;
}

export interface SlideShowData{
    imageCount: number;
    imageList: string[];
}

export interface AddImageRequest extends LoginData{
    imageDataUrl: string;
}

export interface imageRequestResponse {
    imageCount: number;
    success: boolean;
}
