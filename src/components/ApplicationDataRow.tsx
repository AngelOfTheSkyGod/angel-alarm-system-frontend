import {Divider, Stack, Typography, Container, IconButton, ButtonBase, Switch} from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {AlarmDataRowData, CalendarDataRowData} from "../types/ApplicationTypes.tsx";
import {Dispatch, SetStateAction} from "react";
interface AlarmDataRowProps {
    data: AlarmDataRowData | CalendarDataRowData;
    isConfigureMode:boolean;
    updatedData:AlarmDataRowData[] | CalendarDataRowData[];
    setUpdatedData:Dispatch<SetStateAction<AlarmDataRowData[] | null>> | Dispatch<SetStateAction<CalendarDataRowData[] | null>>;
    deleteEntry:(event:React.MouseEvent) => void;
    switchEntryStatus?:(event: React.ChangeEvent<HTMLInputElement>) => void;
    selectCard: () => void;
    dataArray: AlarmDataRowData[] | CalendarDataRowData[] | null;
    children: React.ReactNode;
}
export const ApplicationDataRow = ({data, isConfigureMode, deleteEntry, switchEntryStatus, selectCard, dataArray, children}:AlarmDataRowProps) => {
    return(
        <Container sx={{justifyContent:"center", alignItems:"center", width:"100%"}}>
            <Divider component="div"/>
            <Stack direction={"row"} alignItems={'center'}>
                <ButtonBase disabled={!isConfigureMode} onClick={() => selectCard()} sx={{ width: switchEntryStatus ? "90%" : "100%" }}>
                    <Stack direction={"row"} alignItems={'center'} justifyContent={"flex-start"} margin={"1rem 1rem 1rem 1rem"} flex={1}>
                        <Stack direction={"row"} justifyContent={"flex-start"} sx={{width:"90%", alignItems:"center", gap:"1rem"}}>
                            {
                                isConfigureMode &&
                                <IconButton aria-label="delete alarm icon" onClick={(e) => deleteEntry(e)}>
                                    <RemoveCircleOutlineIcon fontSize={"large"}/>
                                </IconButton>
                            }
                            {children}
                        </Stack>
                        <Typography variant="h6" gutterBottom sx={{width:"90%", overflow:"hidden"}} textOverflow={"ellipsis"}>
                            {`- ${data.description}`}
                        </Typography>
                    </Stack>
                </ButtonBase>
                {switchEntryStatus &&
                    <Switch
                        checked={data?.active}
                        onChange={(e) => switchEntryStatus(e)}
                        inputProps={{'aria-label': 'controlled'}}
                    />
                }
            </Stack>
            {data.key >= (dataArray?.length || 0) - 1 && <Divider component="div"/>}
        </Container>
    )
}