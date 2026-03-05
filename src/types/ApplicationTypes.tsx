export interface LoginData {
    username: string;
    password: string;
    userIdentifier: string;
}
export interface AASData extends LoginData{
    alarmData: AlarmDataRowData[] | null;
    calendarData: CalendarDataRowData[] | null;
    slideShowData?: SlideShowPictureData[] | null;
    slideShowImageCount?: number;
    slideShowPageCount?: number;
}

export interface SlideShowRequest extends LoginData{
    pageNumber: number;
    startNumber: number;
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
    fileName: string;
}


export interface SlideShowPictureDataWithBlob{
    imageData: SlideShowPictureData;
    imageBlob: Blob;
}

export interface ConfigContextProps {
    baseUrl:string;
}

export interface SlideShowData{
    imageCount: number;
    imageList: SlideShowPictureData[];
    pageNumber: number;
}

export interface AddImageRequest extends LoginData{
    imageDataUrl: string;
    fileName: string;
}

export interface DeleteImageRequest extends LoginData{
    imagesDeleted: number[];
    pageNumber: number;
}

export interface ImageRequestResponse {
    imageCount: number;
    success: boolean;
}

export interface LoginConnectResponse extends LoginData{
    alarmData: AlarmDataRowData[] | null;
    calendarData: CalendarDataRowData[] | null;
}
