import {Route, Routes} from "react-router";
import {CalendarContainer} from "./CalendarContainer.tsx";
import {ConfigureCalendarPage} from "./components/ConfigureCalendarPage.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useLoginStore} from "../../stores/LoginStore.tsx";

export const CalendarContainerWithRouting = () => {
    const navigate = useNavigate();
    const {data: loginData} = useLoginStore();

    useEffect(() => {
        if (!loginData?.imageList) {
            navigate(`../login`, { replace: true })
        }
    }, [])
    if (!loginData?.imageList) {
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