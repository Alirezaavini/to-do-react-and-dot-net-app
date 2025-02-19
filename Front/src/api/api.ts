import { translate } from '../components/basic/text';
import { code } from '../components/basic/code';
import axios from 'axios';
import { apiConfig } from './config';

type CallbackFunc = (x: unknown) => void;
type RequestType = {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    payload: any;
    headers: any;
};

const withCredentials = true;
const blockedUrls: string[] = [];
let lastRequestInfo: RequestType = { url: '', payload: {}, headers: {}, method: 'post' };
let onUnauthorizeHandler: null | CallbackFunc = null;
let onForbiddenHandler: null | CallbackFunc = null;

const recordLastRequest = (response: any) => {
    try {
        const { url, data, headers, method } = response.config;
        lastRequestInfo = {
            url: url,
            payload: data ? code.jsonBeautifier(JSON.parse(data)) : null,
            headers: code.jsonBeautifier(headers),
            method,
        };
    } catch {}
};

const genericeResponseHandler = (response: any) => {
    recordLastRequest(response);
    var data = response.data;
    if (!data) throw new Error('invalid response!');
    if (!data.isSuccess) {
        if (data.errorMessage === '401' || data.errorCode === '401') throw newError(translate('401-unauthorized-access'), '401', 200);
        if (data.errorMessage === '403' || data.errorCode === '403') throw newError(translate('403-forbidden-access'), '403', 200);
        throw newError(data.errorMessage, 'error', 200, null, data.errorParams);
    }
    return data.result;
};

function newError(message: string, name: string, httpStatus?: number, stack?: any, errorParams?: any) {
    var ex = new Error(message);
    var ex_any = ex as any;
    if (!!name) ex.name = name;
    if (!!httpStatus) ex_any.httpStatus = httpStatus;
    if (!!stack) ex.stack = stack;
    ex.stack = undefined;
    ex_any.errorParams = errorParams;
    return ex;
}

function translateError(ex: any) {
    if (!ex) throw newError(translate('unknown-error'), 'Unknown');

    if (ex.response) {
        if (ex.response.status === 401) throw newError(translate('401-unauthorized-access'), '401', 401);
        if (ex.response.status === 403) throw newError(translate('403-forbidden-access'), '403', 403);
        if (ex.response.status === 404) throw newError(translate('404-resource-not-found'), '404', 404);
        if (ex.response.status === 405) throw newError(translate('405-method-not-allowed'), '405', 405);
        if (ex.response.status === 500) throw newError(translate('500-server-error'), '500', 500);
    }
    if (ex instanceof Error) {
        if (ex.name === '401' || ex.name === '403') throw ex;
    }

    var message = ex.message ? ex.message : ex.toString ? ex.toString() : ex;
    var stack = ex.stack;
    var httpStatus = ex.httpStatus;

    if (message === 'Network Error') {
        throw newError(translate('service-is-not-available'), 'NetworkError', httpStatus, stack);
    }
    if (message.startsWith("Failed to execute 'open' on 'XMLHttpRequest': Invalid URL"))
        throw newError(translate('invalid-url'), 'InvalidUrl', httpStatus, stack);
    throw newError(translate(message, ex.errorParams), 'Error', httpStatus);
}

function callAxios(method: string, url: string, data?: any, headers?: any, token?: string | null) {
    if (!token) token = apiData.token;

    headers = { ...headers, authorization: 'Bearer ' + token };
    return axios({ url, data, withCredentials, method, headers }).then(genericeResponseHandler).catch(translateError);
}

function dispatchUnauthorized(ex: any) {
    if (onUnauthorizeHandler) onUnauthorizeHandler(ex);
}

function dispatchForbidden(ex: any) {
    if (ex.httpStatus === 403) handleWAFError();
    if (onForbiddenHandler) onForbiddenHandler(ex);
}

function handleWAFError() {
    const url = lastRequestInfo.url;

    if (!url) return;
    var u = url.split('?')[0];
    if (blockedUrls.indexOf(u) >= 0) return;

    //logsApi.logWafError(lastRequestInfo).catch(() => {});
    blockedUrls.push(u);
}
//
//
//
type ApiData = {
    token?: string;
    expiry?: number;
    userName?: string;
    companyId?: number;
    chartUserRoleSerial?: number;
};

type ApiType = {
    getToken: () => string | undefined;
    getData: () => ApiData;
    setData: (x: ApiData) => void;

    onUnauthorized: (fn: any) => void;
    onForbidden: (fn: any) => void;
    handleWAFError: (url: string) => void;
    post: (url: string, data?: any, headers?: any) => Promise<any>;
    call: (method: string, url: string, data?: any, headers?: any, token?: string) => Promise<any>;
    directCall: (method: string, url: string, data?: any, headers?: any, token?: string) => Promise<any>;
    callAxios: (method: string, url: string, data?: any, headers?: any, token?: string) => Promise<any>;
};

let apiData: ApiData = {
    token: '',
    expiry: 0,
    userName: '',
    companyId: 0,
    chartUserRoleSerial: 0,
};

function normalizeUrl(url: string) {
    const i = url.indexOf('?');
    if (i == -1) return url;
    const p1 = url.substring(0, i);
    const p2 = url.substring(i + 1);
    const list: string[] = [];
    p2.split('&').forEach((x) => {
        const ieq = x.indexOf('=');
        if (ieq <= 0) list.push(x.trim());
        else {
            const n = x.substring(0, ieq);
            const v = x.substring(ieq + 1);
            list.push(`${n}=${v.trim()}`);
        }
    });
    return p1.trim() + '?' + list.join('&');
}

function normalizePayload(values: any) {
    if (!values) return values;
    const t = typeof values;

    if (t == 'string') return values.trim();

    if (Array.isArray(values)) {
        for (let i = 0; i < values.length; i++) {
            values[i] = normalizePayload(values[i]);
        }
    } else if (t == 'object') {
        for (var n in values) {
            values[n] = normalizePayload(values[n]);
        }
    }
    return values;
}

export const api: ApiType = {
    getToken: () => apiData.token,
    getData: () => apiData,
    setData: (d: ApiData) => (apiData = d),

    onUnauthorized: (fn?: any) => (onUnauthorizeHandler = fn),
    onForbidden: (fn?: any) => (onForbiddenHandler = fn),
    handleWAFError: () => handleWAFError(),

    post: (url: string, data?: any, headers?: any) => api.call('post', apiConfig.baseUrl + url, data, headers),

    call: (method: string, url: string, data?: any, headers?: any, token?: string) => {
        url = normalizeUrl(url);
        data = normalizePayload(data);

        return new Promise((resolve, reject) => {
            const handle_reject = (ex: any) => {
                if (ex.name === '401') {
                    dispatchUnauthorized(ex);
                    ex.handled = true;
                } else if (ex.name === '403') {
                    dispatchForbidden(ex);
                    ex.handled = true;
                }

                reject(ex);
            };

            const handle_resolve = (data: any) => resolve(data);

            return callAxios(method, url, data, headers, token)
                .then(handle_resolve)
                .catch((ex) => {
                    if (ex.name !== '401') handle_reject(ex);
                    else {
                        callAxios('post', apiConfig.accountUrl + '/refresh')
                            .then((result) => {
                                apiData.token = result.token;
                                apiData.expiry = result.expiry;

                                if (apiData.userName != result.userName || apiData.companyId != result.companyId) {
                                    handle_reject(newError('401', '401', 200));
                                }

                                callAxios(method, url, data, headers, token).then(handle_resolve).catch(handle_reject);
                            })
                            .catch(handle_reject);
                    }
                });
        });
    },

    directCall: (method: string, url: string, data?: any, headers?: any, token?: string) =>
        callAxios(method, url, data, headers, token).catch((ex) => {
            if (ex.name === '401') {
                dispatchUnauthorized(ex);
                ex.handled = true;
            }

            if (ex.name === '403') {
                dispatchForbidden(ex);
                ex.handled = true;
            }

            throw ex;
        }),

    callAxios,
};
