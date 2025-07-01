import {Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "../../components/ApplicationContainer.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import {AlarmDataRow} from "./components/AlarmDataRow.tsx";
import { useAppDataContext } from "../../context/AppDataContext.tsx";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {AlarmDataRowData} from "../../types/ApplicationTypes.tsx";
import {useNavigate} from "react-router-dom";
import {sortTime} from "../../utilities/utils.ts";

export const AlarmContainer = () => {
    const {appData, updateAppData} = useAppDataContext();
    const navigate = useNavigate();
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [updatedData , setUpdatedData] = useState<AlarmDataRowData[]>([...appData.alarmData]);
    const submitAppData = () => {
        updateAppData({...appData, alarmData: updatedData}); //updates our alarms with the ones we just updated
        setConfigureMode(false);//turns settings off
    }
    const openSettings = () => {
        if (configureMode) {
            setUpdatedData(appData.alarmData); //wipes away the updated data with the old alarm data
        }
        setConfigureMode(!configureMode); //turns settings on or off
    }
    console.log("updatedData data: ", updatedData, "appData: ", appData);
    const addAlarm = () => {
        navigate(`/alarm/addAlarm`);
    }

    return(
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content"}}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton aria-label="edit alarms icon" onClick={ () => openSettings()}>
                        {configureMode?
                            <ClearIcon fontSize={"large"}/> :
                            <SettingsIcon fontSize={"large"}/>
                        }
                    </IconButton>
                    <IconButton aria-label="add alarm icon" onClick={configureMode ?  () => submitAppData() : ()=>{addAlarm()}}>
                        {configureMode?
                            <CheckIcon fontSize={"large"} /> :
                            <AddIcon fontSize={"large"}/>
                        }
                    </IconButton>
                </Stack>
                <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                    {updatedData?.sort(sortTime)?.map((data) => (
                        <AlarmDataRow
                            data={data}
                            key={data.key}
                            isConfigureMode={configureMode}
                            updatedData={updatedData}
                            setUpdatedData={setUpdatedData}
                        />))}
                </Stack>
            </Container>
        </ApplicationContainer>
    )
}