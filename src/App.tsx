import {BrowserRouter, Route, Routes} from 'react-router'
import './App.css'
import Login from "./pages/login/Login.tsx";
import {AlarmContainerWithRouting} from "./pages/alarm/AlarmContainerWithRouting.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import {SlideShowContainer} from "./pages/slideshow/SlideShowContainer.tsx";
import {CalendarContainer} from "./pages/calendar/CalendarContainer.tsx";
import {AppDataContextProvider} from "./context/AppDataContext.tsx";
import {ConfigureAlarmsPage} from "./pages/alarm/components/ConfigureAlarmsPage.tsx";

function App() {

  return (
      <BrowserRouter>
          <AppDataContextProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/alarm/*" element={<AlarmContainerWithRouting />}/>
                <Route path="/alarm/configureAlarms" element={<ConfigureAlarmsPage />}/>
                <Route path="/slideshow" element={<SlideShowContainer/>}/>
                <Route path="/calendar" element={<CalendarContainer/>}/>
            </Routes>
          </AppDataContextProvider>
      </BrowserRouter>  )
}

export default App
