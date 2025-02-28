import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { boolean } from 'yup';

export type LayoutDirectionType = {
    isRtl: boolean;
    toggleDirection: (isRtl: boolean) => void;
};

const ThemeContext = React.createContext<LayoutDirectionType>({} as any);
export const useLayoutDirection = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isRTL, setIsRTL] = useState<boolean>(() => {
        const storedIsRTL = localStorage.getItem('isRTL');
        return storedIsRTL === 'true';
    });

    const toggleLayoutDirection = (isRtl: boolean) => {
        setIsRTL(isRtl);
    };

    useEffect(() => {
        const rootHtml = document.getElementById('root-html');
        if (rootHtml) {
            rootHtml.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        }
        document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    }, [isRTL]);

    return <ThemeContext.Provider value={{ isRtl: isRTL, toggleDirection: toggleLayoutDirection }}>{children}</ThemeContext.Provider>;
};
