export const API_HOST = 'http://127.0.0.1:8000';

export enum ApiPathNames {
    SIGNUP,
    SIGNIN,
    LOGOUT,
    TRACK_UPLOAD
}

export const apiPaths = {
    [ApiPathNames.SIGNUP]: '/auth/signup',
    [ApiPathNames.SIGNIN]: '/auth/signin',
    [ApiPathNames.LOGOUT]: '/auth/signout',
    [ApiPathNames.TRACK_UPLOAD]: '/track/upload',

    getPath(key: ApiPathNames) {
        return `${API_HOST}${this[key]}`
    }
};

export const AUTH_PATH = '/auth';
export const REGISTER_PATH = `${AUTH_PATH}/register`
export const MAIN_PATH = '/main';

export const ACCESS_TOKEN_LS_KEY = 'audio-utils-app-access-token';
export const REFRESH_TOKEN_LS_KEY = 'audio-utils-app-refresh-token';