function jsonBeautifier(obj: any, space = 2, replacer = null) {
    if (!obj) return;
    return JSON.stringify(obj, replacer, space);
}

function isDevelopmentEnv() {
    return window.location.host.match(/localhost/g);
}

function isProductionEnv() {
    return !isDevelopmentEnv();
}
export const code = {
    jsonBeautifier,
    isDevelopmentEnv,
    isProductionEnv,
};
