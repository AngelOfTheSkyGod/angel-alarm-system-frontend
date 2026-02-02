import {AASData} from "../types/ApplicationTypes.tsx";

export const initializeAASData = () :AASData => {
    return {
        userIdentifier: "",
        username: "",
        password: "",
        alarmData: null,
        calendarData: null,
        slideShowData: undefined
    }
}