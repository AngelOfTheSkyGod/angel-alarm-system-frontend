import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import React, {useState} from "react";
import {CalendarDataRowData} from "../../../types/ApplicationTypes.tsx";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import {Alert, Container, Stack, TextField} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {ApplicationConfigurationButtons} from "../../../components/ApplicationConfigurationButtons.tsx";
import {useNavigate} from "react-router-dom";
import {abbreviatedDaysArray, getAlarmTimeData} from "../../../utilities/utils.ts";
import {TimeSelector} from "../../alarm/components/TimeSelector.tsx";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import {PickerValue} from "@mui/x-date-pickers/internals";

export const ConfigureCalendarPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const calendarKey = Number(searchParams.get('calendarKey') ?? -1);
    const {appData, updateAppData} = useAppDataContext();
    const [configuredCalendarEvents, setConfiguredCalendarEvents] = useState<CalendarDataRowData[]>(JSON.parse(JSON.stringify(appData?.calendarData)));
    const selectedCalendarEvent: undefined | CalendarDataRowData = calendarKey === -1 ? undefined : configuredCalendarEvents.filter((calendarEvent) => calendarEvent?.key === calendarKey)[0];
    const [currentState, setCurrentState] = useState<string>("general-configure-page");
    const [calendarCopy, setCalendarCopy] = useState<CalendarDataRowData[]>(JSON.parse(JSON.stringify(appData?.calendarData)));
    const [alarmHours = "0", alarmMinutes = "0", alarmMeridian = "0"] = getAlarmTimeData({active: false, days: [], description: "", key: 0, sound: "", time: selectedCalendarEvent?.time ?? ""});
    const navigate = useNavigate();
    const [description, setDescription] = useState<string>(selectedCalendarEvent?.description ?? "");
    const [hour, setHour] = useState<number>(Number(alarmHours) - 1);
    const [minute, setMinute] = useState<number>(Number(alarmMinutes));
    const [timeOfDay, setTimeOfDay] = useState<number>(alarmMeridian === "am" ? 1 : 0);
    const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs(`${selectedCalendarEvent?.year}-${selectedCalendarEvent?.month}-${selectedCalendarEvent?.day}`));
    const completeCancel = () => {
        navigate("/calendar")
    }
    const completeSubmit = () => {
        const date = (datePickerValue || dayjs(`2025-09-21`)).toDate();
        const dayOfTheWeek = abbreviatedDaysArray[date?.getUTCDay()];
        const calendarCopy = configuredCalendarEvents;
        calendarCopy[calendarKey] = {day: date.getDate().toString(), dayOfTheWeek: dayOfTheWeek, description: description, key: 0, month: (date.getMonth() + 1).toString(), time: `${hour + 1}:${minute}${timeOfDay === 1 ? "am" : "pm"}`, year: date.getFullYear().toString()};
        setConfiguredCalendarEvents(calendarCopy);
        updateAppData({...appData, calendarData: configuredCalendarEvents});
        navigate("/calendar")
    }
    const configureStartDate = (dateValue: PickerValue) => {
        setDatePickerValue(dateValue)
    }
    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", position:"relative", padding: "0"}}>
                <ApplicationConfigurationButtons completeCancel={() => {completeCancel()}} completeSubmit={() => {completeSubmit()}} />
                <Alert variant="filled" severity="info" sx={{marginTop:"2rem"}}>
                    Select Date, Time, and Description
                </Alert>
                <Stack padding={"2rem 0 0 0"} alignItems={"center"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Date Picker"
                                         value={datePickerValue}
                                         onChange={(newValue) => configureStartDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Stack>
                <TimeSelector timeOfDay={timeOfDay} setTimeOfDay={setTimeOfDay} hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} stackHeight={"40vh"} highlighterPosition={"18.4vh"} />
                <TextField
                    id="standard-multiline-static"
                    label="Calendar Event Description"
                    multiline
                    rows={4}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setDescription(event.target.value)}}
                    value={description}
                    variant="standard"
                />
            </Container>
        </ApplicationContainer>
        )

}