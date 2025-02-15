import { TextField, Button, Typography, Box } from '@mui/material';
import {useAppDataContext} from "../context/AppDataContext.tsx";

interface ApplicationCredentialFormProps{
    pageTitle: string;
    pageSubmitTitle: string;
    submitFormAction: () => void;
}
const ApplicationCredentialForm = ({pageTitle, pageSubmitTitle, submitFormAction} : ApplicationCredentialFormProps) => {
    const { appData, updateAppData } = useAppDataContext();

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
                    value={appData.username}
                    onChange={(e) => updateAppData({...appData, username: e.target.value})}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={appData.password}
                    onChange={(e) => updateAppData({...appData, password: e.target.value})}
                />
                <Button variant="contained" color="primary" fullWidth onClick={() => submitFormAction()} sx={{ mt: 2 }}>
                    {pageSubmitTitle}
                </Button>
            </Box>
    );
};

export default ApplicationCredentialForm;
