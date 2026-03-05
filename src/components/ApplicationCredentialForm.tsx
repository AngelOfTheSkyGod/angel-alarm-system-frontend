import { TextField, Button, Typography, Box } from '@mui/material';
import {Dispatch, SetStateAction} from "react";

interface ApplicationCredentialFormProps{
    pageTitle: string;
    pageSubmitTitle: string;
    submitFormAction: () => void;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
}
const ApplicationCredentialForm = ({pageTitle, pageSubmitTitle, submitFormAction, username, setUsername, setPassword, password} : ApplicationCredentialFormProps) => {
    return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={8} marginTop={0}>
                <Typography variant="h4" gutterBottom>
                    {pageTitle}
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={() => submitFormAction()} sx={{ mt: 2 }}>
                    {pageSubmitTitle}
                </Button>
            </Box>
    );
};

export default ApplicationCredentialForm;
