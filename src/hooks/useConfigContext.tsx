
import { createContext, useContext, useState } from "react";
import { ConfigContextProps } from "../types/ApplicationTypes";

interface MyContextType {
    config: ConfigContextProps;
    updateValue: (newValue: ConfigContextProps) => void;
}

const ConfigContext = createContext<MyContextType | undefined>(undefined);

const ConfigContextProvider = ({children}:{children:any}) => {
    const [config, setConfigContext] = useState({
        baseUrl: "http://73.51.227.102:8080"
    });
    const updateValue = (newValue: ConfigContextProps) => {
        setConfigContext(newValue);
    };
    return (
        <ConfigContext.Provider value={{ config, updateValue }}>
            {children}
        </ConfigContext.Provider>
    );
}

const useConfigContext = () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error('useConfigContext must be used within a ConfigContextProvider');
    }

    return context;
};

export { ConfigContextProvider, useConfigContext };