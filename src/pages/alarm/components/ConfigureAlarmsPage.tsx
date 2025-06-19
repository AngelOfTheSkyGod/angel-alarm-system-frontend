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
import AlarmLabelConfiguration from "./AlarmLabelConfiguration.tsx";
import AlarmSoundConfiguration from "./AlarmSoundConfiguration.tsx";


export const ConfigureAlarmsPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const {appData, updateAppData} = useAppDataContext();
    const [configuredAlarms, setConfiguredAlarms] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const selectedAlarm: AlarmDataRowData = configuredAlarms.filter((alarm) => String(alarm?.key) === alarmKey)[0];
    const [hours, minutes, meridian] = [selectedAlarm?.time.split(":")[0], selectedAlarm?.time.split(":")[1].slice(0, 2), selectedAlarm?.time.split(":")[1].slice(2, 4)];
    console.log(`hours: ${hours} minutes: ${minutes} meridian: ${meridian}`);
    const [hour, setHour] = useState<number>(Number(hours) - 1);
    const [minute, setMinute] = useState<number>(Number(minutes));
    const [timeOfDay, setTimeOfDay] = useState<number>(meridian === "am" ? 1 : 0);
    const [currentState, setCurrentState] = useState<string>("general-configure-page");
    const [alarmCopy, setAlarmCopy] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const navigate = useNavigate();
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
            const newAlarms = configuredAlarms;
            newAlarms[alarmKey] = {...configuredAlarms[alarmKey], time: `${hour + 1}:${minute}${timeOfDay === 0 ? "pm" : "am"}`};
            updateAppData({...appData, alarmData: newAlarms});
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
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content", position:"relative", padding: "0"}}>
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
                        {
                            currentState === "description-configuration-page" &&
                            <AlarmLabelConfiguration configuredAlarms={alarmCopy} setConfiguredAlarms={setAlarmCopy} />
                        }
                        {
                            currentState === "sound-configuration-page" &&
                            <AlarmSoundConfiguration configuredAlarms={alarmCopy} setConfiguredAlarms={setAlarmCopy} />
                        }
                    </Stack>
                }
            </Container>
        </ApplicationContainer>
    )
}