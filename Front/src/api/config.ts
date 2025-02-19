import { code } from '../components/basic/code';

type ApiConfigType = {
    host?: string;
    localeUrl?: string;
    baseUrl?: string;
    accountUrl?: string;
};

//const port = "5001";
const port = '44346'; //proxy port

const host = code.isDevelopmentEnv()
    ? // ipn back url
      'https://localhost:' + port
    : code.isProductionEnv()
    ? 'https://wsIPN.ikco.ir'
    : '';

export const apiConfig: ApiConfigType = {
    host: host,
    localeUrl: host,
    baseUrl: host,
    accountUrl: host + '/authentication',
};
