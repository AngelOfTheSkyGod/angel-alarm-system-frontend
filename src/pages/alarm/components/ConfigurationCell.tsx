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
                <Typography sx={{width:"20vw"}} textOverflow={"ellipsis"} overflow={"hidden"} component="h1" textAlign={"right"} variant="h5" whiteSpace={"nowrap"}>{configurationLabel}</Typography>
            }
            <IconButton style={{padding: 0}} aria-label="apply changes icon" onClick={() => configurationFunction()}>
                <ArrowCircleRightIcon fontSize={"small"}/>
            </IconButton>
        </Stack>
    )
}