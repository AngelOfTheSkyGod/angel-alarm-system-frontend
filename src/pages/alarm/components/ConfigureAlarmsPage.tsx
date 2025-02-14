import {Container, Typography} from "@mui/material";
// import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
export const ConfigureAlarmsPage = () => {
    // const {appData: {alarmData}} = useAppDataContext();
return(
    <ApplicationContainer>
        <Container maxWidth="md">
            <Typography component="h1" variant="h5">Alarms</Typography>
        </Container>
    </ApplicationContainer>
)
}