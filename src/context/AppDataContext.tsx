import {createContext, MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {AASData, AlarmDataRowData} from "../types/ApplicationTypes.tsx";
import {initializeAASData} from "../utilities/initializers.tsx";
import {sortTime} from "../utilities/utils.ts";

interface MyContextType {
    appData: AASData;
    updateAppData: (newValue: AASData) => void;
    appDataReference: MutableRefObject<AASData>;
}

const AppDataContext = createContext<MyContextType | undefined>(undefined);
const sortAndIndexAlarms = (newValue: AlarmDataRowData[]) => {
    const sortedData = [...newValue]?.sort(sortTime);
    sortedData?.forEach((item, index) => {item.key = index})
    return sortedData
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AppDataContextProvider = ({ children }) => {
    const initializedData = initializeAASData();
    const [appData, setAppData] = useState({...initializedData, alarmData: sortAndIndexAlarms(initializedData?.alarmData)});
    const appDataReference = useRef(appData);
    const updateAppData = (newValue: AASData) => {
        appDataReference.current = newValue;
        setAppData({...newValue, alarmData: sortAndIndexAlarms(newValue?.alarmData)});
    };
    useEffect(() => {
        // console.log("current:",appDataReference.current)
       //connect to API here
    }, []);
    // console.log(`context data: ${appData}, updateAppData: ${updateAppData}, appDataReference: ${appDataReference}`)

    return (
        <AppDataContext.Provider
            value={{ appData, updateAppData, appDataReference }}
        >
            {children}
        </AppDataContext.Provider>
    );
};

const useAppDataContext = () => {
    const context = useContext(AppDataContext);

    if (!context) {
        console.log("NO CONTEXT!");
        throw new Error("useMyContext must be used within a MyContextProvider");
    }

    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppDataContextProvider, useAppDataContext };