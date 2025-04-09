import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {useEffect, useState} from "react";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {dayToAbbreviation} from "../../../utilities/utils.ts";

interface DaysAlarmConfigurationProps{
    configuredAlarms:AlarmDataRowData[];
    setConfiguredAlarms:(appData:AlarmDataRowData[]) => void;
}

export default function DaysAlarmConfiguration({configuredAlarms, setConfiguredAlarms}: DaysAlarmConfigurationProps) {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const selectedAlarm: AlarmDataRowData = configuredAlarms.filter((alarm) => String(alarm?.key) === alarmKey)[0];
    const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [selectedAlarmDays, setSelectedAlarmDays] = useState<string[]>(selectedAlarm?.days);


    const handleToggle = (value: string) => () => {
        const currentIndex = selectedAlarmDays.indexOf(value);
        const newChecked = [...selectedAlarmDays];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            console.log(`removing: ${value} ${newChecked}`);
        }

        setSelectedAlarmDays(newChecked);
    };

    useEffect(() => {
        const alarms = configuredAlarms;
        alarms[selectedAlarm?.key] = {...selectedAlarm, days: selectedAlarmDays}
        setConfiguredAlarms(alarms);
    }, [selectedAlarmDays])
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {fullDays.map((value) => {
                const labelId = `${value}`;

                return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(dayToAbbreviation(value))} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={selectedAlarmDays.includes(dayToAbbreviation(value))}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Every ${value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}