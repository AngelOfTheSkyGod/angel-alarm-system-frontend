import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import {useState} from "react";
import {ApplicationDataRow} from "../../components/ApplicationDataRow.tsx";
import {Stack, Typography} from "@mui/material";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {CalendarDataRowData} from "../../types/ApplicationTypes.tsx";
import {DaysCards} from "../alarm/components/DaysCards.tsx";
import {abbreviationToDay} from "../../utilities/utils.ts";

export const CalendarContainer = () => {
    const [configureMode, setConfigureMode] = useState<boolean>(false);
    const {appData, updateAppData} = useAppDataContext();
    const [updatedData , setUpdatedData] = useState<CalendarDataRowData[]>([...appData.calendarData]);
    const deleteAlarm = (data, e) => {
        console.log("deleteAlarm", data, e);
    }

    const switchAlarmStatus = (data, e) => {
        console.log(data, e);

    }

    const selectCard = (data) => {
        console.log(data);
    }
    return (
        <ApplicationPageContainer configuredModeResetFunction={()=>{}} submitAppDataFunction={()=>{}} addNewEntryFunction={()=>{}} configureMode={configureMode} setConfigureMode={setConfigureMode}>
            <Stack sx={{overFlowY: "auto", padding: '2rem 0 0 0'}}>
                {updatedData?.map((data) => (
                    <ApplicationDataRow data={data} isConfigureMode={configureMode} updatedData={updatedData} setUpdatedData={setUpdatedData} deleteEntry={( e) => deleteAlarm(data, e)} switchEntryStatus={(e) => switchAlarmStatus(data, e)} selectCard={() => selectCard(data)} dataArray={appData.alarmData} hasSwitchMode={false}>
                        <Stack direction={"column"} alignItems={"start"}>
                            <Stack>
                                <Typography variant="h6" gutterBottom textAlign={"start"}>
                                    {`${data?.month}/${data?.day}/${data?.year}`}
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