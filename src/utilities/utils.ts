import {AlarmDataRowData, CalendarDataRowData} from "../types/ApplicationTypes.tsx";
import {Dispatch, SetStateAction} from "react";

export const areObjectsEqualDeep = (obj1: any, obj2: any): boolean => {
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key) || !areObjectsEqualDeep(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}


export const getPageType = (name: string) => {
    if (name.includes("alarm")){
        return "alarm";
    }else if (name.includes("slideshow")){
        return "slideshow";
    }else{
        return "calendar";
    }
}

export const getElementTiles = (elementsArray: (string | number)[], currentSelection: number): (string | number)[] => {
    const elements = [];
    if (elementsArray.length > 3) {
        for (let index = currentSelection - 2; index <= currentSelection + 2; index++) {
            if (index > elementsArray.length - 1) {
                elements.push(elementsArray[index - elementsArray.length]);
            } else if (index < 0) {
                elements.push(elementsArray[index + elementsArray.length]);

            } else {
                elements.push(elementsArray[index]);
            }
        }
    } else {
        elements.push(elementsArray[currentSelection], elementsArray[currentSelection + 1 > elementsArray.length - 1 ? 0 : elementsArray.length - 1])
    }
    return elements;
}

export const abbreviatedDaysArray = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];

export const dayToAbbreviation = (day:string) :string => {
    switch (day) {
        case 'Monday':
            return "M"
        case 'Tuesday':
            return "Tu"
        case 'Wednesday':
            return "W"
        case 'Thursday':
            return "Th"
        case 'Friday':
            return "F"
        case 'Saturday':
            return "Sa"
        case 'Sunday':
            return "Su"
        default:
            return ""
    }
}

export const abbreviationToDay = (day:string) :string => {
    switch (day) {
        case 'M':
            return "Monday"
        case 'Tu':
            return "Tuesday"
        case 'W':
            return "Wednesday"
        case 'Th':
            return "Thursday"
        case 'F':
            return "Friday"
        case 'Sa':
            return "Saturday"
        case 'Su':
            return "Sunday"
        default:
            return ""
    }
}

export const getAlarmTimeData = (time:AlarmDataRowData | undefined):(string | undefined)[] => {
    if (time === undefined || time.time.length == 0) return [""];
    const hour = time?.time.split(":")?.[0];
    const minute = time?.time.split(":")?.[1]?.slice(0, 2);
    const meridian = time?.time.split(":")?.[1].slice(2, 4);
    if (hour === '12' && meridian === 'am'){
        return ['0',  minute, 'am']
    }else if (hour === '12' && meridian === 'pm'){
        return ['0',  minute, 'pm']
    }
    return [time?.time.split(":")[0], time?.time.split(":")[1].slice(0, 2), time?.time.split(":")[1].slice(2, 4)];
}

export const getDayPrefix = (day: string) => {
    return `${Number(day) >=  10? day : `0${day}`}`
}

export const sortTime = (timeA:AlarmDataRowData, timeB:AlarmDataRowData):number => {
    const [hoursA = "0", minutesA = "0", meridianA = "0"] = timeA?.time !== "" ? getAlarmTimeData(timeA) : [0, 0, "am"];
    const [hoursB = "0", minutesB = "0", meridianB = "0"] = timeB?.time !== "" ? getAlarmTimeData(timeB) : [0, 0, "am"];
    const timeOfDayA = meridianA === "am" ? 0 : 1;
    const timeOfDayB = meridianB === "am" ? 0 : 1

    if ((timeOfDayA > timeOfDayB) || (timeOfDayA >= timeOfDayB && Number(hoursA) > Number(hoursB)) || (timeOfDayA >= timeOfDayB && Number(hoursA) >= Number(hoursB) && Number(minutesA) > Number(minutesB))){
        return 1
    }else if ((timeOfDayA < timeOfDayB) || (timeOfDayA <= timeOfDayB && Number(hoursA) < Number(hoursB)) || (timeOfDayA <= timeOfDayB && Number(hoursA) <= Number(hoursB) && Number(minutesA) < Number(minutesB))){
        return -1;
    }
    return 0;
}

export const sortDate = (dateA: CalendarDataRowData, dateB: CalendarDataRowData) => {
    const yearA = Number(dateA?.year);
    const monthA = Number(dateA?.month);
    const dayA = Number(dateA?.day);
    const timeA: AlarmDataRowData = {active: false, days: [], description: "", key: 0, sound: "", time: dateA?.time};
    const yearB = Number(dateB?.year);
    const monthB = Number(dateB?.month);
    const dayB = Number(dateB?.day);
    const timeB: AlarmDataRowData = {active: false, days: [], description: "", key: 0, sound: "", time: dateB?.time};
    if ((yearA < yearB) || (yearA <= yearB && monthA < monthB) || (yearA <= yearB && monthA <= monthB && dayA < dayB) || (yearA <= yearB && monthA <= monthB && dayA <= dayB && sortTime(timeA, timeB) == -1)) {
        return -1;
    } else if ((yearA > yearB) || (yearA >= yearB && monthA > monthB) || (yearA >= yearB && monthA >= monthB && dayA > dayB) || (yearA <= yearB && monthA <= monthB && dayA <= dayB && sortTime(timeA, timeB) == 1)) {
        return 1;
    }
    // a must be equal to b
    return 0;
}


export const deleteItem = (event: React.MouseEvent, updatedData: AlarmDataRowData[] | CalendarDataRowData[], setUpdatedData:Dispatch<SetStateAction<AlarmDataRowData[]>> | Dispatch<SetStateAction<CalendarDataRowData[]>>, data: AlarmDataRowData | CalendarDataRowData) => {
    const otherAlarms: any =  updatedData.filter((item) => (!areObjectsEqualDeep(item, data) && item.key !== data.key)).flatMap((item, index) => ({...item, key: index}));
    setUpdatedData(otherAlarms);
    event.stopPropagation();
}
