import {useEffect, useState} from "react";
import {AlarmDataRowData} from "../../../types/ApplicationTypes.tsx";
import SelectionList from "./SelectionList.tsx";

interface AlarmSoundConfigurationProps {
    configuredAlarms:AlarmDataRowData[];
    setConfiguredAlarms:(appData:AlarmDataRowData[]) => void;
}

export default function AlarmSoundConfiguration({configuredAlarms, setConfiguredAlarms}: AlarmSoundConfigurationProps) {
    const searchParams = new URLSearchParams(location.search);
    const alarmKey = searchParams.get('alarmKey');
    const selectedAlarm: AlarmDataRowData = configuredAlarms.filter((alarm) => String(alarm?.key) === alarmKey)[0];
    const alarmSounds = ["One Piece - Mother Sea", "The very, very strongest", "default timbre", "antidepressants", "Escalon", "EoO", "Hoy Se Bebe"];
    const [selectedAlarmSound, setSelectedAlarmSound] = useState<string>(selectedAlarm?.sound);


    const handleToggle = (value: string) => () => {
        setSelectedAlarmSound(value);
    };

    useEffect(() => {
        const alarms = configuredAlarms;
        alarms[selectedAlarm?.key] = {...selectedAlarm, sound: selectedAlarmSound}
        setConfiguredAlarms(alarms);
    }, [selectedAlarmSound])
    return (
        <SelectionList handleToggle={(value:string) => handleToggle(value)} listElements={alarmSounds} checkedElements={(value:string) => value === selectedAlarmSound} subtext={null}/>
    );
}