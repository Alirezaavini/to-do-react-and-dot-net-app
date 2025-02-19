import { calendar } from "./calendar";
import { T, translate } from "./text";

function calcImageUrl(baseUrl, url) {
    if (url.indexOf("://") > -1) return url;
    return `${baseUrl}/${url}`;
}

function utf8ToB64(str) {
    return window.btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1);
        })
    );
}

function isValidUserName(username) {
    return !!username && username.length > 3 && /^[0-9a-zA-Z_.-]+$/.test(username);
}

function isDigit(c) {
    return c >= "0" && c <= "9";
}

function isIranPhoneNumber(value) {
    if (!value) return false;
    return value.startsWith("09") || value.startsWith("+98");
}

function isValidIranPhoneNumber(value) {
    if (!value || value === "") return false;

    const regex = /^(0|\+98)?9\d{9}$/;
    return regex.test(value);
}

function isValidPhoneNumber(value) {
    if (!value) return false;
    const n = value.length;
    if (n < 8 || n > 15) return false;
    const c0 = value[0];
    let invalid = (c0 != "+" && !isDigit(c0)) || (c0 == "+" && n < 13) || (c0 == "0" && n != 11) || (c0 != "+" && c0 != "0" && n != 8);
    for (let i = 1; !invalid && i < n; i++) invalid = !isDigit(value[i]);
    return !invalid;
}

function isValidTime(value) {
    if (!value) return false;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(value);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidNationalId(code) {
    return code && code.length == 11;
}

function isValidShebaCode(code) {
    return code && code.trim().length == 30;
}

function isValidPostalCode(code) {
    return code && code.trim().length == 10;
}

function isValidAddress(address) {
    return address && address.trim().length > 2;
}

function isValidNationalCode(code) {
    if (!code) return false;
    var invalid = true;
    for (let i = 1; invalid && i < code.length; i++) invalid = code[i] == code[0];
    if (invalid) return;

    const L = code.length;
    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ("0000" + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    const c = parseInt(code.substr(9, 1), 10);
    let s = 0;
    for (let i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
}

function isValidPersonName(name) {
    if (!name) return false;
    name = name.trim();
    if (name.length < 3 || name.length > 30) return false;
    for (let i = 0; i < name.length; i++) {
        const c = name[i];
        if ("=+|\\'\";:/?.>,<".indexOf(c) >= 0) return false;
    }
    return true;
}

function isValidCompanyName(name) {
    if (!name) return false;
    name = name.trim();
    if (name.length < 3 || name.length > 50) return false;
    for (let i = 0; i < name.length; i++) {
        const c = name[i];
        if ("=+|\\'\";:/?.>,<".indexOf(c) >= 0) return false;
    }
    return true;
}

function getDayDifference(date1, date2) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const timeDiff = date1.getTime() - date2.getTime();
    const dayDiff = Math.ceil(timeDiff / oneDayInMilliseconds);
    return dayDiff;
}

function areAllCharactersDigits(text) {
    return /^\d+$/.test(text);
}

function isValidTaxId(value) {
    if (!areAllCharactersDigits(value)) return false;
    return value.length == 22;
}

function isValidDate(value) {
    if (!value) return false;
    var dt = new Date(value);
    if (dt.getFullYear() <= 1) return false;
    return true;
}

function getMonitorUrl(documentType, documentSerial, projectSerial) {
    //get monitor url by type
    if (documentType === "EVENT") return "/event/monitor?serial=" + documentSerial;
    if (documentType === "PUWS") return "/project/monitor?serial=" + projectSerial;
    return "";
}

function replaceAll(str, find, replace) {
    if (str === null || str === undefined) return str;
    if (typeof str !== "string") str = str.toString();
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numbers(x) {
    return x?.toString().replace(/[^0-9]/g, "");
}

function localNumbers(txt) {
    if (txt === undefined || txt === null || txt === "") return txt;
    if (typeof txt === "number") txt = txt.toString();
    else if (typeof txt !== "string") return txt;
    // if (!bd.helper.isRTL()) return txt;
    const res = [...txt].map((x) => (x < "0" || x > "9" ? x : String.fromCharCode(1632 + +x)));
    return res.join("");
}

function eq(s1, s2) {
    if (s1 == s2) return true;
    if (!s1 || !s2) return false;
    s1 = code.replaceAll(s1, "ی", "ي");
    s1 = code.replaceAll(s1, "ک", "ك");

    s2 = code.replaceAll(s2, "ی", "ي");
    s2 = code.replaceAll(s2, "ک", "ك");
    return s1?.toUpperCase() == s2?.toUpperCase();
}

function defineYupMethods(yup) {
    yup.addMethod(yup.string, "validPhone", function (errorMessage) {
        if (!errorMessage) errorMessage = "invalid-phone-number";
        return this.test("test-validPhone", errorMessage, function (value) {
            if (!value) return true;
            return isValidPhoneNumber(value);
        });
    });

    yup.addMethod(yup.string, "validDate", function (errorMessage) {
        if (!errorMessage) errorMessage = "invalid-date";
        return this.test("test-validDate", errorMessage, function (value) {
            if (!value) return true;
            return calendar.isValid(value);
        });
    });

    yup.addMethod(yup.string, "greaterThanDate", function (fromDate, errorMessage) {
        if (!errorMessage) errorMessage = translate("must-be-greater-than") + " " + calendar.dateToString(fromDate);
        return this.test(`test-greaterThanDate`, errorMessage, function (value) {
            if (!value) return true;
            return calendar.dateToString(value) > calendar.dateToString(fromDate);
        });
    });

    yup.addMethod(yup.string, "greaterThanEqualDate", function (fromDate, errorMessage) {
        if (!errorMessage) errorMessage = translate("must-be-greater-than-equal") + " " + calendar.dateToString(fromDate);
        return this.test(`test-greaterThanEqualDate`, errorMessage, function (value) {
            if (!value) return true;
            return calendar.dateToString(value) >= calendar.dateToString(fromDate);
        });
    });

    yup.addMethod(yup.string, "lessThanDate", function (fromDate, errorMessage) {
        if (!errorMessage) errorMessage = translate("must-be-less-than") + " " + calendar.dateToString(fromDate);
        return this.test(`test-lessThanDate`, errorMessage, function (value) {
            if (!value) return true;
            return calendar.dateToString(value) < calendar.dateToString(fromDate);
        });
    });

    yup.addMethod(yup.string, "lessThanEqualDate", function (fromDate, errorMessage) {
        if (!errorMessage) errorMessage = translate("must-be-less-than-equal") + " " + calendar.dateToString(fromDate);
        return this.test(`test-lessThanEqualDate`, errorMessage, function (value) {
            if (!value) return true;
            return calendar.dateToString(value) <= calendar.dateToString(fromDate);
        });
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value, expDays) {
    let expires = "";
    if (expDays) {
        const d = new Date();
        d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
        expires = "; expires=" + d.toUTCString();
    }
    document.cookie = name + "=" + value + expires + ";path=/";
}

function camelize(str) {
    if (str === str?.toUpperCase()) return str.toLowerCase();

    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        if (index === 1 && match === match?.toUpperCase()) return match.toLowerCase();
        if (index === 2 && match === match?.toUpperCase()) return match.toLowerCase();
        // if (index === 3 && match === match?.toUpperCase()) return match.toLowerCase();
        return index === 0 ? match.toLowerCase() : match?.toUpperCase();
    });
}

function pascalize(str) {
    return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? " " : "") + match);
}

function snakeToCamel(str) {
    return str.toLowerCase().replace(/([-_][a-z])/g, (group) => group?.toUpperCase().replace("-", ""));
}

function ToKebabCase(str) {
    let result = str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    if (result.charAt(0) === "-") {
        result = result.slice(1);
    }
    return result;
}

function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function jsonBeautifier(obj, space = 2, replacer = null) {
    if (!obj) return;
    return JSON.stringify(obj, replacer, space);
}

function updateDocumentTitle(title) {
    if (!title || !title.endsWith("App")) return;
    title = title.substring(0, title.length - 3);
    if (document.title != title) document.title = pascalize(translate(title)) + " | IPN";
}
function minuteToTime(num) {
    let hours = Math.floor(num / 60).toString();
    let minutes = (num % 60).toString();

    if (hours.length <= 1) hours = "0" + hours;
    if (minutes.length <= 1) minutes = "0" + minutes;

    return `${hours}:${minutes}`;
}

function distinct(list) {
    return list.filter((value, index, self) => self.indexOf(value) === index);
}

function generateUniqueId() {
    let id = "";
    const length = 10;
    const characters = "0123456789";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return id;
}

function addLeadingZeros(value, length) {
    if (value.length < length) {
        const zerosToAdd = length - value.length;
        let result = "";
        for (let i = 0; i < zerosToAdd; i++) {
            result += "0";
        }
        result += value;
        return result;
    } else {
        return value;
    }
}

//
function drawTextInMiddle(ctx, text, color, w, h) {
    ctx.restore();
    const fontSize = (h / 80).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "center";
    // ctx.textAlign = bd.helper.isRTL() ? "end" : "start";
    ctx.fillStyle = color;
    const x = ((w - ctx.measureText(text).width) / 2).toFixed();
    const y = (h / 2 + 5).toFixed();
    ctx.fillText(text, x, y);
    ctx.save();
}

function arrayGroupBy(list, key) {
    return list.reduce(function (acc, obj) {
        var keyValue = obj[key];
        if (!acc[keyValue]) {
            acc[keyValue] = [];
        }
        acc[keyValue].push(obj);
        return acc;
    }, {});
}

function getReturnUrl() {
    const loc = window.location;
    return encodeURIComponent(loc.pathname + loc.search);
}

// function ifRTL(rtlValue, ltrValue) {
//     return bd.helper.isRTL() ? rtlValue ?? ltrValue : ltrValue ?? ltrValue;
// }

function blink(elem, scrollIntoCenter) {
    if (!elem) return;
    if (scrollIntoCenter) elem.scrollIntoView({ block: "center", behavior: "smooth" });
    elem.classList.add("alert-warning", "text-blink");

    setTimeout(() => {
        elem.classList.remove("alert-warning", "text-blink");
    }, 2000);
}

function stopPropagationFunc(ev) {
    ev && ev.preventDefault();
    ev && ev.stopPropagation();
}

// function alert(msg) {
//     bd.msgbox(
//         null,
//         msg,
//         [
//             {
//                 title: <T>close</T>,
//             },
//         ],
//         {
//             className: "modal-n",
//             backdropClassName: "modal-n",
//         }
//     );
// }

function addRange(list, items) {
    items.forEach((x) => list.push(x));
}

function getProperties(obj) {
    const list = [];
    for (var p in obj) {
        list.push(p);
    }
    return list;
}

function toArabicString(value) {
    value = replaceAll(value, "ی", "ي");
    value = replaceAll(value, "ک", "ك");
    return value;
}

function toInt(p, defaultValue) {
    return !p ? 0 : +p;
}

function formatDecimalNumber(num) {
    if (!num) return;
    return num % 1 === 0 ? num.toString() : num.toFixed(1);
}
export const code = {
    /*
        isDevelopmentEnv: () => window.location.host.match(/localhost/g),
        isTestEnv: () => window.location.host.match(/test\.ikco\.ir/g),
        isStgEnv: () => window.location.host.match(/stg\.ikco\.ir/g),
        isSecEnv: () => !code.isTestEnv() && window.location.host.match(/\.ikco\.sec/g),
        isProductionEnv: () => !code.isDevelopmentEnv() && !code.isTestEnv() && !code.isSecEnv() && !code.isStgEnv(),
    */

    //tamin environment (old domain name) functions
    // isTaminTestEnv: () => window.location.host.match(/tamintest\.ikco\.ir/g),
    // isTaminStgEnv: () => window.location.host.match(/taminstg\.ikco\.ir/g),
    // isTaminSecEnv: () => window.location.host.match(/tamintest\.ikco\.sec/g),
    // isTaminProductionEnv: () => window.location.host.match(/tamin\.ikco\.ir/g),

    //ipn environment (new domain name) functions
    isIPNTestEnv: () => window.location.host.match(/ipntest\.ikco\.ir/g),
    isIPNStgEnv: () => window.location.host.match(/ipnstg\.ikco\.ir/g),
    isIPNSecEnv: () => window.location.host.match(/ipntest\.ikco\.sec/g),
    isIPNProductionEnv: () => window.location.host.match(/ipn\.ikco\.ir/g),

    //shared environments functions
    // isTestEnv: () => code.isTaminTestEnv() || code.isIPNTestEnv(),
    // isStgEnv: () => code.isTaminStgEnv() || code.isIPNStgEnv(),
    // isSecEnv: () => code.isTaminSecEnv() || code.isIPNSecEnv(),
    // isDevelopmentEnv: () => window.location.host.match(/localhost/g),
    // isProductionEnv: () => !code.isDevelopmentEnv() && !code.isTestEnv() && !code.isSecEnv() && !code.isStgEnv(),

    //shared environments functions
    isTestEnv: () => code.isIPNTestEnv(),
    isStgEnv: () => code.isIPNStgEnv(),
    isSecEnv: () => code.isIPNSecEnv(),
    isDevelopmentEnv: () => window.location.host.match(/localhost/g),
    isProductionEnv: () => !code.isDevelopmentEnv() && !code.isTestEnv() && !code.isSecEnv() && !code.isStgEnv(),

    ifRTL,
    getEnvName: () => (code.isDevelopmentEnv() ? "Development" : code.isTestEnv() ? "Test" : code.isSecEnv() ? "Security" : "Production"),

    utf8ToB64,
    isValidTime,
    validateEmail,
    isValidUserName,
    isValidNationalId,
    isValidShebaCode,
    isValidPostalCode,
    isValidAddress,
    isValidNationalCode,
    isIranPhoneNumber,
    isValidIranPhoneNumber,
    isValidPhoneNumber,
    isValidPersonName,
    isValidCompanyName,
    getMonitorUrl,
    camelize,
    pascalize,
    snakeToCamel,
    minuteToTime,
    camelToSnakeCase,
    replaceAll,
    numberWithCommas,
    localNumbers,
    eq,
    defineYupMethods,
    getCookie,
    setCookie,
    updateDocumentTitle,
    distinct,
    numbers,
    generateUniqueId,
    addLeadingZeros,
    jsonBeautifier,
    //
    drawTextInMiddle,
    ToKebabCase,
    arrayGroupBy,
    calcImageUrl,
    isValidDate,

    getReturnUrl,
    isValidTaxId,
    getDayDifference,
    blink,
    stopPropagationFunc,
    alert,
    addRange,
    getProperties,
    toArabicString,
    toInt,
    formatDecimalNumber,
};
