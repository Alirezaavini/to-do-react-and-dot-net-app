import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useLayoutDirection } from '../../app/LayoutDirectionContext';
import settings from '../../app/settings';

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
            <div>
                <select
                    id="lang"
                    name="lang"
                    onChange={(e) => {
                        changeLanguage(e.target.value);
                    }}
                    defaultValue={currentLanguageCode}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:text-gray-200 dark:ring-gray-400 dark:bg-gray-800">
                    <option>fa</option>
                    <option>en</option>
                </select>
            </div>

            {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                        Options
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                    </MenuButton>
                </div>
            </Menu> */}
        </div>
    );
}

export default SelectLanguage;
