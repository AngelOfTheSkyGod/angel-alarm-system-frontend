import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import {useState} from "react";
import {CalendarDataRowData} from "../../../types/ApplicationTypes.tsx";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import {Alert, Container, Stack} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const ConfigureCalendarPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const calendarKey = Number(searchParams.get('calendarKey') ?? -1);
    const {appData, updateAppData} = useAppDataContext();
    const [configuredCalendarEvents, setConfiguredCalendarEvents] = useState<CalendarDataRowData[]>(JSON.parse(JSON.stringify(appData?.calendarData)));
    const selectedCalendarEvent: undefined | CalendarDataRowData = calendarKey === -1 ? undefined : configuredCalendarEvents.filter((calendarEvent) => calendarEvent?.key === calendarKey)[0];
    const [currentState, setCurrentState] = useState<string>("general-configure-page");
    const [calendarCopy, setCalendarCopy] = useState<CalendarDataRowData[]>(JSON.parse(JSON.stringify(appData?.calendarData)));
    const [startDate, setStartDate] = useState(new Date());

    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", position:"relative", padding: "0"}}>
                <Stack gap={"2rem"} padding={"2rem 0"}>
                    <Alert variant="filled" severity="info">
                        Select Starting Date and Time
                    </Alert>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
                </Stack>
            </Container>
        </ApplicationContainer>
        )

}