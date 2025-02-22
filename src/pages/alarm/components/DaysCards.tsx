import {Stack, Typography} from "@mui/material";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";

export const DaysCards = ({data}: { data: AlarmDataRowData }) => {
    return (
        <Stack direction={"row"}>
            {data.days.map((day, index) => (
                    <Typography variant="h6" gutterBottom key={index} margin={0}>
                        {day === 'A' ? 'All day' : `${day}${index < data.days.length - 1 ? ', ' : ''}`}
                    </Typography>
                )
            )}
        </Stack>
    );
};