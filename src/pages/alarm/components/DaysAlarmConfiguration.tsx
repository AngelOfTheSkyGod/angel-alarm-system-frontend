import {useEffect, useState} from "react";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import {dayToAbbreviation} from "../../../utilities/utils.ts";
import SelectionList from "./SelectionList.tsx";

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
        <SelectionList handleToggle={(value) => handleToggle(dayToAbbreviation(value))} listElements={fullDays} checkedElements={(value) => selectedAlarmDays.includes(dayToAbbreviation(value))} subtext={"Every"}/>
    );
}