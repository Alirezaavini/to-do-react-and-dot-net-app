import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useLayoutDirection } from '../../app/LayoutDirectionContext';
import settings from '../../app/settings';
import { T } from './text';

function SelectLanguage() {
    const defaultLanguageCode = 'en';
    const [currentLanguageCode, setCurrentLanguageCode] = useState(settings.getLanguageCode() || defaultLanguageCode);
    const { isRtl, toggleDirection } = useLayoutDirection();

    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang);
        i18next.dir(lang);
        toggleDirection(lang === 'fa');
        setCurrentLanguageCode(lang);
    };

    useEffect(() => {
        changeLanguage(settings.getLanguageCode() ?? defaultLanguageCode);
    }, []);

    return (
        <div className="flex flex-row gap-2 align-middle items-center">
            <Popover className="relative">
                <PopoverButton className="d-flex flex-row p-2 dark:text-white"> {currentLanguageCode.toUpperCase()}</PopoverButton>
                <PopoverPanel
                    anchor="bottom end"
                    className="flex flex-col bg-stone-800 text-white rounded-md dark:bg-indigo-800 dark:text-white z-50 me-3">
                    <PopoverButton
                        className="block ext-sm dark:text-gray-200 data-focus:bg-gray-100 data-focus:text-gray-900 p-4 text-white"
                        onClick={() => changeLanguage('en')}>
                        English
                    </PopoverButton>
                    <PopoverButton
                        className="block text-sm dark:text-gray-200 p-4 data-focus:bg-gray-100 data-focus:text-gray-900 text-white"
                        onClick={() => changeLanguage('fa')}>
                        فارسی
                    </PopoverButton>
                </PopoverPanel>
            </Popover>
        </div>
    );
}

export default SelectLanguage;
