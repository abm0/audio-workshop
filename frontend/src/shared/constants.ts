export const API_HOST = 'http://127.0.0.1:8000';

export enum ApiPathNames {
    SIGNUP,
    SIGNIN,
    LOGOUT,
    TRACK_UPLOAD,
    TRACK_UPDATE,
    TRACKS_LIST,
}

/**
 * Список эндпоинтов на сервере
 */
export const apiPaths = {
    [ApiPathNames.SIGNUP]: '/auth/signup',
    [ApiPathNames.SIGNIN]: '/auth/signin',
    [ApiPathNames.LOGOUT]: '/auth/signout',
    [ApiPathNames.TRACK_UPLOAD]: '/track/upload',
    [ApiPathNames.TRACK_UPDATE]: '/track/update',
    [ApiPathNames.TRACKS_LIST]: '/track/list',

    getPath(key: ApiPathNames) {
        return `${API_HOST}${this[key]}`
    }
};

/**
 * Список путей для клиентского роутинга
 */
export const AUTH_PATH = '/auth';
export const REGISTER_PATH = `${AUTH_PATH}/register`
export const MAIN_PATH = '/main';

/**
 * Ключи для хранения токенов в local storage
 */
export const ACCESS_TOKEN_LS_KEY = 'audio-utils-app-access-token';
export const REFRESH_TOKEN_LS_KEY = 'audio-utils-app-refresh-token';