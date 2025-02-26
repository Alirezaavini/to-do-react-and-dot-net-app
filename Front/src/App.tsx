import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeApp from './pages/home/startup/home-app';
import LoginApp from './pages/account/login/login-app';
import DashboardApp from './pages/dashboard/dashboard-app';
import i18next, { TProvider } from './i18n';
import { useEffect } from 'react';
import settings from './app/settings';
import { useLayoutDirection } from './app/LayoutDirectionContext';

function App() {
    const { toggleDirection } = useLayoutDirection();

    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang);
        i18next.dir(lang);
        toggleDirection(lang === 'fa');
    };

    useEffect(() => {
        changeLanguage(settings.getLanguageCode() ?? 'en');
    }, []);

    return (
        <TProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomeApp />} />
                    <Route path="/login" element={<LoginApp />} />
                    <Route path="/dashboard" element={<DashboardApp />} />
                </Routes>
            </BrowserRouter>
        </TProvider>
    );
}

export default App;
