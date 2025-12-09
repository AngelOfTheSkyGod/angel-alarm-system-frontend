import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, CssBaseline} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ApplicationCredentialForm from "../../components/ApplicationCredentialForm.tsx";
import { useNavigate } from "react-router-dom";
import {useLoginStore} from "../../stores/LoginStore.tsx";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import {SlideShowPictureData} from "../../types/ApplicationTypes.tsx";

const LoginContainer: React.FC = () => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState<string>(localStorage.getItem("identifier") || "");
    const {data: loginData, isFetching: isLoginDataFetching} = useLoginStore();
    const { appData, updateAppData } = useAppDataContext();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    useEffect(() => {
        if (!identifier){
            const identifier = uuidv4()
            localStorage.setItem("identifier", identifier);
            setIdentifier(uuidv4());
        }else if (identifier){
            setIdentifier(localStorage.getItem("identifier") || uuidv4())
        }
    }, [])
    useEffect(() => {
        navigate(`../login`, { replace: true })
    }, [])
    useEffect(() => {
        if (loginData?.imageList) {
            updateAppData({...appData, slideShowData: loginData?.imageList.map((entry):SlideShowPictureData=> {return {imageDataUrl: entry }}) || []})
            navigate(`../alarm`, { replace: true })
        }
    }, [loginData, isLoginDataFetching])
    if (isLoginDataFetching){
        return <CircularProgress />
    }
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{height: "100%", minHeight:"100vh", width: "75vw"}}  maxWidth="md">
                <ApplicationCredentialForm
                    pageTitle={"Login"}
                    pageSubmitTitle={"Login"}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    submitFormAction={() => {updateAppData({...appData, username, password})}}/>
            </Container>
        </React.Fragment>
    );
};

const LoginContainerWithProviders = () => {
    return (<LoginContainer />)
}
export {LoginContainerWithProviders as Login};
