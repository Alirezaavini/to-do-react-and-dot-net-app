import { code } from '../components/basic/code';

type ApiConfigType = {
    host?: string;
    localeUrl?: string;
    baseUrl?: string;
    accountUrl?: string;
    toDoUrl?: string;
};

const port = '44367';

const host = code.isDevelopmentEnv() ? 'https://localhost:' + port + '/api' : code.isProductionEnv() ? 'https://wsIPN.ikco.ir' : '';

export const apiConfig: ApiConfigType = {
    host: host,
    localeUrl: host,
    baseUrl: host,
    accountUrl: host + '/authentication',
    toDoUrl: host + '/todo',
};
