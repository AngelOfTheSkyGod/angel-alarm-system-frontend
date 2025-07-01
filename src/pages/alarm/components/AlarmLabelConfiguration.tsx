
import {useEffect, useState} from "react";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {Container, TextField} from "@mui/material";

interface AlarmLabelConfigurationProps {
    configuredAlarms:AlarmDataRowData[];
    setConfiguredAlarms:(appData:AlarmDataRowData[]) => void;
}

export default function AlarmLabelConfiguration({configuredAlarms, setConfiguredAlarms}: AlarmLabelConfigurationProps) {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const selectedAlarm: AlarmDataRowData = configuredAlarms.filter((alarm) => String(alarm?.key) === alarmKey)[0];
    const [selectedAlarmLabel, setSelectedAlarmLabel] = useState<string>(selectedAlarm?.description);
    useEffect(() => {
        const alarms = configuredAlarms;
        alarms[selectedAlarm?.key] = {...selectedAlarm, description: selectedAlarmLabel}
        setConfiguredAlarms(alarms);
    }, [selectedAlarmLabel])
    return (
        <Container  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <TextField
                id="standard-multiline-static"
                label="Enter alarm description"
                multiline
                rows={4}
                variant="standard"
                value={selectedAlarmLabel}
                onChange={(e) => setSelectedAlarmLabel(e.target.value)}
            />
        </Container >
    );
}