import {Divider, Stack, Typography, Container, IconButton, ButtonBase, Switch} from "@mui/material";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {areObjectsEqualDeep} from "../../../utilities/utils.ts";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";
import {useNavigate} from "react-router-dom";
import {DaysCards} from "./DaysCards.tsx";
interface AlarmDataRowProps {
    data: AlarmDataRowData;
    isConfigureMode:boolean;
    updatedData:AlarmDataRowData[];
    setUpdatedData:(otherAlarms: AlarmDataRowData[]) => void;
}
export const AlarmDataRow = ({data, isConfigureMode, updatedData, setUpdatedData}:AlarmDataRowProps) => {
    const {appData, updateAppData} = useAppDataContext();
    const navigate = useNavigate();

    const deleteAlarm = (event: React.MouseEvent) => {
        const otherAlarms: AlarmDataRowData[] =  updatedData.filter((alarm) => (!areObjectsEqualDeep(alarm, data) && alarm.key !== data.key)).flatMap((alarm, index) => ({...alarm, key: index}));
        setUpdatedData(otherAlarms);
        event.stopPropagation();
    }

    const switchAlarmStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...appData.alarmData];
        newData[data.key].active = !newData[data.key].active;
        updateAppData({...appData, alarmData: newData});
        setUpdatedData(newData);
        event.stopPropagation();
    }
    const selectCard = () => {
        if (!isConfigureMode) return;
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("alarmKey", String(data.key));
        navigate(`/alarm/configureAlarms?${searchParams.toString()}`);
    }
    return(
        <Container sx={{justifyContent:"center", alignItems:"center", width:"100%"}}>
            <Divider component="div"/>
            <Stack direction={"row"} alignItems={'center'}>
                <ButtonBase disabled={!isConfigureMode} onClick={() => selectCard()} sx={{ width: "90%" }}>
                    <Stack direction={"row"} alignItems={'center'} justifyContent={"flex-start"} margin={"1rem 1rem 1rem 1rem"} flex={1}>
                        <Stack direction={"row"} justifyContent={"flex-start"} sx={{width:"90%", alignItems:"center", gap:"1rem"}}>
                            {
                                isConfigureMode &&
                                <IconButton aria-label="delete alarm icon" onClick={(e) => deleteAlarm(e)}>
                                    <RemoveCircleOutlineIcon fontSize={"large"}/>
                                </IconButton>
                            }
                            <Stack direction={"column"} alignItems={"start"}>
                                <Typography variant="h6" gutterBottom textAlign={"start"}>
                                    {data.time}
                                </Typography>
                                {<DaysCards data = {data}/>}
                            </Stack>
                        </Stack>
                        <Typography variant="h6" gutterBottom sx={{width:"90%", overflow:"hidden"}} textOverflow={"ellipsis"}>
                            {`- ${data.description}`}
                        </Typography>
                    </Stack>
                </ButtonBase>
                <Switch
                    checked={data.active}
                    onChange={(e) => switchAlarmStatus(e)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>
            {data.key >= appData.alarmData.length - 1 && <Divider component="div"/>}
        </Container>
    )
}