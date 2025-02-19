import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeApp from './pages/home/startup/home-app';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
