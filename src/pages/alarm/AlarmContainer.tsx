import {Stack} from "@mui/material";
import {AlarmDataRow} from "./components/AlarmDataRow.tsx";
import { useAppDataContext } from "../../context/AppDataContext.tsx";
import {useState} from "react";
import {AlarmDataRowData} from "../../types/ApplicationTypes.tsx";
import {useNavigate} from "react-router-dom";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";

export const AlarmContainer = () => {
    const {appData, updateAppData} = useAppDataContext();
    const navigate = useNavigate();
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const [updatedData , setUpdatedData] = useState<AlarmDataRowData[]>([...appData.alarmData]);
    const submitAppData = () => {
        updateAppData({...appData, alarmData: updatedData}); //updates our alarms with the ones we just updated
        setConfigureMode(false);//turns settings off
    }
    const resetAlarms = () => {
        if (configureMode) {
            setUpdatedData(appData.alarmData);
        }
    }
    const addAlarm = () => {
        navigate(`/alarm/addAlarm`);
    }

    return(
        <ApplicationPageContainer
            configuredModeResetFunction={() => resetAlarms()}
            submitAppDataFunction={() => submitAppData()}
            addNewEntryFunction={() => addAlarm()}
        >
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                {updatedData?.map((data) => (
                    <AlarmDataRow
                        data={data}
                        key={data.key}
                        isConfigureMode={configureMode}
                        updatedData={updatedData}
                        setUpdatedData={setUpdatedData}
                    />))}
            </Stack>
        </ApplicationPageContainer>
    )
}