import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import {Login} from "./pages/login/Login.tsx";
import {AlarmContainerWithRouting} from "./pages/alarm/AlarmContainerWithRouting.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import {SlideShowContainer} from "./pages/slideshow/SlideShowContainer.tsx";
import {AppDataContextProvider} from "./context/AppDataContext.tsx";
import {CalendarContainerWithRouting} from "./pages/calendar/CalendarContainerWithRouting.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigContextProvider} from "./hooks/useConfigContext.tsx";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            retry: false
        }
    }
});
function App() {
  return (
      <BrowserRouter>
          <ConfigContextProvider>
              <QueryClientProvider client={queryClient}>
                  <AppDataContextProvider>
                      <Routes>
                          <Route path="/" element={<Login />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<SignUp />} />
                          <Route path="/alarm/*" element={<AlarmContainerWithRouting />}/>
                          <Route path="/slideshow/*" element={<SlideShowContainer/>}/>
                          <Route path="/calendar/*" element={<CalendarContainerWithRouting/>}/>
                      </Routes>
                  </AppDataContextProvider>
              </QueryClientProvider>
          </ConfigContextProvider>
      </BrowserRouter>  )
}

export default App
