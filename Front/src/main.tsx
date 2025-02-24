import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LayoutDirectionProvider } from './app/LayoutDirectionContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LayoutDirectionProvider>
            <App />
        </LayoutDirectionProvider>
    </StrictMode>
);
