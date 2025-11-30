import React, {useEffect, useState} from 'react';
import {Container, CssBaseline} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
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
    const [identifier, setIdentifier] = useState<string>(uuidv4());

    useEffect(() => {
        if (!localStorage.getItem("identifier")){
            const identifier = uuidv4()
            localStorage.setItem("identifier", identifier);
            setIdentifier(uuidv4());
        }else if (localStorage.getItem("identifier")){
            setIdentifier(localStorage.getItem("identifier") || uuidv4())
        }
    }, [])
    const postObject: AASData= {
        alarmData: alarmData, calendarData: calendarData, password: "password", slideShowData: slideShowData, username: "username", userIdentifier: identifier
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
