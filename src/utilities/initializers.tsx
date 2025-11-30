import {AASData} from "../types/ApplicationTypes.tsx";
import {luffyImage} from "./Images.tsx";

export const initializeAASData = () :AASData => {
    return {
        userIdentifier: "",
        username: "",
        password: "",
        alarmData: [{
            time: "5:30am", days: ["M", "W", "Th"], description: "work", key:0, sound:"default timbre", active: true},
            {time:"4:00pm", days: ["M", "T", "W"], description: "go to gym", key:1, sound:"default timbre", active: true},
            {time:"6:00pm", days: ["M", "T", "W"], description: "commute", key:2, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:3, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:4, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:5, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:6, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:7, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:8, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:9, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:10, sound:"default timbre", active: true},
            {time:"7:00pm", days: ["A"], description: "eat dinner", key:11, sound:"default timbre", active: true},
            {time:"6:05am", days: ["M", "T", "W"], description: "go to gym", key:12, sound:"default timbre", active: true},
            {time:"6:04am", days: ["M", "T", "W"], description: "go to gym", key:13, sound:"default timbre", active: true},
            {time:"5:34am", days: ["M", "T", "W"], description: "go to gym", key:14, sound:"default timbre", active: true}
        ],
        calendarData:[
            {month: "8", day: "25", year: "1971", time: "5:30pm", description: "Mom's Birth", dayOfTheWeek: "W", key:0},
            {month: "12", day: "18", year: "2000", time: "5:30pm", description: "My Birth", dayOfTheWeek: "M", key:1},
            {month: "11", day: "12", year: "2003", time: "5:30pm", description: "Sister's Birth", dayOfTheWeek: "W", key:2},
            {month: "12", day: "28", year: "2025", time: "1:30am", description: "Dinner with Ahmed", dayOfTheWeek: "Su", key:3},
            {month: "12", day: "8", year: "2025", time: "2:30pm", description: "Dinner with Trevor", dayOfTheWeek: "M", key:4},
            {month: "12", day: "3", year: "2025", time: "4:30pm", description: "Dinner with Filip", dayOfTheWeek: "W", key:5},
            {month: "12", day: "18", year: "2025", time: "", description: "My Birthday", dayOfTheWeek: "Th", key:6},
            {month: "12", day: "18", year: "2025", time: "3:00pm", description: "schedule PTO", dayOfTheWeek: "Th", key:7},
            {month: "12", day: "18", year: "2025", time: "11:59am", description: "late lunch PTO", dayOfTheWeek: "Th", key:8},
            {month: "12", day: "18", year: "2025", time: "1:00pm", description: "late lunch PTO", dayOfTheWeek: "Th", key:9},
            {month: "12", day: "18", year: "2025", time: "12:01pm", description: "late lunch PTO", dayOfTheWeek: "Th", key:10},
            {month: "12", day: "18", year: "2025", time: "12:01am", description: "late lunch PTO", dayOfTheWeek: "Th", key:11},
            {month: "8", day: "25", year: "2025", time: "", description: "Mom's Birthday", dayOfTheWeek: "M", key:13}
        ],
        slideShowData:[
            {
                imageArray: luffyImage
            }
        ]
    }
}