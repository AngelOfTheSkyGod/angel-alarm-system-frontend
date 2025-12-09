import {Route, Routes} from "react-router";
import {AlarmContainer} from "./AlarmContainer.tsx";
import {ConfigureAlarmsPage} from "./components/ConfigureAlarmsPage.tsx";
import {useLoginStore} from "../../stores/LoginStore.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const AlarmContainerWithRouting = () => {
    const {data: loginData} = useLoginStore();
    const navigate = useNavigate();
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
            <Route path={"/"} element={<AlarmContainer/>}/>
            <Route path={"/configureAlarms"} element={<ConfigureAlarmsPage/>}/>
            <Route path={"/addAlarm"} element={<ConfigureAlarmsPage/>}/>
        </Routes>
    )
}