import {ApplicationPageContainer} from "../../components/ApplicationPageContainer.tsx";
import {useState} from "react";

export const CalendarContainer = () => {
    const [configureMode, setConfigureMode] = useState<boolean>(false);

    return (
        <ApplicationPageContainer configuredModeResetFunction={()=>{}} submitAppDataFunction={()=>{}} addNewEntryFunction={()=>{}} configureMode={configureMode} setConfigureMode={setConfigureMode}>
            <div>hii :)</div>
        </ApplicationPageContainer>
    )
}