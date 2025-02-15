import {Divider, Stack, Typography, Container, IconButton, ButtonBase} from "@mui/material";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {areObjectsEqualDeep} from "../../../utilities/utils.ts";
import {useAppDataContext} from "../../../context/AppDataContext.tsx";

interface AlarmDataRowProps {
    data: AlarmDataRowData;
    isConfigureMode:boolean;
    updatedData:AlarmDataRowData[];
    setUpdatedData:(otherAlarms: AlarmDataRowData[]) => void;
    key:number;
}
export const AlarmDataRow = ({data, isConfigureMode, updatedData, setUpdatedData, key}:AlarmDataRowProps) => {
    const {appData} = useAppDataContext();
    const deleteAlarm = () => {
        const otherAlarms: AlarmDataRowData[] =  updatedData.filter((alarm) => (!areObjectsEqualDeep(alarm, data) && alarm.key !== data.key)).flatMap((alarm, index) => ({...alarm, key: index}));
        setUpdatedData(otherAlarms);
    }

    const selectCard = () => {
        console.log(`data clicked: ${JSON.stringify(data)}`);
    }
    return(
        <ButtonBase onClick={() => selectCard()} sx={{ width: "100%" }}>
            <Container sx={{justifyContent:"center", alignItems:"center"}}>
                <Divider component="div"/>
                <Stack direction={"row"} alignItems={'center'} justifyContent={"space-between"} margin={"1rem 0rem 1rem 0rem"}>
                    <Stack direction={"row"} sx={{justifyContent:"center", alignItems:"center", gap:"1rem"}}>
                        {
                            isConfigureMode &&
                            <IconButton aria-label="delete alarm icon" onClick={() => deleteAlarm()}>
                                <RemoveCircleOutlineIcon fontSize={"large"}/>
                            </IconButton>
                        }
                        <Stack direction={"column"}>
                            <Typography variant="h6" gutterBottom>
                                {data.time}
                            </Typography>
                            <Stack direction={"row"}>
                                {data.days.map((day, index) => (
                                    <Typography variant="h6" gutterBottom key={index}>
                                        {day === 'A'? 'All day' : `${day}${index < data.days.length - 1? ', ' : ''}`}
                                    </Typography>))
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                    <Typography variant="h6" gutterBottom>
                        {`- ${data.description}`}
                    </Typography>
                </Stack>
                {key >= appData.alarmData.length - 1 && <Divider component="div"/>}
            </Container>
        </ButtonBase>
    )
}