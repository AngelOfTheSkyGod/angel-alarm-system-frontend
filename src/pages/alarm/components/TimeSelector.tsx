import {Box, Stack} from "@mui/material";
import {TimeSelectionSlider} from "./TimeSelectionSlider.tsx";

interface TimeSelectorProps {
    hour: number;
    setHour: (value: number) => void;
    minute: number;
    setMinute: (value: number) => void;
    timeOfDay: number;
    setTimeOfDay: (timeOfDay: number) => void;
    stackHeight?: string;
    highlighterPosition?: string;
}
export const TimeSelector = ({hour, setHour, minute, setMinute, timeOfDay, setTimeOfDay, stackHeight, highlighterPosition}: TimeSelectorProps) => {

    const timeOfDays = ["am", "pm"];
    const hours: (string | number)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];//to do organize in a way that my time is the one that is at the start of the array
    const minutes: (string | number)[] = Array.from({ length: 60 }, (_, index) => index);
    return (<Stack direction={"row"} justifyContent={"center"} style={{height: stackHeight ?? "50vh"}} position={"relative"}>
        <TimeSelectionSlider currentSelection={hour} setCurrentSelection={setHour} elementsArray={hours}/>
        <TimeSelectionSlider currentSelection={minute} setCurrentSelection={setMinute}
                             elementsArray={minutes}/>
        <TimeSelectionSlider currentSelection={timeOfDay} setCurrentSelection={setTimeOfDay}
                             elementsArray={timeOfDays}/>
        <Box
            zIndex={0}
            borderRadius={"2rem"}
            sx={{
                position: "absolute",
                top: highlighterPosition ?? "23.4vh",
                left: "25%",
                width: "50%",
                minHeight:"3vh",
                height: "1.5rem",
                backgroundColor: "gray"
            }}
        />
    </Stack>)
}