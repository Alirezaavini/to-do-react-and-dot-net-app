import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeApp from './pages/home/startup/home-app';
import LoginApp from './pages/account/login/login-app';
import DashboardApp from './pages/dashboard/dashboard-app';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeApp />} />
                <Route path="/login" element={<LoginApp />} />
                <Route path="/dashboard" element={<DashboardApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
