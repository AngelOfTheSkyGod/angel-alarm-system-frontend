import {Box, Container, IconButton, Stack, Typography} from "@mui/material";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {TimeSelectionSlider} from "./TimeSelectionSlider.tsx";
import {useState} from "react";
import {DaysCards} from "./DaysCards.tsx";
import {ConfigurationCell} from "./ConfigurationCell.tsx";


export const ConfigureAlarmsPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const {appData} = useAppDataContext();
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [timeOfDay, setTimeOfDay] = useState<number>(0);
    const timeOfDays = ["am", "pm"];
    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const minutes = Array.from({ length: 60 }, (_, index) => index);
    const selectedAlarm: AlarmDataRowData = appData.alarmData.filter((alarm) => String(alarm.key) === alarmKey)[0];
    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content", position:"relative"}}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton aria-label="cancel icon" onClick={() => {}}>
                        <ArrowBackIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="apply changes icon" onClick={() => {}}>
                        <CheckCircleOutlineIcon fontSize={"large"}/>
                    </IconButton>
                </Stack>
                <Stack direction={"row"} justifyContent={"center"}>
                    <TimeSelectionSlider currentSelection={hour} setCurrentSelection={setHour} elementsArray={hours}/>
                    <TimeSelectionSlider currentSelection={minute} setCurrentSelection={setMinute} elementsArray={minutes}/>
                    <TimeSelectionSlider currentSelection={timeOfDay} setCurrentSelection={setTimeOfDay} elementsArray={timeOfDays}/>
                    <Box
                        zIndex={0}
                        borderRadius={"2rem"}
                        sx={{
                            position: "absolute",
                            top: "36.75%",
                            left: "25%",
                            width: "50%",
                            height: "1.5rem",
                            backgroundColor: "gray"
                        }}
                    />
                </Stack>
                <Box sx={{ p: 2, border: '1px solid grey' }}>
                    <Stack direction={"row"} justifyContent={"space-evenly"}>
                        <Stack justifyContent={"center"} alignItems={"end"}>
                            <Typography component="h1" variant="h5">repeat</Typography>
                            <Typography component="h1" variant="h5">label</Typography>
                            <Typography component="h1" variant="h5">sound</Typography>
                        </Stack>
                        <Stack justifyContent={"center"} alignItems={"start"}>
                            <ConfigurationCell configurationLabel={""} child={<DaysCards data={selectedAlarm}/>} configurationFunction={() => {}}/>
                            <ConfigurationCell configurationLabel={selectedAlarm.description} configurationFunction={() => {}}/>
                            <ConfigurationCell configurationLabel={selectedAlarm.sound} configurationFunction={() => {}}/>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </ApplicationContainer>
    )
}