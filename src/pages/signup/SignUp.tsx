import React from 'react';
import { Container } from '@mui/material';
import { useAppDataContext} from "../../context/AppDataContext.tsx";
import ApplicationCredentialForm from "../../components/ApplicationCredentialForm.tsx";
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {
    const { appData:{username, password} } = useAppDataContext();
    const navigate = useNavigate();

    const handleSignUp = () => {
        console.log('Username:', username, 'Password:', password);
        navigate(`../alarm`, { replace: true })

    };

    return (
        <Container maxWidth="sm">
            <ApplicationCredentialForm pageTitle={"Sign up"} pageSubmitTitle={"Sign up"} submitFormAction={handleSignUp}/>
        </Container>
    );
};

export default SignUp;
