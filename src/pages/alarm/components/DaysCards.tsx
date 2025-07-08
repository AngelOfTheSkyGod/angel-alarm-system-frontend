import {Stack, Typography} from "@mui/material";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";

export const DaysCards = ({data}: { data: AlarmDataRowData | undefined }) => {
    let repeat = data?.days;
    if (repeat?.length == 7 || repeat?.[0] === "A"){
        repeat = ["All week"]
    }else if (repeat?.length == 0){
        repeat = ["No repeat"];
    }
    return (
        <Stack direction={"row"}>
            {repeat?.map((day, index) => (
                    <Typography variant="h6" gutterBottom key={index} margin={0} textAlign={"start"}>
                        {`${day}${index < repeat?.length - 1 ? ', ' : ''}`}
                    </Typography>
                )
            )}
        </Stack>
    );
};