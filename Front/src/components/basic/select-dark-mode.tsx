import { LanguageIcon } from '@heroicons/react/24/outline';
import { T } from './text';
import { useEffect, useState } from 'react';
import settings from '../../app/settings';
import i18next from 'i18next';
import { useLayoutDirection } from '../../app/LayoutDirectionContext';

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

    return (
        <div className="flex flex-row gap-2 align-middle items-center">
            <div>
                <select
                    id="lang"
                    name="lang"
                    onChange={(e) => {
                        changeDarkModel(e.target.value);
                    }}
                    defaultValue={darkMode}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300
                     focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:ring-gray-400 dark:bg-gray-800">
                    <option>
                        <T>dark</T>
                    </option>
                    <option>
                        <T>light</T>
                    </option>
                    <option>
                        <T>system</T>
                    </option>
                </select>
            </div>
        </div>
    );
}

export default SelectDarkMode;
