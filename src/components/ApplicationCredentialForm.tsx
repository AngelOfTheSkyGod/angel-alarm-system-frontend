import { TextField, Button, Typography, Box } from '@mui/material';
import {useAppDataContext} from "../context/AppDataContext.tsx";

interface ApplicationCredentialFormProps{
    pageTitle: string;
    pageSubmitTitle: string;
    submitFormAction: () => void;
}
const ApplicationCredentialForm = ({pageTitle, pageSubmitTitle, submitFormAction} : ApplicationCredentialFormProps) => {
    const { appData:{username, password}, updateAppData } = useAppDataContext();

    return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" gutterBottom>
                    {pageTitle}
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => updateAppData({username: e.target.value, password})}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => updateAppData({username, password: e.target.value})}
                />
                <Button variant="contained" color="primary" fullWidth onClick={() => submitFormAction()} sx={{ mt: 2 }}>
                    {pageSubmitTitle}
                </Button>
            </Box>
    );
};

export default ApplicationCredentialForm;
