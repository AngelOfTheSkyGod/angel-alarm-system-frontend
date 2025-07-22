import {Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "./ApplicationContainer.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { useAppDataContext } from "../context/AppDataContext.tsx";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {AASData} from "../types/ApplicationTypes.tsx";

interface ApplicationPageContainerProps {
    configuredModeResetFunction: (appData: AASData) => void;
    submitAppDataFunction: () => void;
    addNewEntryFunction: () => void;
    children: React.ReactNode;
    configureMode:boolean;
    setConfigureMode:(value: boolean) => void;
}

export const ApplicationPageContainer = ({configuredModeResetFunction, submitAppDataFunction, addNewEntryFunction, configureMode, setConfigureMode, children}:ApplicationPageContainerProps) => {
    const {appData} = useAppDataContext();
    const openSettings = () => {
        if (configureMode) {
            configuredModeResetFunction(appData); //wipes away the updated data with the old alarm data
        }
        setConfigureMode(!configureMode); //turns settings on or off
    }
    return (
        <ApplicationContainer>
            <Container maxWidth="md" sx={{height: "100%", maxHeight: "fit-content"}}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton aria-label="edit alarms icon" onClick={() => openSettings()}>
                        {configureMode ?
                            <ClearIcon fontSize={"large"}/> :
                            <SettingsIcon fontSize={"large"}/>
                        }
                    </IconButton>
                    <IconButton aria-label="add alarm icon" onClick={configureMode ? () => submitAppDataFunction() : () => {
                        addNewEntryFunction()
                    }}>
                        {configureMode ?
                            <CheckIcon fontSize={"large"}/> :
                            <AddIcon fontSize={"large"}/>
                        }
                    </IconButton>
                </Stack>
                {children}
            </Container>
        </ApplicationContainer>
    )
}