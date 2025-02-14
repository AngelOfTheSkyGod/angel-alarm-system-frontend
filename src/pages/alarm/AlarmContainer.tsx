import {Route, Routes} from "react-router";
import {AlarmsPage} from "./components/AlarmsPage.tsx";
import {ConfigureAlarmsPage} from "./components/ConfigureAlarmsPage.tsx";

export const AlarmContainer = () => {
    return(
        <Routes>
            <Route path={"/"} element={<AlarmsPage/>}/>
            <Route path={"/configureAlarms"} element={<ConfigureAlarmsPage/>}/>
        </Routes>
    )
}