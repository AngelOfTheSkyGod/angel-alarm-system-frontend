import {IconButton, Stack} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


interface ApplicationConfigurationButtonsProps{
    completeCancel: () => void;
    completeSubmit: () => void;
}

export const ApplicationConfigurationButtons = ({completeCancel, completeSubmit} : ApplicationConfigurationButtonsProps) => {
    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <IconButton aria-label="cancel icon" onClick={() => {completeCancel()}}>
                <ArrowBackIcon fontSize={"large"}/>
            </IconButton>
            <IconButton aria-label="apply changes icon" onClick={() => {completeSubmit()}}>
                <CheckCircleOutlineIcon fontSize={"large"}/>
            </IconButton>
        </Stack>
    )
}