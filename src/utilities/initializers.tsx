import {AASData} from "../types/ApplicationTypes.tsx";

export const initializeAASData = () :AASData => {
    return {
        username: "",
        password: "",
        alarmData: [{
        time: "5:30am",
        days: ["M", "W", "Th"],
        description: "work",
            key:0
    },
        {time:"4:00pm", days: ["M", "T", "W"], description: "go to gym", key:1},
        {time:"6:00pm", days: ["M", "T", "W"], description: "commute", key:2},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:3},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:4},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:5},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:6},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:7},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:8},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:9},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:10},
        {time:"7:00pm", days: ["A"], description: "eat dinner", key:11},
    ]
    }
}