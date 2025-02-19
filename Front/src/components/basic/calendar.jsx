import * as bd from 'react-basic-design';
import { code } from './code';
import { T, translate } from './text';
import { N } from './n';

/*
    calendar.stringToDate(ymd) + 'T' + calendar.toHHMMSS(time)
*/

function changeCalendar(code) {
    calendar.id = code;
}

const getCalendar = () => (calendar.id === 'shamsi' ? bd.shamsi : bd.miladi);

export const calendar = {
    id: bd.helper.isRTL() ? 'shamsi' : 'miladi',

    //get: () => getCalendar(),
    now: () => calendar.dateToString(new Date()),
    dateToStringHHMM: (date) => (!date ? '' : calendar.dateToString(date) + ' ' + bd.toHHMM(date)),
    parse: (ymd) => getCalendar().parse(ymd),
    addDays: (ymd, days) => getCalendar().addDays(ymd, days),
    addMonths: (ymd, months) => getCalendar().addMonths(ymd, months),
    isValid: (date) => getCalendar().isValid(date),
    getShortDowNames: () => getCalendar().short_dow_names,
    getMonthName: (m) => getCalendar().getMonthName(m),
    DOW: (y, m, d) => getCalendar().DOW(y, m, d),
    daysInMonth: (y, m) => getCalendar().daysInMonth(y, m),

    dateToString: (date) => (!date ? '' : calendar.id === 'shamsi' ? bd.miladi.toShamsi(date) : bd.miladi.format('yyyy/MM/dd', date)),

    calculateTimeDiff: (date) => {
        if (!date) return null;
        const now = new Date();
        const end = new Date(date);

        const diffInMs = Math.floor(end - now);

        if (diffInMs <= 0) return <T className="text-danger small">expired</T>;

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInWeeks = Math.floor(diffInDays / 7);
        const diffInMonths = Math.floor(diffInDays / 30);

        if (diffInMonths > 0) {
            return (
                <T append={translate('month')}>
                    <N>{diffInMonths}</N>
                </T>
            );
        } else if (diffInWeeks > 0) {
            return (
                <T append={translate('week')}>
                    <N>{diffInWeeks}</N>
                </T>
            );
        } else if (diffInDays > 0) {
            return (
                <T append={translate('days')}>
                    <N>{diffInDays}</N>
                </T>
            );
        } else if (diffInHours > 0) {
            return (
                <T append={translate('hours')}>
                    <N>{diffInHours}</N>
                </T>
            );
        } else {
            return (
                <T append={diffInMinutes > 1 ? translate('minutes') : ''}>
                    <N>{diffInMinutes}</N>
                </T>
            );
        }
    },
    stringToDate: (ymd) => {
        ymd = calendar.merge(ymd);
        if (!ymd) return ymd;
        const x = calendar.id === 'shamsi' ? bd.shamsi.toMiladi(ymd) : ymd;
        return code.replaceAll(x, '/', '-') + 'T00:00:00';
    },

    toHHMM: (date) => bd.toHHMM(date),
    change: changeCalendar,

    isDate: function (input) {
        return Object.prototype.toString.call(input) === '[object Date]';
    },

    merge: function (ymd, separator) {
        if (!Array.isArray(ymd)) return ymd;
        if (!separator) separator = '/';
        let [y, m, d] = ymd;
        if (m < 9) m = '0' + m;
        if (d < 9) d = '0' + d;
        return `${y}${separator}${m}${separator}${d}`;
    },

    split: function (ymd) {
        if (calendar.isDate(ymd)) return [ymd.getFullYear(), ymd.getMonth() + 1, ymd.getDate()];
        else if (typeof ymd === 'string') {
            if (ymd.indexOf('-') > 0 && ymd.indexOf('T') > 0) {
                ymd = ymd.trim().split('T')[0].split('-');
            } else {
                ymd = ymd.trim().split(' ')[0].split('/');
            }
        } else if (Array.isArray(ymd) && ymd.length < 3) {
            const a = [];
            for (let i = 0; i < ymd.length; i++) a.push(ymd[i]);
            ymd = a;
            while (ymd.length < 3) ymd.push(1);
        } else if (!Array.isArray(ymd)) return null;
        for (let k = 0; k < ymd.length; k++) ymd[k] = ymd[k] * 1;
        return ymd;
    },
};

// //------
// const IsDate = (input) => Object.prototype.toString.call(input) === "[object Date]";
// const toNumber = (x) => (x < 10 ? "0" + x.toString() : x.toString());

// function toHHMM(ymd) {
//     if (typeof ymd === "string") {
//         const i1 = ymd.indexOf(":");
//         const hh = getNumber(ymd, i1, -1);
//         if (hh === -1) return "";

//         const mm = getNumber(ymd, i1, 1);
//         if (mm === -1) return "";

//         return toNumber(hh) + ":" + toNumber(mm);
//     }

//     if (IsDate(ymd)) return toNumber(ymd.getHours()) + ":" + toNumber(ymd.getMinutes());
//     return "";
// }

// function getNumber(s, i, delta) {
//     i += delta;
//     var cn1 = i >= 0 && i < s.length && s[i] >= "0" && s[i] <= "9" ? s[i] * 1 : -1;
//     i += delta;
//     var cn2 = i >= 0 && i < s.length && s[i] >= "0" && s[i] <= "9" ? s[i] * 1 : 0;
//     if (cn1 === -1) return -1;
//     return delta == -1 ? cn2 * 10 + cn1 : cn1 * 10 + cn2;
// }
