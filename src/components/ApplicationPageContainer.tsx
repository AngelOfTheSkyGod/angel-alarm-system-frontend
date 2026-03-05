import {Container, IconButton, Stack} from "@mui/material";
import {ApplicationContainer} from "./ApplicationContainer.tsx";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { useAppDataContext } from "../context/AppDataContext.tsx";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import {AASData} from "../types/ApplicationTypes.tsx";
import {styled} from "@mui/material/styles";

interface ApplicationPageContainerProps {
    configuredModeResetFunction: (appData: AASData) => void;
    submitAppDataFunction: () => void;
    addNewEntryFunction: () => void;
    children: React.ReactNode;
    configureMode:boolean;
    setConfigureMode:(value: boolean) => void;
    uploadFile?: boolean;
    uploadFileFunction?: (image: File | undefined) => void;
}
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: "100%",
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: "100%",
});

export const ApplicationPageContainer = ({configuredModeResetFunction, submitAppDataFunction, addNewEntryFunction, configureMode, setConfigureMode, uploadFile, uploadFileFunction, children}:ApplicationPageContainerProps) => {
    const {appData} = useAppDataContext();
    const openSettings = () => {
        if (configureMode) {
            configuredModeResetFunction(appData);
        }
        setConfigureMode(!configureMode);
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
                    {
                        <IconButton component={"label"} aria-label="add alarm icon"
                                    onClick={configureMode ? () => submitAppDataFunction() : () => {
                                        addNewEntryFunction()
                                    }}>
                            {
                                uploadFile &&
                                <VisuallyHiddenInput
                                    type="file"
                                    multiple={false}
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        if (uploadFileFunction && file) {
                                            uploadFileFunction(file);
                                        }

                                        // reset so camera/gallery selections always trigger onChange
                                        event.target.value = "";
                                    }}
                                />
                            }
                            {
                                configureMode ?
                                    <CheckIcon fontSize={"large"}/> :
                                    <AddIcon fontSize={"large"}/>
                            }
                        </IconButton>
                    }
                </Stack>
                {children}
            </Container>
        </ApplicationContainer>
    )
}