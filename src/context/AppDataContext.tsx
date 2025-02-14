import {createContext, MutableRefObject, useContext, useEffect, useRef, useState} from "react";
import {AASData} from "../types/ApplicationTypes.tsx";
import {initializeAASData} from "../utilities/initializers.tsx";

interface MyContextType {
    appData: AASData;
    updateAppData: (newValue: AASData) => void;
    appDataReference: MutableRefObject<AASData>;
}

const AppDataContext = createContext<MyContextType | undefined>(undefined);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AppDataContextProvider = ({ children }) => {
    const [appData, setAppData] = useState(initializeAASData());
    const appDataReference = useRef(appData);
    const updateAppData = (newValue: AASData) => {
        appDataReference.current = newValue;

        setAppData(newValue);
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

export { AppDataContextProvider, useAppDataContext };