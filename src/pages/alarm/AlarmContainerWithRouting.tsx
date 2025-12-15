import {Route, Routes} from "react-router";
import {AlarmContainer} from "./AlarmContainer.tsx";
import {ConfigureAlarmsPage} from "./components/ConfigureAlarmsPage.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDataContext} from "../../context/AppDataContext.tsx";

export const AlarmContainerWithRouting = () => {
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
            <Route path={"/"} element={<AlarmContainer/>}/>
            <Route path={"/configureAlarms"} element={<ConfigureAlarmsPage/>}/>
            <Route path={"/addAlarm"} element={<ConfigureAlarmsPage/>}/>
        </Routes>
    )
}