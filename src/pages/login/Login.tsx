import React, { useEffect } from 'react';
import {Container, CssBaseline} from '@mui/material';
import ApplicationCredentialForm from "../../components/ApplicationCredentialForm.tsx";
import {useAppDataContext} from "../../context/AppDataContext.tsx";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const { appData:{username, password} } = useAppDataContext();
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`../login`, { replace: true })
    }, [])
    const handleLogin = () => {
        console.log('Username:', username, 'Password:', password);
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

export default Login;
