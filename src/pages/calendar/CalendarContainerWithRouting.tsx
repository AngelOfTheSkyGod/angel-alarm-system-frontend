import {Route, Routes} from "react-router";
import {CalendarContainer} from "./CalendarContainer.tsx";
import {ConfigureCalendarPage} from "./components/ConfigureCalendarPage.tsx";

export const CalendarContainerWithRouting = () => {
    return(
        <Routes>
            <Route path={"/"} element={<CalendarContainer/>}/>
            <Route path={"/configureCalendarEvents"} element={<ConfigureCalendarPage/>}/>
            {/*<Route path={"/addAlarm"} element={<ConfigureAlarmsPage/>}/>*/}
        </Routes>
    )
}