import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fa from './fa.json';
import en from './en.json';
import { createContext, useContext } from 'react';
import { code } from '../components/basic/code';
import { T } from '../components/basic/text';

///////////////////////
let dic = { ...en };

for (const ns_name in dic) {
    dic[ns_name] = { ...dic[ns_name] };
    const _en_ns = en[ns_name];
    const ns = dic[ns_name];
    for (const p in ns) {
        if (p) {
            if (_en_ns && _en_ns[p]) ns[p] = _en_ns[p];
            else {
                let en = code
                    .replaceAll(p, '-', ' ')
                    //.replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                    .replace(/^.+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
                    .replace(/Pr\b/g, 'PR')
                    .replace(/Sms\b/g, 'SMS')
                    .replace(/Rfi\b/g, 'RFI')
                    .replace(/Rfp\b/g, 'RFP')
                    .replace(/Ikco\b/g, 'IKCO');
                if (en.split(' ').length < 4) en = en.replace(/\s\w+/g, (w) => ' ' + w[1].toUpperCase() + w.slice(2).toLowerCase());
                ns[p] = en;
            }
        }
    }
}

///////////////////////

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: { en: dic, fa },
        fallbackLng: 'en',
        fallbackNS: ['common', 'messages'],
        saveMissing: true,
        debug: code.isDevelopmentEnv(),

        detection: {
            //order: ["cookie", "path", "querystring", "localStorage", "sessionStorage", "navigator", "htmlTag", "subdomain"],
            order: ['cookie', 'localStorage', 'sessionStorage'],
            caches: ['localStorage', 'cookie'],
        },

        interpolation: { escapeValue: false },
    });

let missingKeys = [];

function missingKeyExists(lng, ns, key) {
    for (let i = 0; i < missingKeys.length; i++) {
        const m = missingKeys[i];
        if (m.lng == lng && m.ns == ns && m.key == key) return true;
    }

    return false;
}

i18n.on('missingKey', function (lngs, ns, key, res) {
    for (let i = 0; i < lngs.length; i++) {
        const lng = lngs[i];
        if (!missingKeyExists(lng, ns, key)) {
            missingKeys.push({ lng, ns, key, res });
        }

        if (code.isDevelopmentEnv || code.isTestEnv) {
            console.error('MISSING TRANSLATE:', ns, key);
        }
    }
});
export default i18n;

export const TContext = createContext();

export const useT = () => useContext(TContext);

export const TProvider = ({ ns = 'common', children }) => {
    const { t } = useTranslation(ns);

    return <TContext.Provider value={{ t, ns }}>{children}</TContext.Provider>;
};

export const TS = ({ ns = 'common', children }) => {
    return (
        <TProvider ns={ns}>
            <T>{children}</T>
        </TProvider>
    );
};
