import { Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useEffect, useState} from "react";
import {GeneralAlarmConfiguration} from "./GeneralAlarmConfiguration.tsx";
import DaysAlarmConfiguration from "./DaysAlarmConfiguration.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import {useNavigate} from "react-router-dom";
import AlarmLabelConfiguration from "./AlarmLabelConfiguration.tsx";
import AlarmSoundConfiguration from "./AlarmSoundConfiguration.tsx";
import {getAlarmTimeData} from "../../../utilities/utils.ts";


export const ConfigureAlarmsPage = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = Number(searchParams.get('alarmKey') ?? -1);
    const {appData, updateAppData} = useAppDataContext();
    const [configuredAlarms, setConfiguredAlarms] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const selectedAlarm: undefined | AlarmDataRowData = alarmKey === -1 ? undefined : configuredAlarms.filter((alarm) => alarm?.key === alarmKey)[0];
    const [hours = "0", minutes = "0", meridian = "0"] = getAlarmTimeData(selectedAlarm);
    console.log(`hours: ${hours} minutes: ${minutes} meridian: ${meridian}`, "configured data: " , configuredAlarms);
    const [hour, setHour] = useState<number>(Number(hours) - 1);
    const [minute, setMinute] = useState<number>(Number(minutes));
    const [timeOfDay, setTimeOfDay] = useState<number>(meridian === "am" ? 1 : 0);
    const [currentState, setCurrentState] = useState<string>("general-configure-page");
    const [alarmCopy, setAlarmCopy] = useState<AlarmDataRowData[]>(JSON.parse(JSON.stringify(appData?.alarmData)));
    const navigate = useNavigate();
    const isAddAlarm = window.location.pathname.includes("/addAlarm");
    const navigateLogic = () => {
        if (currentState !== "general-configure-page") {
            setCurrentState("general-configure-page");
        }else{
            navigate(`/alarm`);
        }
    }
    useEffect(() => {
        const addNewAlarm = () => {
            const newData = configuredAlarms;
            const newKey = newData.length;
            const newAlarmData: AlarmDataRowData = {
                time: "6:05am",
                days: [],
                description: "label",
                key: newKey,
                sound: "default timbre",
                active: true
            }
            searchParams.set("alarmKey", String(newKey));
            navigate(`/alarm/addAlarm?${searchParams.toString()}`);
            newData.push(newAlarmData);
            setAlarmCopy(newData);
            setConfiguredAlarms(newData);
            setHour(5);
            setMinute(5);
            setTimeOfDay(1);
        }
        if ((isAddAlarm && !searchParams.has("alarmKey")) || (searchParams.has("alarmKey") && !configuredAlarms.some((value) => value.key === Number(searchParams.get("alarmKey"))))){
            addNewAlarm()
        }
    }, [configuredAlarms, isAddAlarm, navigate, searchParams]);
    const completeSubmit = () => {
        navigateLogic();
        if (currentState === "general-configure-page") {
            const newAlarms = configuredAlarms;
            newAlarms[alarmKey ?? 0] = {...configuredAlarms[alarmKey], time: `${hour + 1}:${minute < 10 ? `0${minute}` : minute}${timeOfDay === 0 ? "pm" : "am"}`};
            updateAppData({...appData, alarmData: newAlarms});
        }else{
            setConfiguredAlarms(JSON.parse(JSON.stringify(alarmCopy)));
        }
    }

    const completeCancel = () => {
        navigateLogic();
        setAlarmCopy(JSON.parse(JSON.stringify(configuredAlarms)));
    }
    console.log("app data:",  appData, " configured alarms:", configuredAlarms);
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