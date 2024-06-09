export const API_HOST = 'http://127.0.0.1:8000';

export enum ApiPathNames {
    SIGNUP,
    SIGNIN,
    LOGOUT,
    TRACK_MANAGE,
    TRACKS_LIST,
    MEDIA,
    TRACK_PROCESSING,
}

/**
 * Список эндпоинтов на сервере
 */
export const apiPaths = {
    [ApiPathNames.SIGNUP]: '/auth/signup',
    [ApiPathNames.SIGNIN]: '/auth/signin',
    [ApiPathNames.LOGOUT]: '/auth/signout',
    [ApiPathNames.TRACK_MANAGE]: '/track/manage',
    [ApiPathNames.TRACKS_LIST]: '/track/list',
    [ApiPathNames.MEDIA]: '/track/media',
    [ApiPathNames.TRACK_PROCESSING]: '/track/processing',

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