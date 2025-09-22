import {Box, Stack, Typography} from "@mui/material";
import {ConfigurationCell} from "./ConfigurationCell.tsx";
import {DaysCards} from "./DaysCards.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {TimeSelector} from "./TimeSelector.tsx";

interface GeneralAlarmConfigurationProps {
    hour: number;
    setHour: (value: number) => void;
    minute: number;
    setMinute: (value: number) => void;
    timeOfDay: number;
    setTimeOfDay: (timeOfDay: number) => void;
    setCurrentState: (state: string) => void;
    selectedAlarm: AlarmDataRowData | undefined;
}
export const GeneralAlarmConfiguration = ({hour, setHour, minute, setMinute, timeOfDay, setTimeOfDay, setCurrentState, selectedAlarm} : GeneralAlarmConfigurationProps) => {
    return (
        <Stack>
            <TimeSelector timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} stackHeight={"40vh"} highlighterPosition={"18.4vh"} />
            <Box sx={{p: 2, border: '.1rem solid grey'}} overflow={"auto"} borderRadius={"2rem"}>
                <Stack direction={"row"} gap={"2rem"} justifyContent={"space-evenly"}>
                    <Stack justifyContent={"start"} alignItems={"end"}>
                        <Typography component="h1" variant="h5">repeat</Typography>
                        <Typography component="h1" variant="h5">label</Typography>
                        <Typography component="h1" variant="h5">sound</Typography>
                    </Stack>
                    <Stack justifyContent={"start"} alignItems={"end"}>
                        <ConfigurationCell configurationLabel={""} child={<DaysCards data={selectedAlarm}/>}
                                           configurationFunction={() => {
                                               setCurrentState("days-configuration-page")
                                           }}/>
                        <ConfigurationCell configurationLabel={selectedAlarm?.description} configurationFunction={() => {
                            setCurrentState("description-configuration-page")
                        }}/>
                        <ConfigurationCell configurationLabel={selectedAlarm?.sound} configurationFunction={() => {
                            setCurrentState("sound-configuration-page")
                        }}/>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}