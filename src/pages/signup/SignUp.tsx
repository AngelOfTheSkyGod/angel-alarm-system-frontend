import React, {useEffect, useState} from 'react';
import {Container, CssBaseline} from '@mui/material';
import { useAppDataContext} from "../../context/AppDataContext.tsx";
import ApplicationCredentialForm from "../../components/ApplicationCredentialForm.tsx";
import {useNavigate} from "react-router-dom";
import {useLoginStore} from "../../stores/LoginStore.tsx";

const SignUp: React.FC = () => {
    const { appData, updateAppData } = useAppDataContext();
    const navigate = useNavigate();
    const {data: loginData, isFetching: isLoginDataFetching} = useLoginStore();

    useEffect(() => {
        if (loginData?.imageList) {
            navigate(`../alarm`, { replace: true })
        }
    }, [loginData, isLoginDataFetching])
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{height: "100%", minHeight:"100vh", width: "75vw"}}  maxWidth="md">
            <ApplicationCredentialForm
                pageTitle={"Sign up"}
                pageSubmitTitle={"Sign up"}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                submitFormAction={() => {updateAppData({...appData, username, password})}}
            />
        </Container>
        </React.Fragment>
    );
};

export default SignUp;
