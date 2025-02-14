import React, { useEffect } from 'react';
import { Container } from '@mui/material';
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
        <Container maxWidth="sm">
            <ApplicationCredentialForm pageTitle={"Login"} pageSubmitTitle={"Login"} submitFormAction={handleLogin}/>
        </Container>
    );
};

export default Login;
