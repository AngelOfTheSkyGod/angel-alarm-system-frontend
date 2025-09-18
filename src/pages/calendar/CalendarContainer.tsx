import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import {useState} from "react";
import {ApplicationDataRow} from "../../components/ApplicationDataRow.tsx";
import {Stack, Typography} from "@mui/material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {CalendarDataRowData} from "../../types/ApplicationTypes.tsx";
import {abbreviationToDay, deleteItem, getDayPrefix, sortDate} from "../../utilities/utils.ts";
import {useNavigate} from "react-router-dom";

export const CalendarContainer = () => {
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const {appData, updateAppData} = useAppDataContext();
    const [updatedData , setUpdatedData] = useState<CalendarDataRowData[]>([...appData.calendarData]);
    const navigate = useNavigate();
    const submitAppData = () => {
        updateAppData({...appData, calendarData: updatedData}); //updates our alarms with the ones we just updated
        setConfigureMode(false);//turns settings off
    }
    const resetAlarms = () => {
        if (configureMode) {
            setUpdatedData(appData.calendarData);
        }
    }
    const selectCard = (data:CalendarDataRowData) => {
        if (!configureMode) return;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("calendarKey", String(data?.key));
        navigate(`/calendar/configureCalendarEvents?${searchParams.toString()}`);
    }
    return (
        <ApplicationPageContainer configuredModeResetFunction={()=>{resetAlarms()}} submitAppDataFunction={()=>{submitAppData()}} addNewEntryFunction={()=>{}} configureMode={configureMode} setConfigureMode={setConfigureMode}>
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                {updatedData?.sort(sortDate)?.map((data) => (
                    <ApplicationDataRow data={data} isConfigureMode={configureMode} updatedData={updatedData} setUpdatedData={setUpdatedData} deleteEntry={( e) => deleteItem(e, updatedData, setUpdatedData, data)} selectCard={() => selectCard(data)} dataArray={appData.alarmData}>
                        <Stack direction={"column"} alignItems={"start"}>
                            <Stack>
                                <Typography variant="h6" gutterBottom textAlign={"start"}>
                                    {`${getDayPrefix(data?.month)}/${getDayPrefix(data?.day)}/${data?.year}`}
                                </Typography>
                            </Stack>
                            <Typography variant="h6" gutterBottom textAlign={"start"}>
                                {abbreviationToDay(data?.dayOfTheWeek)}
                            </Typography>
                            <Typography variant="h6" gutterBottom textAlign={"start"}>
                                {data?.time ? data?.time : "All day"}
                            </Typography>
                        </Stack>
                    </ApplicationDataRow>
                ))}
            </Stack>
        </ApplicationPageContainer>
    )
}