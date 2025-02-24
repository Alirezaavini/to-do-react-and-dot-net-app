import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { boolean } from 'yup';

export type LayoutDirectionType = {
    isRtl: boolean;
    toggleDirection: (isRtl: boolean) => void;
};

const LayoutDirectionContext = React.createContext<LayoutDirectionType>({} as any);
export const useLayoutDirection = () => {
    return useContext(LayoutDirectionContext);
};

export const LayoutDirectionProvider = ({ children }: { children: ReactNode }) => {
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
    }, [isRTL]);

    return (
        <LayoutDirectionContext.Provider value={{ isRtl: isRTL, toggleDirection: toggleLayoutDirection }}>
            {children}
        </LayoutDirectionContext.Provider>
    );
};
