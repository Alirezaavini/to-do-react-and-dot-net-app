import { LanguageIcon } from '@heroicons/react/24/outline';
import { T } from './text';
import { useState } from 'react';
import settings from '../../app/settings';
import i18next from 'i18next';
import { useLayoutDirection } from '../../app/LayoutDirectionContext';

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

    return (
        <div className="flex flex-row gap-2 align-middle items-center">
            <div>
                <select
                    id="lang"
                    name="lang"
                    onChange={(e) => {
                        changeLanguage(e.target.value);
                    }}
                    defaultValue={currentLanguageCode}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option>fa</option>
                    <option>en</option>
                </select>
            </div>
        </div>
    );
}

export default SelectLanguage;
