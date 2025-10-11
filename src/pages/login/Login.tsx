import React, { useEffect } from 'react';
import {Container, CssBaseline} from '@mui/material';
import ApplicationCredentialForm from "../../components/ApplicationCredentialForm.tsx";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import { useNavigate } from "react-router-dom";
import {ConfigContextProvider, useConfigContext} from "../../hooks/useConfigContext.tsx";
import {postCall} from "../../utilities/postCall.ts";
import {AASData} from "../../types/ApplicationTypes.tsx";

const LoginContainer: React.FC = () => {
    const { appData:{username, password, slideShowData, alarmData, calendarData} } = useAppDataContext();
    const navigate = useNavigate();
    const {config : {baseUrl}} = useConfigContext();
    const postObject: AASData= {
        alarmData: alarmData, calendarData: calendarData, password: "password", slideShowData: slideShowData, username: "username"
    }
    useEffect(() => {
        navigate(`../login`, { replace: true })
    }, [])
    const handleLogin = () => {
        console.log('Username:', username, 'Password:', password);
        postCall(baseUrl, "connect", postObject)
        navigate(`../alarm`, { replace: true })
    };
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{height: "100%", minHeight:"100vh", width: "75vw"}}  maxWidth="md">
                <ApplicationCredentialForm pageTitle={"Login"} pageSubmitTitle={"Login"} submitFormAction={handleLogin}/>
            </Container>
        </React.Fragment>
    );
};

const LoginContainerWithProviders = () => {
    return (<ConfigContextProvider>
        <LoginContainer />
    </ConfigContextProvider>)
}
export {LoginContainerWithProviders as Login};
