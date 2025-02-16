import {Container, Typography} from "@mui/material";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";


export const ConfigureAlarmsPage = () => {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const {appData} = useAppDataContext();
    const selectedAlarm: AlarmDataRowData = appData.alarmData.filter((alarm) => String(alarm.key) === alarmKey)[0];
    console.log(`key: ${alarmKey}`);
    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content"}}>
                <Typography component="h1" variant="h5">{`alarm: ${JSON.stringify(selectedAlarm)}`}</Typography>
            </Container>
        </ApplicationContainer>
    )
}