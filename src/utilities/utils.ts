import {AlarmDataRowData} from "../types/ApplicationTypes.tsx";

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

export const getAlarmTimeData = (time:AlarmDataRowData | undefined):(string | undefined)[] => {
    return [time?.time.split(":")[0], time?.time.split(":")[1].slice(0, 2), time?.time.split(":")[1].slice(2, 4)];
}
export const sortTime = (timeA:AlarmDataRowData, timeB:AlarmDataRowData):number => {
    const [hoursA = "0", minutesA = "0", meridianA = "0"] = getAlarmTimeData(timeA);
    const [hoursB = "0", minutesB = "0", meridianB = "0"] = getAlarmTimeData(timeB);
    const timeOfDayA = meridianA === "am" ? 0 : 1;
    const timeOfDayB = meridianB === "am" ? 0 : 1;

    if ((timeOfDayA < timeOfDayB) || (Number(hoursA) < Number(hoursB)) || (Number(minutesA) < Number(minutesB))){
        return -1
    }else if ((timeOfDayB < timeOfDayA) || (Number(hoursB) < Number(hoursA)) || (Number(minutesB) < Number(minutesA))){
        return 1;
    }
    return 0;

}