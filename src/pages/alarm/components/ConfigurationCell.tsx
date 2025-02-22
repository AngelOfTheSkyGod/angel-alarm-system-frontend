import {IconButton, Stack, Typography} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
interface ConfiguredAlarmProps{
    configurationLabel:string;
    configurationFunction: () => void;
    child?:React.ReactNode;
}

export const ConfigurationCell = ({configurationLabel, configurationFunction, child} : ConfiguredAlarmProps) => {
    return (
        <Stack direction="row" alignItems={"center"} justifyContent={"center"} >
            {child
                ?
                child:
                <Typography component="h1" variant="h5">{configurationLabel}</Typography>
            }
            <IconButton aria-label="apply changes icon" onClick={() => configurationFunction()}>
                <ArrowCircleRightIcon fontSize={"small"}/>
            </IconButton>
        </Stack>
    )
}