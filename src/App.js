import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainMenuPage from './pages/mainmenupage'
import { Route, Routes, } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Intropage from './pages/intropage';
import WelcomePage from './pages/welcomepage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Intropage />} />
            <Route path="/welcome/" element={<WelcomePage />} />
            <Route path="/welcome/:musicAuthCode" element={<WelcomePage />} />
            <Route path="/menu" element={<MainMenuPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default App;