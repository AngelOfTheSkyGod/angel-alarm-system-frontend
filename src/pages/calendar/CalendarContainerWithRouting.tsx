import {Route, Routes} from "react-router";
import {CalendarContainer} from "./CalendarContainer.tsx";
import {ConfigureCalendarPage} from "./components/ConfigureCalendarPage.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppDataContext} from "../../context/AppDataContext.tsx";

export const CalendarContainerWithRouting = () => {
    const { appData } = useAppDataContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!appData?.slideShowData) {
            navigate(`../login`, { replace: true })
        }
    }, [])
    if (!appData?.slideShowData) {
        return null;
    }
    return(
        <Routes>
            <Route path={"/"} element={<CalendarContainer/>}/>
            <Route path={"/configureCalendarEvents"} element={<ConfigureCalendarPage/>}/>
            <Route path={"/addCalendarEvent"} element={<ConfigureCalendarPage/>}/>
        </Routes>
    )
}