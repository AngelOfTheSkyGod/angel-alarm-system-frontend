import React from 'react';
import {Container, CssBaseline} from '@mui/material';
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
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{height: "100%", minHeight:"100vh", width: "75vw"}}  maxWidth="md">
            <ApplicationCredentialForm pageTitle={"Sign up"} pageSubmitTitle={"Sign up"} submitFormAction={handleSignUp}/>
        </Container>
        </React.Fragment>
    );
};

export default SignUp;
