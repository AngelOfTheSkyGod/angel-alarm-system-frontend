import {Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "../../../components/ApplicationContainer.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import {AlarmDataRow} from "./AlarmDataRow.tsx";
import { useAppDataContext } from "../../../context/AppDataContext.tsx";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";

export const AlarmsPage = () => {
    const {appData, updateAppData} = useAppDataContext();
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [updatedData , setUpdatedData] = useState<AlarmDataRowData[]>(appData.alarmData);
    const submitAppData = () => {
        updateAppData({...appData, alarmData: updatedData});
        setConfigureMode(!configureMode);
    }
    const openSettings = () => {
        if (configureMode) {
            setUpdatedData(appData.alarmData);
        }
        setConfigureMode(!configureMode);
    }

    return(<ApplicationContainer>
        <Container maxWidth="md" sx={{height: "100%"}}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <IconButton aria-label="edit alarms icon" onClick={() => openSettings()}>
                    {configureMode?
                        <ClearIcon fontSize={"large"}/> :
                        <SettingsIcon fontSize={"large"}/>                    }
                </IconButton>
                <IconButton aria-label="add alarm icon">
                    {configureMode?
                        <CheckIcon fontSize={"large"} onClick={() => submitAppData()}/> :
                        <AddIcon fontSize={"large"}/>
                    }
                </IconButton>
            </Stack>
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                {updatedData.map((data) => (
                    <AlarmDataRow
                        data={data}
                        key={data.key}
                        isConfigureMode={configureMode}
                        updatedData={updatedData}
                        setUpdatedData={setUpdatedData}
                    />))}
            </Stack>
        </Container>
    </ApplicationContainer>)
}