import { code } from '../components/basic/code';

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const settings = {
    projectId: 'to-do',
    title: 'To Do App',
    version: 'v1',
    missingTranslations: {},

    tableCellTextTruncateLength: 100,

    logMissings: () => console.log(JSON.stringify(settings.missingTranslations, null, 2)),

    getLanguageCode: () => getCookie('i18next'),
    getAppVersion: () => {
        var appInfo = localStorage.getItem('appinfo');
        try {
            if (!appInfo) return 0;
            return JSON.parse(appInfo).version ?? 0;
        } catch {
            return 0;
        }
    },

    getChatRefreshDuration: () => (code.isDevelopmentEnv() ? 90 * 1000 : 90 * 1000),
};

export default settings;
