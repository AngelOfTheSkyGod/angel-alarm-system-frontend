import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";

export default function ApplicationTabNavbar() {
    const [value, setValue] = React.useState(window.location.pathname.substring(1));
    const navigate = useNavigate();

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate(`../${newValue}`, { replace: true })
    };

    return (
            <Tabs value={value} onChange={handleChange} aria-label="application label tabs" centered>
                <Tab value="alarm" icon={<AccessAlarmIcon fontSize={"large"} />} label="alarm" />
                <Tab value="slideshow" icon={<ImageIcon fontSize={"large"} />} label="slideshow" />
                <Tab value="calendar" icon={<CalendarMonthIcon fontSize={"large"} />} label="calendar" />
            </Tabs>
    );
}