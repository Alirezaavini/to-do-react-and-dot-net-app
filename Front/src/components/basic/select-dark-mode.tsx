import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { EyeIcon, MoonIcon, SunIcon, UserIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import settings from '../../app/settings';

function SelectDarkMode() {
    const defaultDarkMode = 'system';
    const [darkMode, setDarkMode] = useState(settings.getDarkMode() || defaultDarkMode);

    const changeDarkModel = (mode: string) => {
        switch (mode) {
            case 'dark':
                localStorage.theme = 'dark';
                break;
            case 'light':
                localStorage.theme = 'light';
                break;
            case 'system':
                localStorage.removeItem('theme');
                break;
        }

        document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );

        setDarkMode(mode);
    };

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
    }, []);

    function getDarkModelIcont(mode: string) {
        switch (mode) {
            case 'dark':
                return <MoonIcon className="size-5" />;
            case 'light':
                return <SunIcon className="size-5" />;
            case 'system':
                return <UserIcon className="size-5" />;
        }

        return <></>;
    }

    return (
        <div className="flex flex-row gap-2 align-middle items-center">
            <Popover className="relative">
                <PopoverButton className="d-flex flex-row p-2 dark:text-white">{getDarkModelIcont(darkMode)}</PopoverButton>
                <PopoverPanel
                    anchor="bottom"
                    className="flex flex-col bg-stone-800 text-white rounded-md dark:bg-indigo-800 dark:text-white z-50">
                    <PopoverButton
                        className="block ext-sm dark:text-gray-200 data-focus:bg-gray-100 data-focus:text-gray-900 p-4 text-white"
                        onClick={() => changeDarkModel('dark')}>
                        {getDarkModelIcont('dark')}
                    </PopoverButton>
                    <PopoverButton
                        className="block text-sm dark:text-gray-200 p-4 data-focus:bg-gray-100 data-focus:text-gray-900 text-white"
                        onClick={() => changeDarkModel('light')}>
                        {getDarkModelIcont('light')}
                    </PopoverButton>
                    <PopoverButton
                        className="block text-sm dark:text-gray-200 p-4 data-focus:bg-gray-100 data-focus:text-gray-900 text-white"
                        onClick={() => changeDarkModel('light')}>
                        {getDarkModelIcont('system')}
                    </PopoverButton>
                </PopoverPanel>
            </Popover>
        </div>
    );
}

export default SelectDarkMode;
