import { Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useState} from "react";
import {GeneralAlarmConfiguration} from "./GeneralAlarmConfiguration.tsx";
import DaysAlarmConfiguration from "./DaysAlarmConfiguration.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import {useNavigate} from "react-router-dom";


export const ConfigureAlarmsPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const {appData, updateAppData} = useAppDataContext();
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [timeOfDay, setTimeOfDay] = useState<number>(0);
    const [currentState, setCurrentState] = useState<string>("general-configure-page");
    const [configuredAlarms, setConfiguredAlarms] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const [alarmCopy, setAlarmCopy] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const navigate = useNavigate();
    const selectedAlarm: AlarmDataRowData = configuredAlarms.filter((alarm) => String(alarm?.key) === alarmKey)[0];
    const navigateLogic = () => {
        if (currentState !== "general-configure-page") {
            setCurrentState("general-configure-page");
        }else{
            navigate(`/alarm`);
        }
    }
    const completeSubmit = () => {
        navigateLogic();
        if (currentState === "general-configure-page") {
            updateAppData({...appData, alarmData: configuredAlarms});
        }else{
            setConfiguredAlarms(JSON.parse(JSON.stringify(alarmCopy)));
        }
    }

    const completeCancel = () => {
        navigateLogic();
        console.log('configured alarms: ', configuredAlarms);
        setAlarmCopy(JSON.parse(JSON.stringify(configuredAlarms)));
    }
    console.log("app data:",  appData);
    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content", position:"relative"}}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton aria-label="cancel icon" onClick={() => completeCancel()}>
                        <ArrowBackIcon fontSize={"large"}/>
                    </IconButton>
                    <IconButton aria-label="apply changes icon" onClick={() => completeSubmit()}>
                        <CheckCircleOutlineIcon fontSize={"large"}/>
                    </IconButton>
                </Stack>
                {
                    <Stack justifyContent={"center"} style={{height: "60vh", width: "100%"}}>
                        {
                            currentState === "general-configure-page" &&
                            <GeneralAlarmConfiguration hour={hour} setHour={setHour} minute={minute} setMinute={setMinute}
                                                       timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} setCurrentState={setCurrentState} selectedAlarm={selectedAlarm}/>
                        }
                        {
                            currentState === "days-configuration-page" &&
                            <DaysAlarmConfiguration configuredAlarms={alarmCopy} setConfiguredAlarms={setAlarmCopy}/>
                        }
                    </Stack>
                }
            </Container>
        </ApplicationContainer>
    )
}