import {AASData} from "../types/ApplicationTypes.tsx";

export const initializeAASData = () :AASData => {
    return {
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
        ]
    }
}