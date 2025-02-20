function jsonBeautifier(obj: any, space = 2, replacer = null) {
    if (!obj) return;
    return JSON.stringify(obj, replacer, space);
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);
    if (parts.length === 2 && parts != undefined) return parts.pop().split(';').shift();
}

function setCookie(name: string, value: string, expDays: any | null = null) {
    let expires = '';
    if (expDays) {
        const d = new Date();
        d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
        expires = '; expires=' + d.toUTCString();
    }
    document.cookie = name + '=' + value + expires + ';path=/';
}

function localNumbers(txt: any) {
    if (txt === undefined || txt === null || txt === '') return txt;
    if (typeof txt === 'number') txt = txt.toString() ?? '';
    else if (typeof txt !== 'string') return txt;
    const res = [...txt].map((x) => (x < '0' || x > '9' ? x : String.fromCharCode(1632 + +x)));
    return res.join('');
}

function isDevelopmentEnv() {
    return window.location.host.match(/localhost/g);
}

function isProductionEnv() {
    return !isDevelopmentEnv();
}

function replaceAll(str: any, find: string, replace: string) {
    if (str === null || str === undefined) return str;
    if (typeof str !== 'string') str = str.toString();
    function escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export const code = {
    jsonBeautifier,
    isDevelopmentEnv,
    isProductionEnv,
    setCookie,
    getCookie,
    localNumbers,
    replaceAll,
};
