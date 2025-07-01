import {Stack, Typography} from "@mui/material";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";

export const DaysCards = ({data}: { data: AlarmDataRowData | undefined }) => {
    let repeat = data?.days;
    if (repeat?.length == 7){
        repeat = ["All week"]
    }else if (repeat?.length == 0){
        repeat = ["None"];
    }
    return (
        <Stack direction={"row"}>
            {repeat?.map((day, index) => (
                    <Typography variant="h6" gutterBottom key={index} margin={0}>
                        {day === 'A' ? 'All day' : `${day}${index < repeat?.length - 1 ? ', ' : ''}`}
                    </Typography>
                )
            )}
        </Stack>
    );
};