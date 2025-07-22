import {Stack, Typography} from "@mui/material";
import { useAppDataContext } from "../../context/AppDataContext.tsx";
import {useState} from "react";
import {AlarmDataRowData} from "../../types/ApplicationTypes.tsx";
import {useNavigate} from "react-router-dom";
import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import {ApplicationDataRow} from "../../components/ApplicationDataRow.tsx";
import {DaysCards} from "./components/DaysCards.tsx";
import {areObjectsEqualDeep} from "../../utilities/utils.ts";

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
    const deleteAlarm = (data:AlarmDataRowData, event: React.MouseEvent) => {
        const otherAlarms: AlarmDataRowData[] =  updatedData.filter((alarm) => (!areObjectsEqualDeep(alarm, data) && alarm.key !== data.key)).flatMap((alarm, index) => ({...alarm, key: index}));
        setUpdatedData(otherAlarms);
        event.stopPropagation();
    }

    const switchAlarmStatus = (data:AlarmDataRowData, event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...appData.alarmData];
        newData[data.key].active = !newData[data.key].active;
        updateAppData({...appData, alarmData: newData});
        setUpdatedData(newData);
        event.stopPropagation();
    }
    const selectCard = (data:AlarmDataRowData) => {
        if (!configureMode) return;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("alarmKey", String(data.key));
        navigate(`/alarm/configureAlarms?${searchParams.toString()}`);
    }
    return(
        <ApplicationPageContainer
            configuredModeResetFunction={() => resetAlarms()}
            submitAppDataFunction={() => submitAppData()}
            addNewEntryFunction={() => addAlarm()}
            configureMode={configureMode}
            setConfigureMode={setConfigureMode}
        >
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                {updatedData?.map((data) => (
                    <ApplicationDataRow data={data} isConfigureMode={configureMode} updatedData={updatedData} setUpdatedData={setUpdatedData} deleteEntry={( e) => deleteAlarm(data, e)} switchEntryStatus={(e) => switchAlarmStatus(data, e)} selectCard={() => selectCard(data)} dataArray={appData.alarmData} hasSwitchMode={true}>
                        <Stack direction={"column"} alignItems={"start"}>
                            <Typography variant="h6" gutterBottom textAlign={"start"}>
                                {data.time}
                            </Typography>
                            {<DaysCards data = {data}/>}
                        </Stack>
                    </ApplicationDataRow>
                    ))}
            </Stack>
        </ApplicationPageContainer>
    )
}