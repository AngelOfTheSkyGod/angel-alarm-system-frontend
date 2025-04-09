import {Box, Stack, Typography} from "@mui/material";
import {TimeSelectionSlider} from "./TimeSelectionSlider.tsx";
import {ConfigurationCell} from "./ConfigurationCell.tsx";
import {DaysCards} from "./DaysCards.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";

interface GeneralAlarmConfigurationProps {
    hour: number;
    setHour: (value: number) => void;
    minute: number;
    setMinute: (value: number) => void;
    timeOfDay: number;
    setTimeOfDay: (timeOfDay: number) => void;
    setCurrentState: (state: string) => void;
    selectedAlarm: AlarmDataRowData;
}
export const GeneralAlarmConfiguration = ({hour, setHour, minute, setMinute, timeOfDay, setTimeOfDay, setCurrentState, selectedAlarm} : GeneralAlarmConfigurationProps) => {
    const timeOfDays = ["am", "pm"];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];//to do organize in a way that my time is the one that is at the start of the array
    const minutes = Array.from({ length: 60 }, (_, index) => index);
    return (
        <Stack>
            <Stack direction={"row"} justifyContent={"center"} style={{height: "50vh"}}>
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
                        top: "40.5%",
                        left: "25%",
                        width: "50%",
                        height: "1.5rem",
                        backgroundColor: "gray"
                    }}
                />
            </Stack>
            <Box sx={{p: 2, border: '1px solid grey'}}>
                <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Stack justifyContent={"center"} alignItems={"end"}>
                        <Typography component="h1" variant="h5">repeat</Typography>
                        <Typography component="h1" variant="h5">label</Typography>
                        <Typography component="h1" variant="h5">sound</Typography>
                    </Stack>
                    <Stack justifyContent={"center"} alignItems={"start"}>
                        <ConfigurationCell configurationLabel={""} child={<DaysCards data={selectedAlarm}/>}
                                           configurationFunction={() => {
                                               setCurrentState("days-configuration-page")
                                           }}/>
                        <ConfigurationCell configurationLabel={selectedAlarm.description} configurationFunction={() => {
                            setCurrentState("description-configuration-page")
                        }}/>
                        <ConfigurationCell configurationLabel={selectedAlarm.sound} configurationFunction={() => {
                            setCurrentState("sound-configuration-page")
                        }}/>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}