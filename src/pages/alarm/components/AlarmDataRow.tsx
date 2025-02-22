import {Divider, Stack, Typography, Container, IconButton, ButtonBase} from "@mui/material";
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
    const {appData} = useAppDataContext();
    const navigate = useNavigate();

    const deleteAlarm = (event: React.MouseEvent) => {
        const otherAlarms: AlarmDataRowData[] =  updatedData.filter((alarm) => (!areObjectsEqualDeep(alarm, data) && alarm.key !== data.key)).flatMap((alarm, index) => ({...alarm, key: index}));
        setUpdatedData(otherAlarms);
        event.stopPropagation();
    }

    const selectCard = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("alarmKey", String(data.key));
        navigate(`/alarm/configureAlarms?${searchParams.toString()}`);
    }
    return(
        <ButtonBase disabled={!isConfigureMode} onClick={() => selectCard()} sx={{ width: "100%" }}>
            <Container sx={{justifyContent:"center", alignItems:"center"}}>
                <Divider component="div"/>
                <Stack direction={"row"} alignItems={'center'} justifyContent={"space-between"} margin={"1rem 0rem 1rem 0rem"}>
                    <Stack direction={"row"} sx={{justifyContent:"center", alignItems:"center", gap:"1rem"}}>
                        {
                            isConfigureMode &&
                            <IconButton aria-label="delete alarm icon" onClick={(e) => deleteAlarm(e)}>
                                <RemoveCircleOutlineIcon fontSize={"large"}/>
                            </IconButton>
                        }
                        <Stack direction={"column"}>
                            <Typography variant="h6" gutterBottom>
                                {data.time}
                            </Typography>
                            {<DaysCards data = {data}/>}
                        </Stack>
                    </Stack>
                    <Typography variant="h6" gutterBottom>
                        {`- ${data.description}`}
                    </Typography>
                </Stack>
                {data.key >= appData.alarmData.length - 1 && <Divider component="div"/>}
            </Container>
        </ButtonBase>
    )
}