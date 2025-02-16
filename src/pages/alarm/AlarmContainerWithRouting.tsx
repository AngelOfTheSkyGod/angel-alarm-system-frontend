import {Route, Routes} from "react-router";
import {AlarmContainer} from "./AlarmContainer.tsx";
import {ConfigureAlarmsPage} from "./components/ConfigureAlarmsPage.tsx";

export const AlarmContainerWithRouting = () => {
    return(
        <Routes>
            <Route path={"/"} element={<AlarmContainer/>}/>
            <Route path={"/configureAlarms"} element={<ConfigureAlarmsPage/>}/>
        </Routes>
    )
}